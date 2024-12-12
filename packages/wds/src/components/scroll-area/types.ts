import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementRef, ReactNode, Ref } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export type ScrollAreaProps = DefaultComponentProps<
  {
    size?: 'small' | 'normal' | 'responsive';
    scrollbars?: 'vertical' | 'horizontal' | 'both';
    viewportRef?: Ref<
      ElementRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
    >;
    viewportProps?: Omit<
      DefaultComponentProps<{}, typeof ScrollAreaPrimitive.ScrollAreaViewport>,
      'ref'
    >;
    /**
     * scroll bar의 zindex를 설정합니다.
     */
    zIndex?: number;
    children?: ReactNode;
  },
  typeof ScrollAreaPrimitive.Root
>;

export type ScrollBarProps = DefaultComponentProps<
  Pick<ScrollAreaProps, 'size' | 'children'>,
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;
