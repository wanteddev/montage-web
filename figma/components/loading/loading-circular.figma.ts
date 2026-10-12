// url=<FIGMA_LOADING_CIRCULAR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/loading/index.tsx
// component=Loading

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

export default inlineInstances({
  id: 'Loading',
  imports: ["import { Loading } from '@montage-ui/core';"],
  example: figma.code`<Loading variant="circular"/>`,
});
