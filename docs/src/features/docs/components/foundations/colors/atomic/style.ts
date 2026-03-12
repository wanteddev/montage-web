import { css, typographyStyle } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

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
