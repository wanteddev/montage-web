import { forwardRef } from 'react';
import { Box, css, getColorByToken } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import {
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils/typography';

import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { TypographyProps } from './types';

const Typography = forwardRef(
  <T extends ElementType = 'span'>(
    {
      as,
      variant = 'body1',
      weight = 'regular',
      noWrap = false,
      display,
      align,
      color,
      sx,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<TypographyProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={as || 'span'}
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
) as PolymorphicComponentInternal<TypographyProps, 'span'>;

Typography.displayName = 'Typography';

export { Typography };

export type { TypographyProps };
