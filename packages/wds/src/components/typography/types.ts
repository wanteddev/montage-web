import type { ResponsiveProps, ThemeColorsToken } from '../../types';
import type { CSSProperties } from 'react';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'heading1'
  | 'heading2'
  | 'headline1'
  | 'headline2'
  | 'body1_normal'
  | 'body1_reading'
  | 'body2_normal'
  | 'body2_reading'
  | 'label1_normal'
  | 'label1_reading'
  | 'label2'
  | 'caption1'
  | 'caption2';

export type TypographyWeight = 'regular' | 'medium' | 'bold';

export type TypographyProps = {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  noWrap?: boolean;
  align?: CSSProperties['textAlign'];
  display?: CSSProperties['display'];
  color?: ThemeColorsToken;
};

export type TypographyResponsiveProps = ResponsiveProps<
  Pick<TypographyProps, 'variant' | 'weight' | 'align'>
>;
