// url=<FIGMA_PAGINATION_CONTENT_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/pagination/index.tsx
// component=PaginationField

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

export default inlineInstances({
  id: 'PaginationField',
  imports: ["import { PaginationField } from '@montage-ui/core';"],
  example: figma.code`<PaginationField />`,
});
