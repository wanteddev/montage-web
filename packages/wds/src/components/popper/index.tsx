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
import { Box, useTheme } from '@wanteddev/wds-engine';

import PortalOrFragment from '../portal-or-fragment';

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

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
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
  DefaultComponentProps<PopperArrowProps, 'svg'>
>(({ overlay, ...props }, ref) => {
  const { onArrowChange, side, arrowX, arrowY } =
    usePopperContentContext(POPPER_ARROW_NAME);

  const composedRef = useComposedRefs(
    ref,
    onArrowChange as (node: SVGSVGElement | null) => void,
  );

  return (
    <>
      <Box
        as="svg"
        wds-component="popper-arrow"
        ref={composedRef}
        style={{
          ...props.style,
          position: 'absolute',
          width: '36px',
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
        viewBox="0 0 36 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M17.2407 6.11417L12 -3.02345e-05H24L18.7593 6.11417C18.3602 6.57978 17.6398 6.57978 17.2407 6.11417Z"
          fill="currentColor"
        />
      </Box>

      {Boolean(overlay) && (
        <Box
          as="svg"
          style={{
            ...props.style,
            position: 'absolute',
            width: '36px',
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
          viewBox="0 0 36 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M18.7593 6.11393C18.3602 6.57954 17.6398 6.57954 17.2407 6.11393L12 -0.000274372H24L18.7593 6.11393Z"
            fill="currentColor"
          />
        </Box>
      )}
    </>
  );
});

PopperArrow.displayName = POPPER_ARROW_NAME;

const PopperContent: ReturnType<
  typeof forwardRef<HTMLElement, PopperContentProps>
> = forwardRef<HTMLElement, PopperContentProps>(
  (
    {
      wrapperProps = {},
      position = 'top-center',
      offset: givenOffset = 10,
      referenceHidden = false,
      setContext,
      container,
      disablePortal,
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

    const arrowWidth = Boolean(arrow) ? arrowSize?.width || 36 : 0;
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
      <PortalOrFragment disablePortal={disablePortal} container={container}>
        <Box
          wds-ignore-dismissable-layer="true"
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
        </Box>
      </PortalOrFragment>
    );
  },
);

PopperContent.displayName = POPPER_CONTENT_NAME;

export { Popper, PopperAnchor, PopperContent, PopperArrow };
