import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementRef, Ref } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export type ScrollAreaProps = DefaultComponentProps<
  {
    scrollbars?: 'vertical' | 'horizontal' | 'both';
    viewportRef?: Ref<
      ElementRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
    >;
    viewPortProps?: DefaultComponentProps<
      {},
      typeof ScrollAreaPrimitive.ScrollAreaViewport
    >;
    /**
     * scroll bar의 zindex를 설정합니다.
     */
    zIndex?: number;
  },
  typeof ScrollAreaPrimitive.Root
>;

export type ScrollBarProps = DefaultComponentProps<
  {},
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;
