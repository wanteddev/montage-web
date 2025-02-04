import type { TimeView } from '..';
import type { TextInputProps } from '../text-input/types';
import type { TextInput } from '../text-input';
import type { PopperContent } from '../popper';
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from 'react';
import type { DateType } from '../date-picker';
import type { Merge } from '@wanteddev/wds-engine';
import type FocusScope from '../focus-scope';

export type TimePickerProps = Merge<
  {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (state: boolean) => void;
    format?: string;
    input?: ElementType;
    inputRef?: Ref<HTMLInputElement>;
    contentProps?: Merge<
      ComponentProps<typeof PopperContent>,
      ComponentPropsWithoutRef<typeof FocusScope>
    >;
    onChange?: (date: DateType) => void;
    actionArea?: ReactNode;
    /**
     * 마지막 요소를 선택 완료 했을 때 popover를 닫지 않습니다.
     */
    disableLastUnitClickClose?: boolean;
  },
  ComponentPropsWithoutRef<typeof TimeView> & Omit<TextInputProps, 'wrapperRef'>
>;

export type TimePickerInputProps = Merge<
  {
    ref?: Ref<HTMLDivElement>;
    inputRef?: Ref<HTMLInputElement>;
  },
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'wrapperRef'>
>;
