import { createContext } from '@radix-ui/react-context';

import { AUTOCOMPLETE_NAME } from './constants';

import type { AutocompleteCollectionItem } from './types';

type AutocompleteContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  input: HTMLInputElement | HTMLTextAreaElement | null;
  onInputChange: (input: HTMLInputElement | HTMLTextAreaElement | null) => void;
  open: boolean;
  onOpenChange: (open: boolean, force?: boolean) => void;
  triggerId: string;
  contentId: string;
  width?: number;
  asSelect?: boolean;
  inputValue: string;
  onInputValueChange: (inputValue: string) => void;
  selectedOption: AutocompleteCollectionItem | null;
  onSelectedOptionChange: (value: AutocompleteCollectionItem | null) => void;
};

export const [AutocompleteProvider, useAutocompleteContext] =
  createContext<AutocompleteContextValue>(AUTOCOMPLETE_NAME);
