import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const preWrapperStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.fill.alternative};
  box-shadow: inset 0px 0px 0px 1px ${theme.semantic.line.normal.alternative};
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;

  [data-radix-scroll-area-content] {
    padding: 20px;
    min-width: initial !important;

    &:hover {
      button {
        opacity: 1;
      }
    }
  }
`;

export const preStyle = css`
  display: block;
  white-space: pre;
  ${typographyStyle('label1', 'regular')}
`;
