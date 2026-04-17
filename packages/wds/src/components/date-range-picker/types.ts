import type {
  TextFieldProps,
  TextFieldResponsiveProps,
} from '../text-field/types';
import type { TextField } from '../text-field';
import type {
  BreakPoint,
  DefaultComponentPropsInternal,
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from 'react';
import type { PopperContent } from '../popper';
import type { FocusScope } from '../focus-scope';
import type {
  DateRangeCalendar,
  DateRangeCalendarProps,
} from '../date-range-calendar';

type DateRangePickerResponsiveProps = ResponsiveProps<
  NonNullable<TextFieldResponsiveProps[keyof BreakPoint]> &
    NonNullable<DateRangeCalendarProps[keyof BreakPoint]>
>;

export type DateRangePickerProps = Merge<
  Merge<
    {
      /** Whether the date range picker is open. */
      open?: boolean;
      /** Whether the date range picker is open by default. */
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
       * Custom input component.
       */
      input?: ElementType<DateRangePickerFieldProps>;
      /** The action area of the date range picker. */
      actionArea?: ReactNode;
      /**
       * When the range is completed, the popover is not closed.
       */
      disableLastDateClickClose?: boolean;
    },
    Omit<ComponentPropsWithoutRef<typeof DateRangeCalendar>, keyof BreakPoint> &
      Omit<TextFieldProps, 'wrapperRef' | keyof BreakPoint>
  >,
  DateRangePickerResponsiveProps
>;

export type DateRangePickerFieldProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  DefaultComponentPropsInternal<
    Omit<ComponentPropsWithoutRef<typeof TextField>, 'wrapperRef'>,
    'input'
  >
>;
