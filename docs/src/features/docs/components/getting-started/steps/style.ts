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

export const guideLinkStyle = css`
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
