import { css, typographyVar } from '@montage-ui/engine';

import { type TypographyVariant, type TypographyWeight } from './types';

import type { SerializedStyles } from '@montage-ui/engine';

/** `body1Reading` (theme token key) -> `body1-reading` (public variant name) */
const toVariantName = (key: string) =>
  key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const tokenEntries = Object.entries(typographyVar);

export const variantMap = Object.fromEntries(
  tokenEntries.map(([key, token]) => [
    toVariantName(key),
    css`
      font-size: ${token.fontSize};
      line-height: ${token.lineHeight};
      letter-spacing: ${token.letterSpacing};
    `,
  ]),
) as {
  [key in TypographyVariant]: SerializedStyles;
};

const weightMap = Object.fromEntries(
  tokenEntries.map(([key, token]) => [
    toVariantName(key),
    {
      regular: css`
        font-weight: ${token.weight.regular};
      `,
      medium: css`
        font-weight: ${token.weight.medium};
      `,
      bold: css`
        font-weight: ${token.weight.bold};
      `,
    },
  ]),
) as {
  [variant in TypographyVariant]: {
    [weight in TypographyWeight]: SerializedStyles;
  };
};

export const getWeightMap = (
  variant: TypographyVariant,
): {
  [key in TypographyWeight]: SerializedStyles;
} => weightMap[variant];
