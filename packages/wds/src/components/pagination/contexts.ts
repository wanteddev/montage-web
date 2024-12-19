import { createContext } from '@radix-ui/react-context';

import { PAGINATION_NAME } from './constants';

type PaginationContextType = {
  id: string;
  count: number;
  setPage: (page?: number) => void;
};

export const [PaginationProvider, usePaginationContext] =
  createContext<PaginationContextType>(PAGINATION_NAME);
