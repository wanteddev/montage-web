import type { Merge } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';

export type DialogButtonProps = Merge<
  {
    variant?: 'normal' | 'assistive' | 'negative';
  },
  Omit<TextButtonProps, 'color'>
>;
