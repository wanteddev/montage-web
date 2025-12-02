import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const paletteTitleStyle = (theme: Theme) => css`
  && {
    margin-top: 48px;
    margin-bottom: 12px;
    color: ${theme.semantic.label.strong};

    ${typographyStyle('headline2', 'bold')}

    &:first-of-type {
      margin-top: 0px;
    }
  }
`;
