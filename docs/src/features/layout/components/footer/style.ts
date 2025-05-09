import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const footerStyle = (theme: Theme) => css`
  position: relative;
  padding: 64px 0px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }

  ${respondTo('620px')} {
    padding: 64px 0px;
    gap: 20px;
    flex-direction: column;

    &::before {
      left: -20px;
      width: calc(100% + 40px);
    }
  }
`;
