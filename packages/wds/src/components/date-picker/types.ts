import type { TextInputProps } from '../text-input/types';
import type { TextInput } from '../text-input';
import type { Merge } from '@wanteddev/wds-engine';
import type DateCalendar from '../date-calendar';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  Ref,
} from 'react';
import type { PopperContent } from '../popper';
import type FocusScope from '../focus-scope';

export type DatePickerProps = Merge<
  {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    contentProps?: Merge<
      ComponentProps<typeof PopperContent>,
      ComponentPropsWithoutRef<typeof FocusScope>
    >;
    format?: string;
    inputRef?: Ref<HTMLInputElement>;
    input?: ElementType;
  },
  ComponentPropsWithoutRef<typeof DateCalendar> &
    Omit<TextInputProps, 'wrapperRef'>
>;

export type DateInputProps = Merge<
  {
    inputRef?: Ref<HTMLInputElement>;
    // onclicktrigger 그거 받기
  },
  ComponentPropsWithoutRef<typeof TextInput>
>;

export type DatePickerFormat =
  | 'YY'
  | 'YYYY'
  | 'M'
  | 'MM'
  | 'MMM'
  | 'MMMM'
  | 'D'
  | 'DD'
  | 'H'
  | 'HH'
  | 'h'
  | 'hh'
  | 'a'
  | 'A'
  | 'm'
  | 'mm'
  | 's'
  | 'ss';
