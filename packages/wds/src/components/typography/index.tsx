'use client';
import { forwardRef } from 'react';
import { css as emotionCss, useTheme } from '@emotion/react';

import { ellipsisTypographyStyle, typographyStyle } from '@/utils/typography';
import { getColorByToken } from '@/utils/color';
import { createResponsiveStyle } from '@/utils';

import type { BreakPoint, Merge, MergeWithCustomElementProps } from '@/types';
import type { TypographyProps, TypographyResponsiveProps } from './types';
import type { ElementType, ForwardedRef, ReactNode } from 'react';

const getPreviousVariant = (
  params: TypographyResponsiveProps,
  defaultValue: TypographyProps['variant'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.variant || defaultValue;
    case 'md':
      return params.md?.variant || params.lg?.variant || defaultValue;
    case 'sm':
      return (
        params.sm?.variant ||
        params.md?.variant ||
        params.lg?.variant ||
        defaultValue
      );
    case 'xs':
      return (
        params.xs?.variant ||
        params.sm?.variant ||
        params.md?.variant ||
        params.lg?.variant ||
        defaultValue
      );
  }
};

const getPreviousWeight = (
  params: TypographyResponsiveProps,
  defaultValue: TypographyProps['weight'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.weight || defaultValue;
    case 'md':
      return params.md?.weight || params.lg?.weight || defaultValue;
    case 'sm':
      return (
        params.sm?.weight ||
        params.md?.weight ||
        params.lg?.weight ||
        defaultValue
      );
    case 'xs':
      return (
        params.xs?.weight ||
        params.sm?.weight ||
        params.md?.weight ||
        params.lg?.weight ||
        defaultValue
      );
  }
};

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  Merge<TypographyResponsiveProps, TypographyProps>
>;

const Typography = forwardRef(
  <E extends ElementType = 'span'>(
    {
      as,
      variant = 'body1_normal',
      weight = 'regular',
      noWrap = false,
      display = 'inline',
      align = 'left',
      color,
      xs,
      sm,
      md,
      lg,
      ...props
    }: Props<E>,
    ref: ForwardedRef<Props<E>['as']>,
  ) => {
    const theme = useTheme();

    const Element = as ?? 'span';

    return (
      <Element
        ref={ref}
        css={emotionCss`
            ${typographyStyle(variant, weight)}
            ${noWrap && ellipsisTypographyStyle(1)}
            ${
              Boolean(align) &&
              emotionCss`
                text-align: ${align};
              `
            }
            ${
              Boolean(display) &&
              emotionCss`
                display: ${display};
              `
            }
            ${
              Boolean(color)
                ? emotionCss`
                  color: ${getColorByToken(theme, color!)};
                `
                : emotionCss`
                  color: inherit;
                `
            }

            ${createResponsiveStyle(
              { xs, sm, md, lg },
              theme,
            )(
              (params, breakpoint) => emotionCss`
                ${
                  (Boolean(params?.variant) || Boolean(params?.weight)) &&
                  typographyStyle(
                    getPreviousVariant(
                      { xs, sm, md, lg },
                      variant,
                      breakpoint!,
                    )!,
                    getPreviousWeight({ xs, sm, md, lg }, weight, breakpoint!),
                  )
                }

                ${
                  Boolean(params?.align) &&
                  emotionCss`
                    text-align: ${params?.align};
                  `
                }
                
                ${params?.css}
            `,
            )};
        `}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

export default Typography as <E extends ElementType = 'span'>(
  props: Props<E>,
) => ReactNode;
