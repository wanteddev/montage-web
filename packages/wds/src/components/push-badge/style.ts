import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';
import type { PushBadgeProps } from './types';

export const pushBadgeWrapperStyle = css`
  width: fit-content;
  height: fit-content;
  display: inline-flex;
  vertical-align: middle;
  position: relative;
  border-radius: inherit;
`;

export const pushBadgeStyle =
  ({ variant, invisible }: PushBadgeProps) =>
  (theme: Theme) => css`
    transform-origin: 100% 0%;
    z-index: 1;
    position: absolute;
    right: 0px;
    top: 0px;
    transform: scale(0) translate(50%, -50%);
    transition: transform 0.2s ease;

    ${invisible &&
    css`
      transform: scale(1) translate(50%, -50%);
    `}

    ${pushBadgeVariantStyle({ variant }, theme)}
  `;

const pushBadgeVariantStyle = ({ variant }: PushBadgeProps, theme: Theme) => {
  switch (variant) {
    case 'dot':
      return css`
        display: inline-flex;
        justify-content: center;
        flex-shrink: 0;
        align-items: center;
        font-size: 4px;
        color: ${theme.palette.primary.normal};
      `;
    case 'new':
    case 'number':
    default:
      return css`
        text-align: center;
        display: inline-flex;
        height: 20px;
        width: 20px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        padding: 0px 6px;
        color: ${theme.palette.static.white};
        background-color: ${theme.palette.primary.normal};
        border-radius: 9999px;

        & > span {
          display: block;
          height: fit-content;
          line-height: 1;
        }
      `;
  }
};
