import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  JSX,
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

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type Merge<T, K> = T & DistributiveOmit<K, keyof T>;

export type WithSxProps<T> = T & { sx?: SxProp } & ResponsiveProps<{}>;

export type ResponsiveProps<T> = {
  [key in keyof BreakPoint]?: keyof T extends never
    ? { sx?: CSSInterpolation }
    : Merge<T, { sx?: CSSInterpolation }>;
};

export { CSSInterpolation };

export interface PolymorphicComponent<P, E extends ElementType = 'div'> {
  <C extends ElementType = E>(
    props: {
      as?: C;
    } & OverrideProps<P, C>,
  ): JSX.Element;
  (props: DefaultComponentProps<P, E>): JSX.Element;
  propTypes?: any;
  displayName?: string | undefined;
}

export type OverrideProps<P, C extends ElementType> = Merge<
  P,
  ComponentPropsWithoutRef<C>
> & {
  ref?: Ref<ElementRef<C>> | LegacyRef<ElementRef<C>>;
  sx?: SxProp;
};

export type PolymorphicProps<P, C extends ElementType = 'div'> = {
  as?: C;
} & OverrideProps<P, C>;

export type DefaultComponentProps<P, E extends ElementType = 'div'> = Merge<
  P,
  ComponentPropsWithoutRef<E>
> & {
  sx?: SxProp;
  ref?: Ref<ElementRef<E>> | LegacyRef<ElementRef<E>>;
};
