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

import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { TypographyProps } from './types';

const Typography = forwardRef(
  <E extends ElementType = 'span'>(
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
    }: PolymorphicProps<TypographyProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    return (
      <Box
        as={(as || 'span') as E}
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
) as PolymorphicComponent<TypographyProps, 'span'>;

Typography.displayName = 'Typography';

export default Typography;
