import type { PropsWithChildren, ReactNode } from 'react';

export type GradientIconProps = PropsWithChildren<{
  gradient?: ReactNode;
  /**
   * viewBox as seen in figma
   */
  gradientViewBox?: string | SVGAnimatedRect | DOMRect;
  /**
   * viewBox of the actual icon (children)
   */
  defaultViewBox?: string | SVGAnimatedRect | DOMRect;
}>;

type NonNullableObject<T extends object> = {
  [P in keyof T]: Required<T[P]>;
};

export type NonNullableGradientIconProps = NonNullableObject<GradientIconProps>;
