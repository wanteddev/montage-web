import { figma } from '@figma/code-connect';

import { Loading } from '@montage-ui/core';

figma.connect(Loading, '<FIGMA_LOADING_CIRCULAR>', {
  example: () => <Loading variant="circular" />,
});

figma.connect(Loading, '<FIGMA_LOADING_WANTED>', {
  example: () => <Loading variant="wanted" />,
});
