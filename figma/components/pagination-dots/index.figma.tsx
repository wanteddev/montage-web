import { figma } from '@figma/code-connect';

import { PaginationDots } from '@montage-ui/core';

figma.connect(PaginationDots, '<FIGMA_PAGINATION_DOTS>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    color: figma.enum('Variant', {
      Normal: 'normal',
      White: 'white',
    }),
  },
  example: (props) => (
    <PaginationDots totalPages={5} currentPage={1} {...props} />
  ),
});
