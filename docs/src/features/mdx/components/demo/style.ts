import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const demoStyle =
  (hideCode: boolean, hatched: boolean) => (theme: Theme) => css`
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 16px;
    border: 1px solid ${theme.palette.line.normal.normal};
    background-color: ${theme.palette.background.normal.normal};
    position: relative;

    ${hideCode &&
    css`
      border-radius: 8px;
    `}

    ${hatched &&
    css`
      background-color: ${theme.palette.background.normal.normal};
      background-image: linear-gradient(
          45deg,
          ${theme.palette.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          135deg,
          ${theme.palette.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          45deg,
          transparent 75%,
          ${theme.palette.background.normal.alternative} 75%
        ),
        linear-gradient(
          135deg,
          transparent 75%,
          ${theme.palette.background.normal.alternative} 75%
        );
      background-position:
        0px 0px,
        10px 0px,
        10px -10px,
        0px 10px;
      background-size: 20px 20px;
    `}
  `;

export const errorStyle = (hideCode?: boolean) => (theme: Theme) => css`
  background-color: ${theme.palette.status.negative};
  color: ${theme.palette.static.white};
  padding: 2px 6px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
  border-radius: 4px;

  ${hideCode &&
  css`
    top: 0px;
  `}
`;
