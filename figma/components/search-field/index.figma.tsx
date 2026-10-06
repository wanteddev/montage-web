import { figma } from '@figma/code-connect';

import { SearchField } from '@montage-ui/core';

figma.connect(SearchField, '<FIGMA_SEARCH_FIELD>', {
  props: {
    placeholder: figma.string('Placeholder'),
    variant: figma.enum('Variant', {
      Solid: 'solid',
      Outlined: 'outlined',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
  },
  example: (props) => <SearchField {...props} />,
});
