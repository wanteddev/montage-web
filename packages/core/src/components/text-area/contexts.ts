import { createContext } from '@radix-ui/react-context';

import { TEXT_AREA_NAME } from './constants';

type TextAreaContextValue = {
  length: number;
};

export const [TextAreaProvider, useTextAreaContext] =
  createContext<TextAreaContextValue>(TEXT_AREA_NAME);
