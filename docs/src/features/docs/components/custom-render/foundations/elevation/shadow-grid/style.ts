import { addOpacity, css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const shadowTokenStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.normal.normal};
  width: 24px;
  height: 24px;
  display: inline-block;
  margin-right: 12px;
  border-radius: 50%;
  border: 1px solid ${addOpacity(theme.semantic.static.black, 0.1)};
`;

export const tokenBodyStyle = (theme: Theme) => css`
  tr:not(:last-child) {
    border-bottom: 1px solid ${theme.semantic.line.normal.alternative};
  }
`;

export const tokenHeadCellStyle = css`
  ${typographyStyle('body1', 'medium')}
`;

export const tokenCellStyle = css`
  padding-bottom: 16px;
  ${typographyStyle('body1', 'medium')}
`;
