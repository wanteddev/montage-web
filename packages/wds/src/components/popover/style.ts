import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const popoverStyle = (theme: Theme) => css`
  background-color: ${addOpacity(
    theme.semantic.background.elevated.normal,
    theme.opacity[88],
  )};
  border-radius: 16px;
  padding: 16px;
  outline-style: none;
  box-shadow: ${theme.semantic.elevation.shadow.spread.small};
  backdrop-filter: blur(32px);
`;
