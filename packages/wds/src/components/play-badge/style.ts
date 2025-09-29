import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme } from '@wanteddev/wds-engine';
import type { PlayBadgeProps } from './types';

export const playBadgeStyle =
  ({ size, alternative, xs, sm, md, lg, xl }: PlayBadgeProps) =>
  (theme: Theme) => css`
    margin: 0px;
    border-radius: 1000px;
    position: relative;
    width: fit-content;
    height: fit-content;
    ${playBadgeSizeStyle(size)}

    ${alternative
      ? css`
          background-color: ${addOpacity(
            theme.atomic.coolNeutral[30],
            theme.opacity[61],
          )};
        `
      : css`
          backdrop-filter: blur(32px);
          background-color: ${addOpacity(
            theme.atomic.coolNeutral[40],
            theme.opacity[28],
          )};
        `}

    svg {
      position: relative;
      color: ${addOpacity(theme.semantic.static.white, theme.opacity[88])};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )((params) => {
      return css`
        ${playBadgeSizeStyle(params?.size)}
        ${params?.sx}
      `;
    })}
  `;

const playBadgeSizeStyle = (size: PlayBadgeProps['size']) => {
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
