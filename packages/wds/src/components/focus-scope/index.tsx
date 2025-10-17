/**
 * Most of this file is based on code from @radix-ui/react-focus-scope.
 * MIT Licensed, Copyright (c) 2022 WorkOS

 * https://github.com/radix-ui/primitives/blob/main/packages/react/focus-scope/src/FocusScope.tsx
 */
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Slot } from '@radix-ui/react-slot';

import {
  arrayRemove,
  focus,
  focusFirst,
  getTabbableCandidates,
  getTabbableEdges,
  getTabbableForFirstFocus,
  removeLinks,
} from './helpers';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { FocusScopeProps } from './types';
import type { ComponentRef, KeyboardEvent } from 'react';

const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

const FocusScope = forwardRef<
  HTMLElement,
  DefaultComponentPropsInternal<FocusScopeProps, 'div'>
>(
  (
    {
      loop = false,
      trapped = true,
      trappedContent = false,
      disableFocusScope = false,
      children,
      onMountAutoFocus,
      onUnmountAutoFocus,
      ...props
    },
    forwardedRef,
  ) => {
    if (disableFocusScope) {
      return (
        <Slot ref={forwardedRef} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <FocusScopeWrapper
        {...props}
        ref={forwardedRef}
        loop={loop}
        trapped={trapped}
        trappedContent={trappedContent}
        onMountAutoFocus={onMountAutoFocus}
        onUnmountAutoFocus={onUnmountAutoFocus}
      >
        {children}
      </FocusScopeWrapper>
    );
  },
);

FocusScope.displayName = 'FocusScope';

type FocusScopeAPI = { paused: boolean; pause(): void; resume(): void };

const FocusScopeWrapper = forwardRef<
  HTMLElement,
  DefaultComponentPropsInternal<FocusScopeProps, 'div'>
>(
  (
    {
      loop = false,
      trapped = true,
      trappedContent = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...props
    },
    forwardedRef,
  ) => {
    const [container, setContainer] = useState<ComponentRef<
      typeof Slot
    > | null>(null);
    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    const composedRefs = useComposedRefs(forwardedRef, (node) =>
      setContainer(node),
    );

    const focusScope = useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    useEffect(() => {
      if (trapped) {
        const handleFocusIn = (event: FocusEvent) => {
          if (focusScope.paused || !container) return;
          const target = event.target as HTMLElement | null;

          if (container.contains(target)) {
            lastFocusedElementRef.current = target;
          } else {
            focus(lastFocusedElementRef.current, { select: true });
          }
        };

        const handleFocusOut = (event: FocusEvent) => {
          if (focusScope.paused || !container) return;
          const relatedTarget = event.relatedTarget as HTMLElement | null;

          if (relatedTarget === null) return;

          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElementRef.current, { select: true });
          }
        };

        const handleMutations = (mutations: Array<MutationRecord>) => {
          const focusedElement = document.activeElement as HTMLElement | null;
          if (focusedElement !== document.body) return;
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);
        const mutationObserver = new MutationObserver(handleMutations);
        if (container)
          mutationObserver.observe(container, {
            childList: true,
            subtree: true,
          });

        return () => {
          document.removeEventListener('focusin', handleFocusIn);
          document.removeEventListener('focusout', handleFocusOut);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container, focusScope.paused]);

    useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);
        const previouslyFocusedElement =
          document.activeElement as HTMLElement | null;
        const hasFocusedCandidate = container.contains(
          previouslyFocusedElement,
        );

        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            const tabbableElements = getTabbableForFirstFocus(
              removeLinks(getTabbableCandidates(container)),
            );

            if (tabbableElements.length === 0) {
              focus(container);
            } else {
              if (trappedContent) {
                focusFirst(tabbableElements, {
                  select: true,
                });
              } else {
                focus(container);
              }
            }
          }
        }

        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          setTimeout(() => {
            const unmountEvent = new CustomEvent(
              AUTOFOCUS_ON_UNMOUNT,
              EVENT_OPTIONS,
            );
            container.addEventListener(
              AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );
            container.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented) {
              focus(previouslyFocusedElement ?? document.body, {
                select: true,
              });
            }
            container.removeEventListener(
              AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );

            focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [
      container,
      onMountAutoFocus,
      onUnmountAutoFocus,
      focusScope,
      trappedContent,
    ]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;

        const isTabKey =
          event.key === 'Tab' &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;
        const focusedElement = document.activeElement as HTMLElement | null;

        if (isTabKey && focusedElement) {
          const currentTarget = event.currentTarget as HTMLElement;
          const [first, last] = getTabbableEdges(currentTarget);
          const hasTabbableElementsInside = first && last;

          if (!hasTabbableElementsInside) {
            if (focusedElement === currentTarget) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop) focus(first, { select: true });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop) focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused],
    );

    return (
      <>
        <Slot
          tabIndex={-1}
          ref={composedRefs}
          {...props}
          onKeyDown={composeEventHandlers(props.onKeyDown, handleKeyDown)}
        />
        <span
          wds-component="focus-guard"
          tabIndex={trapped ? 0 : -1}
          style={{
            outline: 'none',
            opacity: '0',
            position: 'fixed',
            pointerEvents: 'none',
          }}
        />
      </>
    );
  },
);

const createFocusScopesStack = () => {
  let stack: Array<FocusScopeAPI> = [];

  return {
    add(focusScope: FocusScopeAPI) {
      const activeFocusScope = stack[0];

      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }

      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },

    remove(focusScope: FocusScopeAPI) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    },
  };
};

const focusScopesStack = createFocusScopesStack();

export { FocusScope };

export type { FocusScopeProps };
