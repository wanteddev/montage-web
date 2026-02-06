import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  JSX,
  Ref,
} from 'react';
import type { Interpolation } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';
import type { BreakPoint, Theme } from '@wanteddev/wds-theme';

export {
  type ThemeToken,
  type BreakPoint,
  type Spacing,
  type Theme,
  type ThemeColorsToken,
  type ThemeShadowToken,
  type ThemeOpacityToken,
} from '@wanteddev/wds-theme';
export type {
  EmotionCache,
  SerializedStyles,
  Interpolation,
} from '@emotion/react';
export type { Options as CacheOptions } from '@emotion/cache';

/**
 * Type for the `sx` prop, enabling Emotion styles with theme support.
 *
 * @example
 * <Box sx={{ color: 'primary' }} />
 */
export type SxProp = Interpolation<Theme>;

/**
 * Omits a set of keys from each member of a union type.
 *
 * @example
 * type A = { a: string; b: number } | { a: string; c: boolean };
 * type B = DistributiveOmit<A, 'a'>; // { b: number } | { c: boolean }
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/**
 * Merges two types, with properties from the first type taking precedence.
 *
 * @example
 * type A = { a: string; b: number };
 * type B = { b: boolean; c: string };
 * type C = Merge<A, B>; // { a: string; b: number; c: string }
 */
export type Merge<T, K> = T & DistributiveOmit<K, keyof T>;

/**
 * Merges custom props with element props, excluding the element's `as` prop
 * to prevent conflicts with the polymorphic `as` prop
 * (e.g., Next.js Link's `as?: Url`).
 */
type MergeElementProps<P, C extends ElementType> = P &
  DistributiveOmit<ComponentPropsWithoutRef<C>, keyof P | 'as'>;

/**
 * Adds the `sx` prop to a given props type for custom Emotion styling.
 *
 * @example
 * type ButtonProps = WithSxProps<{ disabled?: boolean }>;
 * // { disabled?: boolean; sx?: SxProp }
 */
export type WithSxProps<T> = T & { sx?: SxProp };

/**
 * Defines responsive props for each breakpoint, optionally including an `sx` style.
 *
 * @example
 * type Responsive = ResponsiveProps<{ color: string }>;
 * // { sm?: { color: string; sx?: CSSInterpolation }; ... }
 */
export type ResponsiveProps<T> = {
  [key in keyof BreakPoint]?: keyof T extends never
    ? { sx?: CSSInterpolation }
    : Merge<T, { sx?: CSSInterpolation }>;
};

export { CSSInterpolation };

/**
 * Merges custom props with the props of a given element type, including `ref` and `sx`.
 * Used for polymorphic components supporting the `as` prop.
 *
 * @template P Custom props
 * @template C React element type
 *
 * @example
 * type Props = OverrideProps<{ custom: string }, 'a'>;
 */
export type OverrideProps<P, C extends ElementType> = MergeElementProps<
  P,
  C
> & {
  ref?: Ref<ComponentRef<C>>;
  sx?: SxProp;
};

/**
 * Like OverrideProps, but excludes `sx`. Used internally when handling `sx` separately.
 *
 * @template P Custom props
 * @template C React element type
 *
 * @example
 * type Props = OverridePropsInternal<{ custom: string }, 'a'>;
 */
export type OverridePropsInternal<P, C extends ElementType> = MergeElementProps<
  P,
  C
> & {
  ref?: Ref<ComponentRef<C>>;
};

/**
 * Props for a polymorphic component supporting the `as` prop.
 *
 * - `as` allows rendering as a different element/component (default: 'div').
 * - Combines custom props, element props, `ref`, and `sx`.
 *
 * @template P Custom props
 * @template C React element type (default: 'div')
 *
 * @example
 * type ButtonProps = PolymorphicProps<{ custom: string }, 'a'>;
 */
export type PolymorphicProps<P, C extends ElementType = 'div'> = {
  as?: C;
} & OverrideProps<P, C>;

/**
 * Interface for a polymorphic React component supporting the `as` prop.
 *
 * - Can render as different elements/components via `as`.
 * - Supports generic and default element types.
 * - Includes standard static properties.
 *
 * @template P Custom props
 * @template E Default element type (default: 'div')
 */
export interface PolymorphicComponent<P, E extends ElementType = 'div'> {
  /**
   * Render as a specified element type.
   */
  <C extends ElementType = E>(
    props: {
      as?: C;
    } & OverrideProps<P, C>,
  ): JSX.Element;
  /**
   * Render as the default element type.
   */
  (props: DefaultComponentProps<P, E>): JSX.Element;
  propTypes?: any;
  displayName?: string | undefined;
}

/**
 * Default props for a component, merging custom props with a specified element type.
 *
 * - Adds `sx` for styling and `ref` forwarding.
 *
 * @template P Custom props
 * @template E React element type (default: 'div')
 */
export type DefaultComponentProps<
  P,
  E extends ElementType = 'div',
> = MergeElementProps<P, E> & {
  sx?: SxProp;
  ref?: Ref<ComponentRef<E>>;
};

/**
 * Internal: Removes `sx` from a props type wrapped with `WithSxProps`.
 *
 * - Use inside component implementations to handle `sx` separately.
 * - `P` must be a type wrapped with `WithSxProps`.
 *
 * @template P Props with `WithSxProps`
 * @template E React element type (default: 'div')
 *
 * @example
 * ```tsx
 * export type MyComponentProps = WithSxProps<{ ... }>
 *
 * const Component = (props: DefaultComponentPropsInternal<MyComponentProps, 'div'>) => {}
 * ```
 */
export type DefaultComponentPropsInternal<
  P,
  E extends ElementType = 'div',
> = MergeElementProps<P, E> & {
  ref?: Ref<ComponentRef<E>>;
};

/**
 * Internal: Removes `sx` from a props type wrapped with `WithSxProps` for polymorphic components.
 *
 * - Use inside component implementations to handle `sx` separately.
 * - `P` must be a type wrapped with `WithSxProps`.
 *
 * @template P Props with `WithSxProps`
 * @template C React element type (default: 'div')
 *
 * @example
 * ```tsx
 * export type MyComponentProps = WithSxProps<{ ... }>
 *
 * const Component = <T extends ElementType = 'div'>(props: PolymorphicPropsInternal<MyComponentProps, T>) => {}
 * ```
 */
export type PolymorphicPropsInternal<P, C extends ElementType = 'div'> = {
  as?: C;
} & OverridePropsInternal<P, C>;

/**
 * Internal: Interface for a polymorphic component without the `sx` prop.
 *
 * - Use inside component implementations to handle `sx` separately.
 * - `P` must be a type wrapped with `WithSxProps`.
 *
 * @template P Props with `WithSxProps`
 * @template E Default element type (default: 'div')
 *
 * @example
 * ```tsx
 * export type MyComponentProps = WithSxProps<{ ... }>
 *
 * const Component = forwardRef(
 *   <T extends ElementType = 'div'>(
 *     props: PolymorphicPropsInternal<MyComponentProps, T>,
 *     ref: ForwardedRef<T>,
 *   ) => {
 *     return <Box ref={ref} {...props} />;
 *   },
 * ) as PolymorphicComponentInternal<MyComponentProps, 'div'>;
 * ```
 */
export interface PolymorphicComponentInternal<
  P,
  E extends ElementType = 'div',
> {
  <C extends ElementType = E>(
    props: {
      as?: C;
    } & OverridePropsInternal<P, C>,
  ): JSX.Element;
  (props: DefaultComponentPropsInternal<P, E>): JSX.Element;
  propTypes?: any;
  displayName?: string | undefined;
}
