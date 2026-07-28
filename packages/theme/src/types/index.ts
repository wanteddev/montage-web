import type { darkTheme, lightTheme } from '../theme';

export type Theme = typeof lightTheme | typeof darkTheme;

export type BreakPoint = Theme['breakpoint'];

type MergeWithDot<T extends string> = T extends '' ? '' : `.${T}`;

type ObjectToNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<
          keyof T,
          symbol
        >]: `${K}${MergeWithDot<ObjectToNestedKeys<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;

export type ThemeToken = ObjectToNestedKeys<Theme>;

type PickThemeShadowToken<T extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends `semantic.elevation.shadow.${infer _}` ? T : never;

export type ThemeShadowToken = PickThemeShadowToken<
  ObjectToNestedKeys<Pick<Theme, 'semantic'>>
>;

export type ThemeColorsToken =
  | ObjectToNestedKeys<Pick<Theme, 'atomic'>>
  | Exclude<
      ObjectToNestedKeys<Pick<Theme, 'semantic'>>,
      'semantic.platform.ios.navigation' | ThemeShadowToken
    >;
export type ThemeOpacityToken = ObjectToNestedKeys<Pick<Theme, 'opacity'>>;
export type ThemeTypographyToken = ObjectToNestedKeys<
  Pick<Theme, 'typography'>
>;
export type ThemePrimitiveToken = ObjectToNestedKeys<Pick<Theme, 'primitive'>>;
export type ThemeSpacingToken = ObjectToNestedKeys<Pick<Theme, 'spacing'>>;
export type ThemeDimensionToken = ObjectToNestedKeys<Pick<Theme, 'dimension'>>;
export type ThemeRadiusToken = ObjectToNestedKeys<Pick<Theme, 'radius'>>;
export type ThemeZIndexToken = ObjectToNestedKeys<Pick<Theme, 'zIndex'>>;

/**
 * Converts a camelCase key into its kebab-case form.
 * The uppercase-and-lowercase branch keeps digits from gaining a separator,
 * so `display1` stays `display1` instead of becoming `display-1`.
 *
 * @example
 * type A = KebabCase<'body2Reading'>; // 'body2-reading'
 */
type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends Uppercase<Head>
    ? Head extends Lowercase<Head>
      ? `${Head}${KebabCase<Tail>}`
      : `-${Lowercase<Head>}${KebabCase<Tail>}`
    : `${Head}${KebabCase<Tail>}`
  : S;

/** camelCase key of a typography token, e.g. `body2Reading`. */
export type TypographyVariantKey = keyof Theme['typography'];

/** Public `variant` name, e.g. `body2-reading`. */
export type TypographyVariant = KebabCase<TypographyVariantKey>;

export type TypographyWeight =
  keyof Theme['typography'][TypographyVariantKey]['weight'];
