'use client';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import WithInteraction from '../with-interaction';

import { scrollAreaStyle, scrollBarStyle, scrollBarThumbStyle } from './style';

import type { Merge } from '@/types';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  Ref,
} from 'react';

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  Merge<
    ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    {
      scrollbars?: 'vertical' | 'horizontal' | 'both';
      viewportRef?: Ref<
        ElementRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
      >;
      viewPortProps?: ComponentPropsWithoutRef<
        typeof ScrollAreaPrimitive.ScrollAreaViewport
      >;
    }
  >
>(
  (
    {
      children,
      asChild,
      viewportRef,
      scrollbars = 'both',
      type = 'hover',
      viewPortProps = {},
      ...props
    },
    ref,
  ) => {
    const scrollbarComponent: {
      [key in 'vertical' | 'horizontal' | 'both']: ReactNode;
    } = {
      both: (
        <>
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </>
      ),
      vertical: <ScrollBar orientation="vertical" />,
      horizontal: <ScrollBar orientation="horizontal" />,
    };

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        css={scrollAreaStyle}
        type={type}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          asChild={asChild}
          ref={viewportRef}
          css={{
            height: '100%',
            width: '100%',
          }}
          {...viewPortProps}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>

        {scrollbarComponent[scrollbars]}

        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    forceMount
    ref={ref}
    orientation={orientation}
    css={scrollBarStyle({ orientation })}
    {...props}
  >
    <WithInteraction color="palette.label.normal">
      <ScrollAreaPrimitive.ScrollAreaThumb css={scrollBarThumbStyle} />
    </WithInteraction>
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = 'ScrollBar';
