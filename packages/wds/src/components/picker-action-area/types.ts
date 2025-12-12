import type { ActionAreaProps } from '../action-area/types';
import type { TextButtonProps } from '../text-button/types';
import type { Merge } from '@wanteddev/wds-engine';

export type PickerActionAreaProps = ActionAreaProps;

export type PickerActionAreaButtonProps = Merge<
  {
    /** The variant of the picker action area button. */
    variant?: 'now' | 'cancel' | 'accept' | 'reset';
  },
  TextButtonProps
>;
