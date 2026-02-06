import type { SlotProps } from '@radix-ui/react-slot';
import type { PopperContentProps } from '../popper/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { ListCellProps } from '../list/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';

export type AutocompleteProps = WithSxProps<{
  /** The value of the autocomplete. */
  value?: string;
  /** The default value of the autocomplete. */
  defaultValue?: string;
  /** Callback function when the value changes. */
  onValueChange?: (value: string) => void;
  /** Whether the autocomplete is open. */
  open?: boolean;
  /** Whether the autocomplete is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (value: boolean) => void;
  /**
   * Restricts user input to only the provided options (disallows custom/non-option values).
   * Enables Select-like behavior. Both `inputValue` and `value` must be managed separately.
   */
  asSelect?: boolean;
  /** When `asSelect=true`, this prop is used to manage the input value. */
  inputValue?: string;
  /** When `asSelect=true`, this prop is used to manage the default input value. */
  defaultInputValue?: string;
  /** When `asSelect=true`, this prop is used to manage the input value changes. */
  onInputValueChange?: (value: string) => void;
  /** When a value is selected or entered, this function can control the event. */
  onSearch?: (value: string) => void;
  children?: ReactNode;
}>;

export type AutocompleteFieldProps = SlotProps;

export type AutocompleteTriggerProps = PropsWithChildren;

export type AutocompleteListProps = WithSxProps<
  Merge<
    {
      /**
       * When `asSelect=true`, the first focus is not specified.
       */
      disableTrappedContent?: boolean;
      /** Keeps the autocomplete list mounted in the DOM even when open is false. */
      forceMount?: boolean;
    },
    PopperContentProps
  >
>;

export type AutocompleteGroupProps = Merge<
  {
    title?: ReactNode;
    children?: ReactNode;
  },
  FlexBoxProps
>;

export type AutocompleteOptionProps = Merge<
  {
    value: string;
    /**
     * Content displayed in the leading area.
     * Pass an element wrapped with `AutocompleteOptionContent`.
     */
    leadingContent?: ReactNode;
    /**
     * Content displayed in the trailing area.
     * Pass an element wrapped with `AutocompleteOptionContent`.
     */
    trailingContent?: ReactNode;
  },
  ListCellProps
>;

export type AutocompleteCollectionItem = {
  ref: RefObject<HTMLButtonElement | null>;
} & {
  value: string;
  disabled?: boolean | undefined;
};
