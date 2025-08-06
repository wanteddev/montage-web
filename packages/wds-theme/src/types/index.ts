import type { darkTheme, lightTheme } from '../theme';

export type Theme = typeof lightTheme | typeof darkTheme;

export type BreakPoint = Theme['breakpoint'];
export type Spacing = Theme['spacing'];

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
