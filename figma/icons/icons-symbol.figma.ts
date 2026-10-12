// url=<FIGMA_ICONS_SYMBOL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/icon/src/icon-symbol.tsx
// component=IconSymbol

import figma from 'figma';

import { inlineInstances } from '../helpers/imports';

export default inlineInstances({
  id: 'IconSymbol',
  imports: ["import { IconSymbol } from '@montage-ui/icon';"],
  example: figma.code`<IconSymbol />`,
});
