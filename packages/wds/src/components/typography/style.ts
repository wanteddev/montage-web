import { css } from '@wanteddev/wds-engine';

import { type TypographyVariant, type TypographyWeight } from './types';

import type { SerializedStyles } from '@wanteddev/wds-engine';

export const variantMap: {
  [key in TypographyVariant]: SerializedStyles;
} = {
  display1: css`
    font-size: 3.5rem;
    line-height: 4.5rem;
    letter-spacing: -0.0319em;
  `,
  display2: css`
    font-size: 2.5rem;
    line-height: 3.25rem;
    letter-spacing: -0.0282em;
  `,
  display3: css`
    font-size: 2.25rem;
    line-height: 3rem;
    letter-spacing: -0.027em;
  `,
  title1: css`
    font-size: 2rem;
    line-height: 2.75rem;
    letter-spacing: -0.0253em;
  `,
  title2: css`
    font-size: 1.75rem;
    line-height: 2.375rem;
    letter-spacing: -0.0236em;
  `,
  title3: css`
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.023em;
  `,
  heading1: css`
    font-size: 1.375rem;
    line-height: 1.875rem;
    letter-spacing: -0.0194em;
  `,
  heading2: css`
    font-size: 1.25rem;
    line-height: 1.75rem;
    letter-spacing: -0.012em;
  `,
  headline1: css`
    font-size: 1.125rem;
    line-height: 1.625rem;
    letter-spacing: -0.002em;
  `,
  headline2: css`
    font-size: 1.0625rem;
    line-height: 1.5rem;
    letter-spacing: 0em;
  `,
  body1: css`
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.0057em;
  `,
  'body1-reading': css`
    font-size: 1rem;
    line-height: 1.625rem;
    letter-spacing: 0.0057em;
  `,
  body2: css`
    font-size: 0.9375rem;
    line-height: 1.375rem;
    letter-spacing: 0.0096em;
  `,
  'body2-reading': css`
    font-size: 0.9375rem;
    line-height: 1.5rem;
    letter-spacing: 0.0096em;
  `,
  label1: css`
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.0145em;
  `,
  'label1-reading': css`
    font-size: 0.875rem;
    line-height: 1.375rem;
    letter-spacing: 0.0145em;
  `,
  label2: css`
    font-size: 0.8125rem;
    line-height: 1.125rem;
    letter-spacing: 0.0194em;
  `,
  caption1: css`
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.0252em;
  `,
  caption2: css`
    font-size: 0.6875rem;
    line-height: 0.875rem;
    letter-spacing: 0.0311em;
  `,
} as const;

export const getWeightMap = (
  variant: TypographyVariant,
): {
  [key in TypographyWeight]: SerializedStyles;
} => ({
  regular: css`
    font-weight: 400;
  `,
  medium: css`
    font-weight: 500;
  `,
  bold:
    variant === 'display1' ||
    variant === 'display2' ||
    variant === 'display3' ||
    variant === 'title1' ||
    variant === 'title2' ||
    variant === 'title3'
      ? css`
          font-weight: 700;
        `
      : css`
          font-weight: 600;
        `,
});
