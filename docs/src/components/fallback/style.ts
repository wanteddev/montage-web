import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const fallbackTitleStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.assistive};
  font-size: 120px;
  font-style: normal;
  font-weight: 700;
  line-height: 85px;
  letter-spacing: -3.384px;
  text-align: center;
`;
