'use client';
import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
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
import { useTheme } from '@emotion/react';

import Portal from '../portal';

import {
  PopperContentProvider,
  PopperProvider,
  usePopperContentContext,
  usePopperContext,
} from './contexts';
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

import type { MergeElementProps } from '../../types';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import type { PopperArrowProps, PopperContentProps } from './types';

const OPPOSITE_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
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

const PopperArrow = forwardRef<
  SVGSVGElement,
  MergeElementProps<'svg', PopperArrowProps>
>(({ overlay, ...props }, ref) => {
  const { onArrowChange, side, arrowX, arrowY } =
    usePopperContentContext(POPPER_ARROW_NAME);

  const composedRef = useComposedRefs(
    ref,
    onArrowChange as (node: SVGSVGElement | null) => void,
  );

  return (
    <>
      <svg
        wds-component="popper-arrow"
        ref={composedRef}
        style={{
          ...props.style,
          position: 'absolute',
          width: '40px',
          height: '8px',
          display: 'block',
          left: arrowX,
          top: arrowY,
          right: '',
          bottom: '',
          [OPPOSITE_SIDE[side]]: '0px',
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
        viewBox="0 0 24 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5858 6.58609L4 0.000301361H20L13.4142 6.58609C12.6332 7.36714 11.3668 7.36714 10.5858 6.58609Z"
          fill="currentColor"
        />
      </svg>

      {Boolean(overlay) && (
        <svg
          style={{
            ...props.style,
            position: 'absolute',
            width: '40px',
            height: '8px',
            display: 'block',
            left: arrowX,
            top: arrowY,
            color: overlay,
            right: '',
            bottom: '',
            [OPPOSITE_SIDE[side]]: '0px',
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
          viewBox="0 0 24 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5858 6.58609L4 0.000301361H20L13.4142 6.58609C12.6332 7.36714 11.3668 7.36714 10.5858 6.58609Z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );
});

PopperArrow.displayName = POPPER_ARROW_NAME;

const PopperContent = forwardRef<HTMLElement, PopperContentProps>(
  (
    {
      wrapperProps = {},
      position = 'top-center',
      offset: givenOffset = 10,
      referenceHidden = false,
      setContext,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const context = usePopperContext(POPPER_CONTENT_NAME);

    const [arrow, setArrow] = useState<HTMLElement | null>(null);
    const arrowSize = useSize(arrow);

    const [content, setContent] = useState<HTMLElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setContent(node));

    const arrowWidth = Boolean(arrow) ? arrowSize?.width || 40 : 0;
    const arrowHeight = Boolean(arrow) ? arrowSize?.height || 8 : 0;

    const floatingPlacement = getPlacementMapper(position);

    const {
      refs,
      floatingStyles,
      placement: placementResult,
      isPositioned,
      middlewareData,
      context: floatingContext,
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
        offset({ mainAxis: givenOffset + arrowHeight, alignmentAxis: 0 }),
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

    useEffect(() => {
      setContext?.(floatingContext);
    }, [setContext, floatingContext]);

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
            zIndex:
              contentZIndex === 'auto' ? theme.zIndex.modal : contentZIndex,
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
            />
          </PopperContentProvider>
        </div>
      </Portal>
    );
  },
);

PopperContent.displayName = POPPER_CONTENT_NAME;

export { Popper, PopperAnchor, PopperContent, PopperArrow };
