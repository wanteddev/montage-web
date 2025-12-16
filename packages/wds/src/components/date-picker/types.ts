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
    /** Whether the date picker is open. */
    open?: boolean;
    /** Whether the date picker is open by default. */
    defaultOpen?: boolean;
    /** Callback function when the open state changes. */
    onOpenChange?: (state: boolean) => void;
    /** The props for the content. */
    contentProps?: WithSxProps<
      Merge<
        ComponentProps<typeof PopperContent>,
        ComponentPropsWithoutRef<typeof FocusScope>
      >
    >;
    /** The format of the date. */
    format?: string;
    /** The ref for the input. */
    inputRef?: Ref<HTMLInputElement>;
    /**
     * Generally not used; This is used when you want to use a different component
     * (such as Chip) instead of the default input.
     * Pass a component that accepts `DatePickerFieldProps`.
     */
    input?: ElementType<DatePickerFieldProps>;
    /** The action area of the date picker. Use `PickerActionArea` component as the children. */
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
