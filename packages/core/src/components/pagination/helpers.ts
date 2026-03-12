import type { PaginationDefaultProps } from './types';

export type GetPaginationItem = {
  type: 'page' | 'ellipsis';
  page?: number;
};

type GetPaginationItemsParams = Pick<
  PaginationDefaultProps,
  'defaultPage' | 'page' | 'totalPages' | 'boundaryPages' | 'siblingPages'
>;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const getPaginationItems = ({
  defaultPage = 1,
  page = defaultPage,
  totalPages = 1,
  boundaryPages = 1,
  siblingPages = 1,
}: GetPaginationItemsParams) => {
  const startPages = range(1, Math.min(boundaryPages, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryPages + 1, boundaryPages + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingPages,
      totalPages - boundaryPages - siblingPages * 2 - 1,
    ),
    boundaryPages + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingPages, boundaryPages + siblingPages * 2 + 2),
    totalPages - boundaryPages - 1,
  );

  const itemList: Array<number | 'ellipsis'> = [
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryPages + 2
      ? (['ellipsis'] as const)
      : boundaryPages + 1 < totalPages - boundaryPages
        ? [boundaryPages + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < totalPages - boundaryPages - 1
      ? (['ellipsis'] as const)
      : totalPages - boundaryPages > boundaryPages
        ? [totalPages - boundaryPages]
        : []),

    ...endPages,
  ];

  const items: Array<GetPaginationItem> = itemList.map((item) =>
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
