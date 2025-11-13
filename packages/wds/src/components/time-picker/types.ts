import type { FocusScopeProps } from '../focus-scope/types';
import type { TimeViewProps } from '../time-view/types';
import type { TextFieldProps } from '../text-field/types';
import type { PopperContentProps } from '../popper/types';
import type { ElementType, ReactNode, Ref } from 'react';
import type { DateType } from '../date-picker';
import type {
  DefaultComponentPropsInternal,
  Merge,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type TimePickerProps = Merge<
  {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    format?: string;
    input?: ElementType;
    inputRef?: Ref<HTMLInputElement>;
    contentProps?: WithSxProps<Merge<PopperContentProps, FocusScopeProps>>;
    onChange?: (date: DateType) => void;
    actionArea?: ReactNode;
    /**
     * When the last element is selected, the popover is not closed.
     */
    disableLastUnitClickClose?: boolean;
  },
  TimeViewProps & Omit<TextFieldProps, 'wrapperRef'>
>;

export type TimePickerFieldProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  DefaultComponentPropsInternal<Omit<TextFieldProps, 'wrapperRef'>, 'input'>
>;
