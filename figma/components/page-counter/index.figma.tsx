import { figma } from '@figma/code-connect';

import { PageCounter } from '@montage-ui/core';

figma.connect(PageCounter, '<FIGMA_PAGE_COUNTER>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    alternative: figma.boolean('Alternative'),
  },
  example: (props) => <PageCounter totalPages={5} currentPage={1} {...props} />,
});
