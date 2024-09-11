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
    flex-wrap: nowrap;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    ${isScrollable &&
    css`
      ${gradient('transparent', 'right', '40px')}
    `}
  `;
