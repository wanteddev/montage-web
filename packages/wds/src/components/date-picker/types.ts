import type { TextInputProps } from '../text-input/types';
import type { TextInput } from '../text-input';
import type { Merge } from '@wanteddev/wds-engine';
import type DateCalendar from '../date-calendar';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
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
    actionArea?: ReactNode;
    /**
     * 마지막 요소를 선택 완료 했을 때 popover를 닫지 않습니다.
     */
    disableLastUnitClickClose?: boolean;
  },
  ComponentPropsWithoutRef<typeof DateCalendar> &
    Omit<TextInputProps, 'wrapperRef'>
>;

export type DatePickerInputProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'wrapperRef'>
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
