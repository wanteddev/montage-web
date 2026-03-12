import figma from '@figma/code-connect';

import { IconSymbol } from '@montage-ui/icon';

figma.connect(IconSymbol, '<FIGMA_ICONS_SYMBOL>', {
  example: () => <IconSymbol />,
});
