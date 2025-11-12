import type { TextFieldProps } from '../text-field/types';
import type { TextField } from '../text-field';
import type {
  DefaultComponentPropsInternal,
  Merge,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { DateCalendar } from '../date-calendar';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from 'react';
import type { PopperContent } from '../popper';
import type { FocusScope } from '../focus-scope';

export type DatePickerProps = Merge<
  {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    contentProps?: WithSxProps<
      Merge<
        ComponentProps<typeof PopperContent>,
        ComponentPropsWithoutRef<typeof FocusScope>
      >
    >;
    format?: string;
    inputRef?: Ref<HTMLInputElement>;
    input?: ElementType;
    actionArea?: ReactNode;
    /**
     * When the last element is selected, the popover is not closed.
     */
    disableLastUnitClickClose?: boolean;
  },
  ComponentPropsWithoutRef<typeof DateCalendar> &
    Omit<TextFieldProps, 'wrapperRef'>
>;

export type DatePickerFieldProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  DefaultComponentPropsInternal<
    Omit<ComponentPropsWithoutRef<typeof TextField>, 'wrapperRef'>,
    'input'
  >
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
