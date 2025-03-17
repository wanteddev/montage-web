'use client';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import FlexBox from '../flex-box';

import {
  scrollAreaStyle,
  scrollBarStyle,
  scrollBarThumbStyle,
  viewportStyle,
} from './style';

import type { ScrollAreaProps, ScrollBarProps } from './types';
import type { ElementRef, ReactNode } from 'react';

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      size = 'responsive',
      children,
      asChild,
      viewportRef,
      scrollbars = 'both',
      type = 'hover',
      viewportProps = {},
      scrollHideDelay = 400,
      zIndex,
      ...props
    },
    ref,
  ) => {
    const scrollbarComponent: {
      [key in 'vertical' | 'horizontal' | 'both']: ReactNode;
    } = {
      both: (
        <>
          <Box
            as={ScrollBar}
            orientation="horizontal"
            size={size}
            sx={{ zIndex }}
          />
          <Box
            as={ScrollBar}
            orientation="vertical"
            size={size}
            sx={{ zIndex }}
          />
        </>
      ),
      vertical: (
        <Box
          as={ScrollBar}
          orientation="vertical"
          size={size}
          sx={{ zIndex }}
        />
      ),
      horizontal: (
        <Box
          as={ScrollBar}
          orientation="horizontal"
          size={size}
          sx={{ zIndex }}
        />
      ),
    };

    return (
      <Box
        as={ScrollAreaPrimitive.Root}
        ref={ref}
        type={type}
        scrollHideDelay={scrollHideDelay}
        {...props}
        sx={[scrollAreaStyle, props.sx]}
      >
        <Box
          as={ScrollAreaPrimitive.Viewport}
          asChild={asChild}
          ref={viewportRef}
          {...viewportProps}
          sx={[viewportStyle, viewportProps.sx]}
        >
          {children}
        </Box>

        {scrollbarComponent[scrollbars]}

        <ScrollAreaPrimitive.Corner />
      </Box>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ orientation = 'vertical', size = 'responsive', ...props }, ref) => (
  <Box
    as={ScrollAreaPrimitive.ScrollAreaScrollbar}
    forceMount
    ref={ref}
    orientation={orientation}
    {...props}
    sx={[scrollBarStyle({ orientation, size }), props.sx]}
  >
    <FlexBox data-role="scroll-area-bar-wrapper">
      <WithInteraction color="semantic.label.normal">
        <Box
          as={ScrollAreaPrimitive.ScrollAreaThumb}
          sx={scrollBarThumbStyle}
        />
      </WithInteraction>
    </FlexBox>
  </Box>
));

ScrollBar.displayName = 'ScrollBar';
