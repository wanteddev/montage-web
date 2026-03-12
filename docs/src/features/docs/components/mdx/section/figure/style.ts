import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const sectionFigureStyle = css`
  && {
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const sectionFigureVariantStyle =
  (variant: 'positive' | 'negative') => (theme: Theme) => css`
    color: ${variant === 'positive'
      ? theme.semantic.status.positive
      : theme.semantic.status.negative};
  `;
