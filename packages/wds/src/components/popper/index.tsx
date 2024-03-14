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

import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { PopperContentProps } from './types';

const OPPOSITE_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const Popper = ({ children }: PropsWithChildren) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <PopperProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </PopperProvider>
  );
};

const PopperAnchor = forwardRef<HTMLElement, PropsWithChildren>(
  ({ children }, forwardedRef) => {
    const context = usePopperContext(POPPER_ANCHOR_NAME);
    const ref = useRef<HTMLElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    useEffect(() => {
      context.onAnchorChange(ref.current);
    });

    return <Slot ref={composedRefs}>{children}</Slot>;
  },
);

PopperAnchor.displayName = POPPER_ANCHOR_NAME;

const PopperArrow = forwardRef<SVGSVGElement, HTMLAttributes<SVGSVGElement>>(
  (props, ref) => {
    const { onArrowChange, shouldHideArrow, side, arrowX, arrowY } =
      usePopperContentContext(POPPER_ARROW_NAME);

    return (
      <span
        ref={onArrowChange}
        style={{
          position: 'absolute',
          left: arrowX,
          top: arrowY,
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
          visibility: shouldHideArrow ? 'hidden' : undefined,
        }}
      >
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 10"
          css={{ width: '48px', height: '10px', display: 'block' }}
          fill="none"
          {...props}
        >
          <path
            d="M30.5 -0.000975132L17.5 -0.000976563L24 7.99902L30.5 -0.000975132Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  },
);

PopperArrow.displayName = POPPER_ARROW_NAME;

const PopperContent = forwardRef<HTMLDivElement, PopperContentProps>(
  (
    {
      placement = '12',
      offset: givenOffset = 10,
      referenceHidden = false,
      ...props
    },
    ref,
  ) => {
    const context = usePopperContext(POPPER_CONTENT_NAME);

    const [arrow, setArrow] = useState<HTMLSpanElement | null>(null);
    const arrowSize = useSize(arrow);

    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setContent(node));

    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;

    const floatingPlacement = getPlacementMapper(placement);

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
        offset({
          mainAxis: givenOffset + arrowHeight,
          alignmentAxis: 0,
        }),
        shift({
          mainAxis: true,
          crossAxis: false,
          limiter: limitShift(),
        }),
        flip(),
        size(),
        arrow && floatingUIarrow({ element: arrow }),
        transformOrigin({ arrowWidth, arrowHeight }),
        referenceHidden && hide(),
      ],
    });

    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;

    const [contentZIndex, setContentZIndex] = useState<string>();

    useLayoutEffect(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);

    const [side, align] = getSideAlignFromPlacement(placementResult);

    return (
      <Portal>
        <div
          ref={refs.setFloating}
          style={{
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
            shouldHideArrow={cannotCenterArrow}
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
