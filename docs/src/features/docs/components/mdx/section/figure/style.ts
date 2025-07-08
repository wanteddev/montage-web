import { addOpacity } from '@wanteddev/wds';
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionFigureStyle = css`
  && {
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const sectionFigureThumbnailStyle = (theme: Theme) => css`
  width: 100%;
  margin-bottom: 24px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${theme.semantic.line.normal.alternative};

  img {
    border-radius: initial;
  }
`;

export const sectionFigureVariantStyle =
  (variant: 'positive' | 'negative') => (theme: Theme) => css`
    padding: 20px;
    border-radius: 20px;
    background-color: ${addOpacity(
      variant === 'positive'
        ? theme.semantic.status.positive
        : theme.semantic.status.negative,
      theme.opacity[5],
    )};
    color: ${variant === 'positive'
      ? theme.semantic.status.positive
      : theme.semantic.status.negative};
  `;
