import { css } from '@wanteddev/wds-engine';

import { getGradientMaskImage } from '../../utils';

export const customSelectMultipleRenderWrapperStyle = ({
  overflow,
  isScrollableLeft,
  isScrollableRight,
}: {
  overflow: boolean;
  isScrollableLeft: boolean;
  isScrollableRight: boolean;
}) =>
  overflow
    ? css`
        overflow: hidden;
      `
    : css`
        overflow: hidden;

        > div {
          overflow: scroll;

          &::-webkit-scrollbar {
            display: none;
          }
          -ms-overflow-style: none;
          scrollbar-width: none;

          ${(isScrollableLeft || isScrollableRight) &&
          css`
            mask-composite: intersect;
            mask-image: ${[
              isScrollableRight &&
                getGradientMaskImage('right', '40px', 'mask'),
              isScrollableLeft && getGradientMaskImage('left', '40px', 'mask'),
            ]
              .filter(Boolean)
              .join(', ')};
          `}
        }
      `;
