import { range } from './helper';

import type { PaginationDefaultProps } from './types';

type UsePaginationProps = Pick<
  PaginationDefaultProps,
  'defaultPage' | 'page' | 'count' | 'boundaryCount' | 'siblingCount'
>;

export type UsePaginationItem = {
  type: 'page' | 'ellipsis';
  page?: number;
};

export const usePaginationItems = ({
  defaultPage = 1,
  page = defaultPage,
  count = 1,
  boundaryCount = 1,
  siblingCount = 1,
}: UsePaginationProps) => {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1,
  );

  const itemList: Array<number | 'ellipsis'> = [
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis'] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? (['ellipsis'] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
  ];

  const items: Array<UsePaginationItem> = itemList.map((item) =>
    typeof item === 'number'
      ? {
          type: 'page',
          page: item,
        }
      : {
          type: 'ellipsis',
        },
  );

  return items;
};
