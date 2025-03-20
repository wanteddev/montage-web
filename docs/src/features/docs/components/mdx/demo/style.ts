import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const demoWrapperStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.normal.normal};
  background-color: ${theme.semantic.background.normal.normal};
  border-radius: 16px;
  overflow: hidden;
  margin-block: 16px;
`;

export const demoStyle =
  (hideCode: boolean, hatched: boolean) => (theme: Theme) => css`
    padding: 16px;
    border-bottom: 1px solid ${theme.semantic.line.normal.normal};
    background-color: ${theme.semantic.background.normal.normal};
    position: relative;

    ${hideCode &&
    css`
      border: none;
    `}

    ${hatched &&
    css`
      background-color: ${theme.semantic.background.normal.normal};
      background-image: linear-gradient(
          45deg,
          ${theme.semantic.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          135deg,
          ${theme.semantic.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          45deg,
          transparent 75%,
          ${theme.semantic.background.normal.alternative} 75%
        ),
        linear-gradient(
          135deg,
          transparent 75%,
          ${theme.semantic.background.normal.alternative} 75%
        );
      background-position:
        0px 0px,
        10px 0px,
        10px -10px,
        0px 10px;
      background-size: 20px 20px;
    `}
  `;
