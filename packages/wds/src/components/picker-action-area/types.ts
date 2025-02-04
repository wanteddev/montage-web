import type { Merge } from '@wanteddev/wds-engine';
import type { ActionButtonProps } from '../action-area/types';

export type PickerActionAreaButtonProps = Merge<
  {
    variant?: 'now' | 'cancel' | 'accept' | 'reset';
  },
  ActionButtonProps
>;
