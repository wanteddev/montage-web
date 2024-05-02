'use client';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

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
      children,
      asChild,
      viewportRef,
      scrollbars = 'both',
      type = 'hover',
      viewPortProps = {},
      zIndex,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const scrollbarComponent: {
      [key in 'vertical' | 'horizontal' | 'both']: ReactNode;
    } = {
      both: (
        <>
          <Box as={ScrollBar} orientation="horizontal" sx={{ zIndex }} />
          <Box as={ScrollBar} orientation="vertical" sx={{ zIndex }} />
        </>
      ),
      vertical: <Box as={ScrollBar} orientation="vertical" sx={{ zIndex }} />,
      horizontal: (
        <Box as={ScrollBar} orientation="horizontal" sx={{ zIndex }} />
      ),
    };

    return (
      <Box
        as={ScrollAreaPrimitive.Root}
        ref={ref}
        type={type}
        {...props}
        sx={[scrollAreaStyle({ xs, sm, md, lg, xl }), props.sx]}
      >
        <Box
          as={ScrollAreaPrimitive.Viewport}
          asChild={asChild}
          ref={viewportRef}
          {...viewPortProps}
          sx={[viewportStyle({ viewPortProps }), viewPortProps.sx]}
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
>(({ orientation = 'vertical', xs, sm, md, lg, xl, ...props }, ref) => (
  <Box
    as={ScrollAreaPrimitive.ScrollAreaScrollbar}
    forceMount
    ref={ref}
    orientation={orientation}
    {...props}
    sx={[scrollBarStyle({ orientation, xs, sm, md, lg, xl }), props.sx]}
  >
    <WithInteraction color="palette.label.normal">
      <Box as={ScrollAreaPrimitive.ScrollAreaThumb} sx={scrollBarThumbStyle} />
    </WithInteraction>
  </Box>
));

ScrollBar.displayName = 'ScrollBar';
