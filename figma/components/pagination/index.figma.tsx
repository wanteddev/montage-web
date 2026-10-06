import { figma } from '@figma/code-connect';

import {
  Pagination,
  PaginationField,
  PaginationSelect,
} from '@montage-ui/core';

figma.connect(Pagination, '<FIGMA_PAGINATION>', {
  props: {
    variant: figma.enum('Variant', {
      Extended: 'extended',
      Compact: 'compact',
      Minimize: 'minimize',
    }),
    leadingContent: figma.boolean('Leading Content', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.instance('┗ Instance᠎'),
      false: undefined,
    }),
  },
  example: (props) => <Pagination totalPages={10} {...props} />,
});

figma.connect(PaginationSelect, '<FIGMA_PAGINATION_CONTENT_LIMIT>', {
  example: () => <PaginationSelect />,
});

figma.connect(PaginationField, '<FIGMA_PAGINATION_CONTENT_NAVIGATION>', {
  example: () => <PaginationField />,
});
