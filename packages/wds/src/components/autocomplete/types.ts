import type { SlotProps } from '@radix-ui/react-slot';
import type { PopperContentProps } from '../popper/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { ListCellProps } from '../list/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';

export type AutocompleteProps = WithSxProps<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  asSelect?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  /**
   * When a value is selected or entered, this function can control the event.
   */
  onSearch?: (value: string) => void;
  children?: ReactNode;
}>;

export type AutocompleteFieldProps = SlotProps;

export type AutocompleteTriggerProps = PropsWithChildren;

export type AutocompleteListProps = Merge<
  {
    /**
     * When `asSelect=true`, the first focus is not specified.
     */
    disableTrappedContent?: boolean;
    forceMount?: boolean;
  },
  PopperContentProps
>;

export type AutocompleteGroupProps = Merge<
  {
    title?: ReactNode;
    children?: ReactNode;
  },
  FlexBoxProps
>;

export type AutocompleteOptionProps = Merge<{ value: string }, ListCellProps>;

export type AutocompleteCollectionItem = {
  ref: RefObject<HTMLButtonElement | null>;
} & {
  value: string;
  disabled?: boolean | undefined;
};
