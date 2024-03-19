import { css } from '@emotion/react';
import { addOpacity } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const typeStyle = (theme: Theme) => css`
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 90%;
  white-space: break-spaces;
  color: ${theme.palette.label.neutral};
  word-spacing: 0.3em;
  background-color: ${addOpacity(theme.palette.label.strong, theme.opacity[8])};
`;
