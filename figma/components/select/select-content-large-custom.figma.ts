// url=<FIGMA_SELECT_CONTENT_LARGE_CUSTOM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/select/index.tsx
// component=SelectContent

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

export default inlineInstances({
  id: 'SelectContent',
  imports: ["import { SelectContent } from '@montage-ui/core';"],
  example: figma.code`<SelectContent variant="custom"/>`,
});
