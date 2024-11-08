import { figma } from '@figma/code-connect';

import { Loading } from '@wanteddev/wds';

figma.connect(Loading, '<FIGMA_LOADING_CIRCULAR>', {
  example: () => <Loading variant="circular" />,
});

figma.connect(Loading, '<FIGMA_LOADING_WANTED>', {
  example: () => <Loading variant="wanted" />,
});
