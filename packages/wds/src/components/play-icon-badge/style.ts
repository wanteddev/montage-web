import { css } from '@wanteddev/wds-engine';

import { addOpacity, createResponsiveStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { PlayIconBadgeProps } from './types';

export const playIconBadgeStyle =
  ({ size, alternative, xs, sm, md, lg, xl }: PlayIconBadgeProps) =>
  (theme: Theme) => css`
    margin: 0px;
    border-radius: 1000px;
    position: relative;
    width: fit-content;
    height: fit-content;
    ${playIconBadgeSizeStyle(size)}

    svg {
      position: relative;
    }

    &::before {
      position: absolute;
      content: '';
      ${alternative
        ? css`
            background-color: ${addOpacity(
              theme.palette.coolNeutral[30],
              theme.opacity[61],
            )};
          `
        : css`
            backdrop-filter: blur(32px);
          `}
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      border-radius: inherit;
    }

    ${alternative
      ? css`
          svg {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[88])};
          }
        `
      : css`
          svg {
            color: ${addOpacity(theme.palette.static.white, theme.opacity[88])};

            @supports (-webkit-backdrop-filter: none) {
              color: ${addOpacity(
                theme.palette.coolNeutral[70],
                theme.opacity[74],
              )};
              will-change: mix-blend-mode;
              mix-blend-mode: plus-lighter;
            }
          }
        `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )((params) => {
      return css`
        ${playIconBadgeSizeStyle(params?.size)}
        ${params?.sx}
      `;
    })}
  `;

const playIconBadgeSizeStyle = (size: PlayIconBadgeProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px;
        svg {
          font-size: 24px;
        }
      `;
    case 'medium':
      return css`
        padding: 10px;
        svg {
          font-size: 40px;
        }
      `;
    case 'large':
      return css`
        padding: 12px;
        svg {
          font-size: 56px;
        }
      `;
  }
};

export const backgroundBlendStyle = (theme: Theme) => css`
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: inherit;
  background-color: ${addOpacity(
    theme.palette.static.white,
    theme.opacity[35],
  )};

  @supports (-webkit-backdrop-filter: none) {
    mix-blend-mode: plus-lighter;
    will-change: mix-blend-mode;
  }
`;

export const backgroundBlendLayerStyle = (theme: Theme) => css`
  background-color: ${addOpacity(
    theme.palette.static.black,
    theme.opacity[28],
  )};
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: inherit;
`;
