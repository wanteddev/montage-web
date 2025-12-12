import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'display3'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'heading1'
  | 'heading2'
  | 'headline1'
  | 'headline2'
  | 'body1'
  | 'body1-reading'
  | 'body2'
  | 'body2-reading'
  | 'label1'
  | 'label1-reading'
  | 'label2'
  | 'caption1'
  | 'caption2';

export type TypographyWeight = 'regular' | 'medium' | 'bold';

export type TypographyDefaultProps = WithSxProps<{
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  /**
   * Whether to wrap the text.
   * If `noWrap` is set to true, the text will not wrap and overflowing content will be displayed with ellipsis.
   */
  noWrap?: boolean;
  /** The alignment of the text. */
  align?: CSSProperties['textAlign'];
  /** The display of the text. */
  display?: CSSProperties['display'];
  color?: ThemeColorsToken;
  children?: ReactNode;
}>;

export type TypographyResponsiveProps = ResponsiveProps<
  Pick<TypographyDefaultProps, 'variant' | 'weight' | 'align'>
>;

export type TypographyProps = Merge<
  TypographyResponsiveProps,
  TypographyDefaultProps
>;
