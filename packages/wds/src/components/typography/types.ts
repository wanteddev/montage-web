import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

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

export type TypographyDefaultProps = {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  noWrap?: boolean;
  align?: CSSProperties['textAlign'];
  display?: CSSProperties['display'];
  color?: ThemeColorsToken;
  children?: ReactNode;
};

export type TypographyResponsiveProps = ResponsiveProps<
  Pick<TypographyDefaultProps, 'variant' | 'weight' | 'align'>
>;

export type TypographyProps = Merge<
  TypographyResponsiveProps,
  TypographyDefaultProps
>;
