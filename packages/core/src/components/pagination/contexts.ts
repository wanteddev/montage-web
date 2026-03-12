import { createContext } from '@radix-ui/react-context';

import { PAGINATION_NAME } from './constants';

type PaginationContextType = {
  id: string;
  totalPages: number;
  disabled: boolean;
  setPage: (page: number) => void;
};

export const [PaginationProvider, usePaginationContext] =
  createContext<PaginationContextType>(PAGINATION_NAME);
