import type { darkTheme, lightTheme } from './theme';

export * from './theme';
export * from './utils';

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
export type ThemeColorsToken =
  | ObjectToNestedKeys<Pick<Theme, 'atomic'>>
  | Exclude<
      ObjectToNestedKeys<Pick<Theme, 'semantic'>>,
      | 'semantic.platform.ios.navigation'
      | 'semantic.elevation.shadow.emphasize'
      | 'semantic.elevation.shadow.normal'
      | 'semantic.elevation.shadow.heavy'
      | 'semantic.elevation.shadow.strong'
    >;
export type ThemeOpacityToken = ObjectToNestedKeys<Pick<Theme, 'opacity'>>;
