import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

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

        ${isScrollableRight &&
        css`
          ${gradient('transparent', 'right', '40px')}
        `}

        > div {
          overflow: scroll;

          &::-webkit-scrollbar {
            display: none;
          }
          -ms-overflow-style: none;
          scrollbar-width: none;

          ${isScrollableLeft &&
          css`
            ${gradient('transparent', 'left', '40px')}
          `}
        }
      `;
