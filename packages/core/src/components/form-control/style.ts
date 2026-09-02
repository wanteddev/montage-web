import { css } from '@montage-ui/engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import { ellipsisTypographyStyle, typographyStyle } from '../../utils';
import { toCssValue } from '../../utils/internal/css';

import type {
  FormControlGroupProps,
  FormControlLabelProps,
  FormControlProps,
} from './types';
import type { FormControlLayoutContextType } from './contexts';
import type { Theme } from '@montage-ui/engine';

export const formControlGroupStyle =
  ({
    labelWidth,
    gap,
    rowGap,
    columnGap,
    xs,
    sm,
    md,
    lg,
    xl,
  }: FormControlGroupProps) =>
  (theme: Theme) => css`
    gap: ${gap === undefined ? theme.spacing[16] : toCssValue(gap)};

    ${rowGap !== undefined &&
    css`
      row-gap: ${toCssValue(rowGap)};
    `}
    ${columnGap !== undefined &&
    css`
      column-gap: ${toCssValue(columnGap)};
    `}
    ${labelWidth !== undefined &&
    css`
      --form-control-leading-label-width: ${labelWidth};
    `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.gap !== undefined &&
        css`
          gap: ${toCssValue(params.gap)};
        `};
        ${params?.rowGap !== undefined &&
        css`
          row-gap: ${toCssValue(params.rowGap)};
        `}
        ${params?.columnGap !== undefined &&
        css`
          column-gap: ${toCssValue(params.columnGap)};
        `}
        ${params?.labelWidth !== undefined &&
        css`
          --form-control-leading-label-width: ${params.labelWidth};
        `}

        ${params?.sx}
      `,
    )}
  `;

export const formControlStyle =
  ({
    size,
    gap,
    rowGap,
    columnGap,
    labelPlacement,
    xs,
    sm,
    md,
    lg,
    xl,
  }: FormControlProps) =>
  (theme: Theme) => css`
    ${formControlLayoutStyle({ labelPlacement, gap, rowGap, columnGap }, theme)}

    ${formControlSizeStyle({ size }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${formControlSizeStyle({ size: params?.size }, theme)}

        ${formControlLayoutStyle(
          {
            labelPlacement: getPreviousValue(
              { xs, sm, md, lg, xl },
              'labelPlacement',
              params?.labelPlacement ?? labelPlacement,
              breakpoint!,
            ),
            gap: getPreviousValue(
              { xs, sm, md, lg, xl },
              'gap',
              params?.gap ?? gap,
              breakpoint!,
            ),
            rowGap: getPreviousValue(
              { xs, sm, md, lg, xl },
              'rowGap',
              params?.rowGap ?? rowGap,
              breakpoint!,
            ),
            columnGap: getPreviousValue(
              { xs, sm, md, lg, xl },
              'columnGap',
              params?.columnGap ?? columnGap,
              breakpoint!,
            ),
          },
          theme,
        )}

        ${params?.sx}
      `,
    )}
  `;

const formControlSizeStyle = (
  { size }: Pick<FormControlProps, 'size'>,
  theme: Theme,
) => {
  switch (size) {
    case 'medium':
      return css`
        --form-control-leading-label-max-height: ${theme.dimension[40]};
      `;
    case 'large':
      return css`
        --form-control-leading-label-max-height: ${theme.dimension[48]};
      `;
  }
};

const formControlLayoutStyle = (
  {
    labelPlacement,
    gap,
    rowGap,
    columnGap,
  }: Pick<FormControlProps, 'labelPlacement' | 'gap' | 'rowGap' | 'columnGap'>,
  theme: Theme,
) => {
  switch (labelPlacement) {
    case 'top':
      return css`
        display: flex;
        grid-template-columns: initial;
        gap: ${gap === undefined ? theme.spacing[8] : toCssValue(gap)};

        ${rowGap !== undefined &&
        css`
          row-gap: ${toCssValue(rowGap)};
        `}
        ${columnGap !== undefined &&
        css`
          column-gap: ${toCssValue(columnGap)};
        `}

        & > [data-component='form-control-label'] {
          display: inline-block;
          max-height: initial;
        }
      `;
    case 'leading':
      return css`
        display: grid;
        grid-template-columns:
          var(--form-control-leading-label-width, minmax(10px, auto))
          1fr;
        gap: ${gap === undefined
          ? `${theme.spacing[8]} ${theme.spacing[16]}`
          : toCssValue(gap)};

        ${rowGap !== undefined &&
        css`
          row-gap: ${toCssValue(rowGap)};
        `}
        ${columnGap !== undefined &&
        css`
          column-gap: ${toCssValue(columnGap)};
        `}

        & > [data-component='form-control-message'],
        & > [data-component='form-control-negative-message'],
        & > [data-component='form-control-positive-message'],
        & > [data-component='text-field'],
        & > [data-role='form-control-slot'] {
          grid-column: 2;
        }

        & > [data-component='form-control-label'] {
          padding: ${theme.spacing[0]};
          display: flex;
          align-items: center;
          max-height: var(--form-control-leading-label-max-height);
        }
      `;
  }
};

export const formLabelStyle =
  ({
    variant,
    weight,
    xs,
    sm,
    md,
    lg,
    xl,
    size,
    responsive,
  }: FormControlLabelProps &
    Pick<FormControlLayoutContextType, 'responsive' | 'size'>) =>
  (theme: Theme) => css`
    padding: ${theme.spacing[0]} ${theme.spacing[2]};
    ${formLabelSizeStyle({ size, variant, weight })}

    [data-role='label-content'] {
      display: inline-flex;
      max-width: 100%;
      min-width: 0;

      [data-role='label-content-text'] {
        ${ellipsisTypographyStyle(1)}
        word-break: keep-all;
        overflow-wrap: anywhere;
      }

      [data-role='label-required-mark'] {
        flex-shrink: 0;
      }
    }

    ${createResponsiveStyle(
      {
        xs: { ...xs, ...responsive?.xs },
        sm: { ...sm, ...responsive?.sm },
        md: { ...md, ...responsive?.md },
        lg: { ...lg, ...responsive?.lg },
        xl: { ...xl, ...responsive?.xl },
      },
      theme,
    )(
      (params, breakpoint) => css`
        ${formLabelSizeStyle({
          size: getPreviousValue(
            responsive ?? {},
            'size',
            params.size ?? size,
            breakpoint!,
          ),
          variant: getPreviousValue(
            { xs, sm, md, lg, xl },
            'variant',
            params.variant,
            breakpoint!,
          ),
          weight: getPreviousValue(
            { xs, sm, md, lg, xl },
            'weight',
            params.weight,
            breakpoint!,
          ),
        })}

        ${Boolean(params.align) &&
        css`
          text-align: ${params.align};
        `}

        ${params.sx}
      `,
    )}
  `;

const formLabelSizeStyle = ({
  size,
  variant,
  weight,
}: Pick<FormControlLayoutContextType, 'size'> &
  Pick<FormControlLabelProps, 'variant' | 'weight'>) => {
  switch (size) {
    case 'large':
      return css`
        ${typographyStyle(variant ?? 'label1', weight ?? 'bold')}
      `;
    case 'medium':
      return css`
        ${typographyStyle(variant ?? 'label2', weight ?? 'bold')}
      `;
  }
};

export const formMessageStyle = (theme: Theme) => css`
  padding: ${theme.spacing[0]} ${theme.spacing[2]};
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[8]};
  justify-content: space-between;

  [data-role='form-control-positive-message-content'],
  [data-role='form-control-negative-message-content'],
  [data-role='form-control-message-content'] {
    flex: 1;
    min-width: 0px;
    display: flex;
    width: min-content;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
`;

export const formCharacterCounterStyle = (theme: Theme) => css`
  flex-shrink: 0;
  white-space: nowrap;
  text-align: right;

  &[data-is-overflow='true'] {
    [data-role='form-control-character-counter-length'] {
      color: ${theme.semantic.foreground.negative.primary};
    }
  }
`;
