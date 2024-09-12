import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

export const customSelectMultipleRenderWrapperStyle = ({
  overflow,
  isScrollable,
}: {
  overflow: boolean;
  isScrollable: boolean;
}) =>
  overflow === false &&
  css`
    overflow: hidden;
    ${isScrollable &&
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
    }
  `;
