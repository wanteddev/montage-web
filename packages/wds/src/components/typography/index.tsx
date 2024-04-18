'use client';
import { forwardRef } from 'react';
import { css as emotionCss, useTheme } from '@emotion/react';

import { getColorByToken } from '../../utils/color';
import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/responsive-props';
import {
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils/typography';

import type { MergeWithCustomElementProps } from '../../types';
import type { TypographyProps } from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

type Props<E extends ElementType> = MergeWithCustomElementProps<
  E,
  TypographyProps
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
      xl,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const theme = useTheme();

    const Element = as || 'span';

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
              { xs, sm, md, lg, xl },
              theme,
            )(
              (params, breakpoint) => emotionCss`
                ${
                  (Boolean(params?.variant) || Boolean(params?.weight)) &&
                  typographyStyle(
                    getPreviousValue(
                      { xs, sm, md, lg, xl },
                      'variant',
                      variant,
                      breakpoint!,
                    )!,
                    getPreviousValue(
                      { xs, sm, md, lg, xl },
                      'weight',
                      weight,
                      breakpoint!,
                    ),
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
) => JSX.Element;
