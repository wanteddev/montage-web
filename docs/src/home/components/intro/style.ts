import { css } from '@wanteddev/wds';

import { MARGIN_TOP } from './constants';

export const introBackgroundStyle = css`
  position: relative;
  background-image: url(/background-image.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: ${MARGIN_TOP}px;
`;
