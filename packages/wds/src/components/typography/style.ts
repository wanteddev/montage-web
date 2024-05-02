import { css } from '@wanteddev/wds-engine';

import { type TypographyVariant, type TypographyWeight } from './types';

import type { SerializedStyles } from '@wanteddev/wds-engine';

export const variantMap: {
  [key in TypographyVariant]: SerializedStyles;
} = {
  display1: css`
    font-size: 56px;
    line-height: 72px;
    letter-spacing: -0.0319em;
  `,
  display2: css`
    font-size: 40px;
    line-height: 52px;
    letter-spacing: -0.0282em;
  `,
  title1: css`
    font-size: 36px;
    line-height: 48px;
    letter-spacing: -0.027em;
  `,
  title2: css`
    font-size: 28px;
    line-height: 38px;
    letter-spacing: -0.0236em;
  `,
  title3: css`
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.023em;
  `,
  heading1: css`
    font-size: 22px;
    line-height: 30px;
    letter-spacing: -0.0194em;
  `,
  heading2: css`
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.012em;
  `,
  headline1: css`
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.002em;
  `,
  headline2: css`
    font-size: 17px;
    line-height: 24px;
    letter-spacing: 0em;
  `,
  body1_normal: css`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.0057em;
  `,
  body1_reading: css`
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.0057em;
  `,
  body2_normal: css`
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.0096em;
  `,
  body2_reading: css`
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.0096em;
  `,
  label1_normal: css`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.0145em;
  `,
  label1_reading: css`
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.0145em;
  `,
  label2: css`
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.0194em;
  `,
  caption1: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.0252em;
  `,
  caption2: css`
    font-size: 11px;
    line-height: 14px;
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
