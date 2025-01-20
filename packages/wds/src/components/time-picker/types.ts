import type { DateFormatSection } from '../date-picker/helpers';
import type { TextInputProps } from '../text-input/types';
import type { TextInput } from '../text-input';
import type { PopperContent } from '../popper';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  Ref,
} from 'react';
import type { DateType } from '../date-picker';
import type { Merge } from '@wanteddev/wds-engine';
import type FocusScope from '../focus-scope';

export type TimePickerProps = Merge<
  {
    value?: DateType;
    defaultValue?: DateType;
    format?: string;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    locale?: string;
    timezone?: string;
    input?: ElementType;
    inputRef?: Ref<HTMLInputElement>;
    placeholder?: string;
    open?: boolean;
    defaultOpen?: boolean;
    contentProps?: Merge<
      ComponentProps<typeof PopperContent>,
      ComponentPropsWithoutRef<typeof FocusScope>
    >;
    onOpenChange?: (open: boolean) => void;
    onChange?: (date: DateType) => void;
  },
  Omit<TextInputProps, 'wrapperRef'>
>;

export type TimePickerInputProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'wrapperRef'>
>;

export type TimePickerListProps = Merge<
  {
    locale?: string;
    disabled: boolean;
  },
  DateFormatSection
>;

export type TimePickerItemProps = {
  value: string;
  active: boolean;
};

export type TimePickerBottomProps = {
  nowText?: string;
  submitText?: string;
};
