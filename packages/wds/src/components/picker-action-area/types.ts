import type { TextButtonProps } from '../text-button/types';
import type { Merge } from '@wanteddev/wds-engine';

export type PickerActionAreaButtonProps = Merge<
  {
    variant?: 'now' | 'cancel' | 'accept' | 'reset';
    buttonVariant?: TextButtonProps['variant'];
  },
  TextButtonProps
>;
