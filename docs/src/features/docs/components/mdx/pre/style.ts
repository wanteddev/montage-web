import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const preWrapperStyle = (theme: Theme) => css`
  background-color: light-dark(
    ${theme.semantic.background.normal.alternative},
    ${theme.semantic.background.elevated.normal}
  );
  box-shadow: inset 0px 0px 0px 1px ${theme.semantic.line.solid.alternative};
  border-radius: 8px;
  margin-bottom: 40px;
  position: relative;

  @supports not (color: light-dark(black, white)) {
    background-color: ${theme.semantic.background.normal.alternative};

    html[data-theme='dark'] & {
      background-color: ${theme.semantic.background.elevated.normal};
    }
  }

  [data-radix-scroll-area-content] {
    padding: 16px;
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
