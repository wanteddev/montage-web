import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const footerStyle = (theme: Theme) => css`
  position: relative;
  width: 100%;
  gap: 20px;
  padding: 32px 0px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }
`;

export const footerLinkStyle = (theme: Theme) => css`
  font-size: 14px;
  font-weight: 600;
  line-height: 142.9%;
  letter-spacing: 0.203px;
  color: ${theme.semantic.label.neutral};
`;

export const footerTextButtonStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.neutral};
  gap: 2px;

  & > span {
    ${typographyStyle('label2', 'bold')}
  }
  svg {
    font-size: 16px;
  }
`;
