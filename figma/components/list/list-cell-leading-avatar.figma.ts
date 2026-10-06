// url=<FIGMA_LIST_CELL_LEADING_AVATAR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

// The cell owns the interaction and `ListCellContent variant="avatar"` sizes the
// avatar (slot default), so the avatar renders as a plain `Avatar` with its
// variant only (docs: List cell › Avatar).
const avatar = figma.selectedInstance.findInstance('Avatar');
const variant =
  avatar.type === 'ERROR'
    ? undefined
    : avatar.getEnum('Variant', {
        Person: 'person',
        Company: 'company',
        Academy: 'academy',
      });
const children = figma.tsx`<Avatar${variant ? ` variant="${variant}"` : ''} />`;
const imports = ["import { Avatar } from '@montage-ui/core';"];

export default {
  id: 'ListCellContent',
  imports: ["import { Avatar, ListCellContent } from '@montage-ui/core';"],
  example: figma.tsx`<ListCellContent variant="avatar">${children}</ListCellContent>`,
  metadata: {
    nestable: true,
    props: { variant: 'avatar', imports },
    __props: { children },
  },
};
