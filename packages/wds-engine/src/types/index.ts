import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  LegacyRef,
  Ref,
} from 'react';
import type { Interpolation } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';
import type { BreakPoint, Theme } from '@wanteddev/wds-theme';

export {
  type ThemeToken,
  type BreakPoint,
  type ThemeColorsToken,
  type Spacing,
  type Theme,
  type ThemeOpacityToken,
} from '@wanteddev/wds-theme';
export type {
  EmotionCache,
  SerializedStyles,
  Interpolation,
} from '@emotion/react';
export type { Options as CacheOptions } from '@emotion/cache';

export type SxProp = Interpolation<Theme>;

export type Merge<T, K> = T & Omit<K, keyof T>;

export type WithSxProps<T> = T & { sx?: SxProp } & ResponsiveProps<{}>;

export type MergeWithCustomElementProps<E extends ElementType, T> = Merge<
  Merge<
    T,
    {
      sx?: SxProp;
      as?: E;
      ref?: Ref<ElementRef<E>> | LegacyRef<ElementRef<E>>;
    }
  >,
  ComponentPropsWithoutRef<E>
>;

export type MergeElementProps<E extends keyof JSX.IntrinsicElements, T> = Merge<
  Merge<
    T,
    {
      sx?: SxProp;
      ref?: Ref<ElementRef<E>> | LegacyRef<ElementRef<E>>;
    }
  >,
  ComponentPropsWithoutRef<E>
>;

export type MergeWithCss<T, K> = Merge<Merge<T, K>, { sx?: SxProp }>;

export type ResponsiveProps<T> = {
  [key in keyof BreakPoint]?: keyof T extends never
    ? { sx?: CSSInterpolation }
    : Merge<T, { sx?: CSSInterpolation }>;
};

export { CSSInterpolation };
