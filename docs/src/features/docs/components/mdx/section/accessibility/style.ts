import { addOpacity, css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const kbdStyle = (theme: Theme) => css`
  ${typographyStyle('caption2', 'medium')}
  color: ${theme.semantic.label.normal};
  background-color: ${theme.semantic.fill.alternative};
  border-radius: 6px;
  padding: 4px 6px;
  box-shadow:
    0 0 0 1px ${theme.semantic.line.normal.alternative} inset,
    2px 2px 3px 0 ${addOpacity(theme.semantic.static.white, theme.opacity[5])}
      inset,
    1px -1px 3px 0 ${addOpacity(theme.semantic.static.black, theme.opacity[5])} inset;
`;
