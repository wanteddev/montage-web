import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ElementRef, Ref } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export type ScrollAreaProps = WithSxProps<
  Merge<
    ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    {
      scrollbars?: 'vertical' | 'horizontal' | 'both';
      viewportRef?: Ref<
        ElementRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
      >;
      viewPortProps?: WithSxProps<
        ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
      >;
      /**
       * scroll bar의 zindex를 설정합니다.
       */
      zIndex?: number;
    }
  >
>;

export type ScrollBarProps = WithSxProps<
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>;
