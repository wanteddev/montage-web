import figma from '@figma/code-connect';

import { IconSymbol } from '@wanteddev/wds-icon';

figma.connect(IconSymbol, '<FIGMA_ICONS_SYMBOL>', {
  example: () => <IconSymbol />,
});
