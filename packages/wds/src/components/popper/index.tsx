'use client';
import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  shift,
  size,
  useFloating,
} from '@floating-ui/react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useSize } from '@radix-ui/react-use-size';
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Slot } from '@radix-ui/react-slot';

import Portal from '../portal';

import {
  PopperContentProvider,
  PopperProvider,
  usePopperContentContext,
  usePopperContext,
} from './context';
import {
  getPlacementMapper,
  getSideAlignFromPlacement,
  transformOrigin,
} from './helpers';
import {
  POPPER_ANCHOR_NAME,
  POPPER_ARROW_NAME,
  POPPER_CONTENT_NAME,
} from './constants';

import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import type { PopperContentProps } from './types';

const OPPOSITE_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const MARGIN_OPPOSITE_SIDE = {
  top: 'marginBottom',
  right: 'marginLeft',
  bottom: 'marginTop',
  left: 'marginRight',
} as const;

const Popper = ({ children }: PropsWithChildren) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <PopperProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </PopperProvider>
  );
};

const PopperAnchor = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<typeof Slot>
>((props, forwardedRef) => {
  const context = usePopperContext(POPPER_ANCHOR_NAME);
  const ref = useRef<HTMLElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  useEffect(() => {
    context.onAnchorChange(ref.current);
  });

  return <Slot ref={composedRefs} {...props} />;
});

PopperAnchor.displayName = POPPER_ANCHOR_NAME;

const PopperArrow = forwardRef<HTMLElement, HTMLAttributes<SVGSVGElement>>(
  (props, ref) => {
    const {
      onArrowChange,
      side,
      arrowX = 0,
      arrowY = 0,
    } = usePopperContentContext(POPPER_ARROW_NAME);

    const composedRef = useComposedRefs(ref, (node) => onArrowChange(node));

    return (
      <span
        style={{
          position: 'absolute',
          left: arrowX,
          top: arrowY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          [OPPOSITE_SIDE[side]]: 0,
          transformOrigin: {
            top: '',
            right: '0 0',
            bottom: 'center 0',
            left: '100% 0',
          }[side],
          transform: {
            top: 'translateY(100%)',
            right: 'translateY(50%) rotate(90deg) translateX(-50%)',
            bottom: `rotate(180deg)`,
            left: 'translateY(50%) rotate(-90deg) translateX(50%)',
          }[side],
        }}
      >
        <svg
          ref={composedRef as unknown as (node: SVGSVGElement) => void}
          css={{ width: '40px', height: '8px', display: 'block' }}
          viewBox="0 0 24 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Subtract"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5857 6.58609L7.99993 4.0003L5.75729 1.75766C4.63207 0.632441 3.10595 0.000301838 1.51465 0.000301838H22.4852C20.8939 0.000301838 19.3678 0.632441 18.2426 1.75766L15.9999 4.0003L13.4141 6.58609C13.4138 6.58638 13.4136 6.58668 13.4133 6.58698C12.6321 7.36714 11.3665 7.36684 10.5857 6.58609Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  },
);

PopperArrow.displayName = POPPER_ARROW_NAME;

const PopperContent = forwardRef<HTMLElement, PopperContentProps>(
  (
    {
      wrapperProps = {},
      position = 'top-center',
      offset: givenOffset = 10,
      referenceHidden = false,
      ...props
    },
    ref,
  ) => {
    const context = usePopperContext(POPPER_CONTENT_NAME);

    const [arrow, setArrow] = useState<HTMLElement | null>(null);
    const arrowSize = useSize(arrow);

    const [content, setContent] = useState<HTMLElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setContent(node));

    const arrowWidth = arrowSize?.width || 40;
    const arrowHeight = arrowSize?.height || 8;

    const floatingPlacement = getPlacementMapper(position);

    const {
      refs,
      floatingStyles,
      placement: placementResult,
      isPositioned,
      middlewareData,
    } = useFloating({
      strategy: 'fixed',
      placement: floatingPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: false,
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor,
      },
      middleware: [
        shift({
          mainAxis: true,
          crossAxis: false,
          limiter: limitShift(),
        }),
        flip(),
        size(),
        arrow && floatingUIarrow({ element: arrow as Element }),
        transformOrigin({ arrowWidth, arrowHeight }),
        referenceHidden && hide(),
      ],
    });

    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;

    const [contentZIndex, setContentZIndex] = useState<string>();

    useLayoutEffect(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);

    const [side, align] = getSideAlignFromPlacement(placementResult);

    return (
      <Portal>
        <div
          ref={refs.setFloating}
          {...wrapperProps}
          style={{
            ...wrapperProps.style,
            ...floatingStyles,
            transform: isPositioned
              ? floatingStyles.transform
              : 'translate(0, -200%)',
            minWidth: 'max-content',
            zIndex: contentZIndex,
            ...(middlewareData.hide?.referenceHidden && {
              visibility: 'hidden',
              pointerEvents: 'none',
            }),
          }}
          dir={props.dir}
        >
          <PopperContentProvider
            side={side}
            onArrowChange={setArrow}
            arrowX={arrowX}
            arrowY={arrowY}
          >
            <Slot
              data-side={side}
              data-align={align}
              ref={composedRefs}
              {...props}
              style={{
                ...props.style,
                position: 'relative',
                [MARGIN_OPPOSITE_SIDE[side]]: givenOffset + arrowHeight,
              }}
            />
          </PopperContentProvider>
        </div>
      </Portal>
    );
  },
);

PopperContent.displayName = POPPER_CONTENT_NAME;

export { Popper, PopperAnchor, PopperContent, PopperArrow };
