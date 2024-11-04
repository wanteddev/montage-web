import { createContext } from '@radix-ui/react-context';

import { CARD_NAME } from './constants';

type CardContextType = {
  platform?: 'desktop' | 'mobile';
};

export const [CardProvider, useCardContext] =
  createContext<CardContextType>(CARD_NAME);
