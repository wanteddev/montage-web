import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const guideIndexStyle = (theme: Theme) => css`
  width: 20px;
  height: 20px;
  background-color: ${theme.semantic.label.strong};
  border-radius: 1000px;
  display: block;
  flex-shrink: 0;
`;

export const listStyle = css`
  && {
    padding: 0;
    margin: 0;
    flex-direction: row;
    gap: 8px;
  }
`;
