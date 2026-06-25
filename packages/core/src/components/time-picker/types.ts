import type { TimeView } from '../time-view';
import type { PopperContent } from '../popper';
import type { TextFieldProps } from '../text-field/types';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from 'react';
import type { DateType } from '../date-picker';
import type {
  DefaultComponentPropsInternal,
  Merge,
  WithSxProps,
} from '@montage-ui/engine';
import type { FocusScope } from '../focus-scope';

export type TimePickerProps = Merge<
  {
    /** Whether the time picker is open. */
    open?: boolean;
    /** Whether the time picker is open by default. */
    defaultOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    /** The format of the time picker. */
    format?: string;
    /** The input element of the time picker. Pass a component that accepts `TimePickerFieldProps`. */
    input?: ElementType<TimePickerFieldProps>;
    /** The input ref of the time picker. */
    inputRef?: Ref<HTMLInputElement>;
    /** The content props of the time picker. */
    contentProps?: WithSxProps<
      Merge<
        ComponentProps<typeof PopperContent>,
        ComponentPropsWithoutRef<typeof FocusScope>
      >
    >;
    /** Callback function when the value changes. */
    onChange?: (date: DateType) => void;
    /** The action area of the time picker. Use `PickerActionArea` component as the children. */
    actionArea?: ReactNode;
    /** When the last element is selected, the popover is not closed. */
    disableLastUnitClickClose?: boolean;
  },
  ComponentPropsWithoutRef<typeof TimeView> & Omit<TextFieldProps, 'wrapperRef'>
>;

export type TimePickerFieldProps = DefaultComponentPropsInternal<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
    trailingContent?: ReactNode;
  },
  'input'
>;

export type TimePickerFieldInternalProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  DefaultComponentPropsInternal<Omit<TextFieldProps, 'wrapperRef'>, 'input'>
>;
