import type { Scope } from '@radix-ui/react-context';
import type {
  Theme as EmotionTheme,
  Interpolation,
  SerializedStyles,
} from '@emotion/react';
import type { darkTheme, lightTheme } from '../theme';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  Ref,
} from 'react';

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
export type ThemeColorsToken = ObjectToNestedKeys<Pick<Theme, 'palette'>>;
export type ThemeOpacityToken = ObjectToNestedKeys<Pick<Theme, 'opacity'>>;

export type Merge<T, K> = T & Omit<K, keyof T>;

export type MergeWithCustomElementProps<E extends ElementType, T> = Merge<
  Merge<
    T,
    { css?: Interpolation<EmotionTheme>; as?: E; ref?: Ref<ElementRef<E>> }
  >,
  ComponentPropsWithoutRef<E>
>;

export type MergeElementProps<E extends keyof JSX.IntrinsicElements, T> = Merge<
  Merge<T, { css?: Interpolation<EmotionTheme>; ref?: Ref<ElementRef<E>> }>,
  ComponentPropsWithoutRef<E>
>;

export type MergeWithCss<T, K> = Merge<
  Merge<T, K>,
  { css?: Interpolation<EmotionTheme> }
>;

export type ResponsiveProps<T> = {
  [key in keyof BreakPoint]?: keyof T extends never
    ? { css?: SerializedStyles }
    : Merge<T, { css?: SerializedStyles }>;
};

type ScopeName<S extends string> = S extends `${infer P}`
  ? `__scope${P}`
  : never;

export type ScopedProps<T, N extends string> = Merge<
  T,
  { [key in ScopeName<N>]?: Scope }
>;
