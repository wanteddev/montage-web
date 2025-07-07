import type { PopperContentProps } from '../popper/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { ListCellProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { PropsWithChildren, ReactNode, RefObject } from 'react';

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

export type AutocompleteListProps = Merge<
  {
    /**
     * asSelect=`true` 일 때 첫 포커스를 지정하지 않습니다.
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
