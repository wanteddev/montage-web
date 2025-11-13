import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { ComponentRef, ReactNode, Ref } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export type ScrollAreaProps = WithSxProps<
  Merge<
    {
      size?: 'small' | 'medium' | 'responsive';
      scrollbars?: 'vertical' | 'horizontal' | 'both';
      viewportRef?: Ref<
        ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
      >;
      viewportProps?: WithSxProps<ScrollAreaPrimitive.ScrollAreaViewportProps>;
      /**
       * Sets the z-index of the scroll bar.
       */
      zIndex?: number;
      children?: ReactNode;
    },
    ScrollAreaPrimitive.ScrollAreaProps
  >
>;

export type ScrollBarProps = WithSxProps<
  Merge<
    Pick<ScrollAreaProps, 'size' | 'children'>,
    ScrollAreaPrimitive.ScrollAreaScrollbarProps
  >
>;
