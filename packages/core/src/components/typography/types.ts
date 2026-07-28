import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  TypographyVariant,
  TypographyWeight,
  WithSxProps,
} from '@montage-ui/engine';
import type { CSSProperties, ReactNode } from 'react';

export type { TypographyVariant, TypographyWeight };

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
