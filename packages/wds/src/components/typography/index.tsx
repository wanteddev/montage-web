'use client';
import { forwardRef } from 'react';
import { Box, css, getColorByToken } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/responsive-props';
import {
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils/typography';

import type { MergeWithCustomElementProps } from '@wanteddev/wds-engine';
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
      sx,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Box
        as={(as || 'span') as ElementType}
        ref={ref}
        sx={[
          (theme) => css`
            ${typographyStyle(variant, weight)}
            ${noWrap && ellipsisTypographyStyle(1)}
            ${Boolean(align) &&
            css`
              text-align: ${align};
            `}
            ${Boolean(display) &&
            css`
              display: ${display};
            `}
            ${Boolean(color)
              ? css`
                  color: ${getColorByToken(theme, color!)};
                `
              : css`
                  color: inherit;
                `}

            ${createResponsiveStyle(
              { xs, sm, md, lg, xl },
              theme,
            )(
              (params, breakpoint) => css`
                ${(Boolean(params?.variant) || Boolean(params?.weight)) &&
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
                )}

                ${Boolean(params?.align) &&
                css`
                  text-align: ${params?.align};
                `}
                
                ${params?.sx}
              `,
            )};
          `,
          sx,
        ]}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

export default Typography as <E extends ElementType = 'span'>(
  props: Props<E>,
) => JSX.Element;
