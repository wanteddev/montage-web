import type { ListCellProps, ListTextProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { PopperContent } from '../popper';
import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  RefObject,
} from 'react';

export type AutocompleteProps = {
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
};

export type AutocompleteTriggerProps = PropsWithChildren;

export type AutocompleteListProps = ComponentPropsWithoutRef<
  typeof PopperContent
>;

export type AutocompleteOptionProps = Merge<
  { value: string },
  Omit<
    ListCellProps & Pick<ListTextProps, 'bold' | 'caption'>,
    'rightContent' | 'leftContent'
  >
>;

export type AutocompleteCollectionItem = {
  ref: RefObject<HTMLButtonElement>;
} & {
  value: string;
  disabled?: boolean | undefined;
};
