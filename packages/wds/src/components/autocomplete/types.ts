import type { ListCellProps, ListTextProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { PopperContent } from '../popper';
import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
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
  /**
   * 값을 선택하거나 엔터를 입력했을 때를 컨트롤 할 수 있습니다.
   */
  onSearch?: (value: string) => void;
  children?: ReactNode;
};

export type AutocompleteTriggerProps = PropsWithChildren;

export type AutocompleteListProps = ComponentPropsWithoutRef<
  typeof PopperContent
>;

export type AutocompleteOptionProps = Merge<
  { value: string },
  Omit<
    ListCellProps & Pick<ListTextProps, 'caption'>,
    'rightContent' | 'leftContent'
  >
>;

export type AutocompleteCollectionItem = {
  ref: RefObject<HTMLButtonElement | null>;
} & {
  value: string;
  disabled?: boolean | undefined;
};
