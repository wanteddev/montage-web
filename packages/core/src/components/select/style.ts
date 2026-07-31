import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { SelectRenderChipProps } from './types';
import type { Theme } from '@montage-ui/engine';
import type { SelectMultipleProps } from '../select-multiple/types';

export const selectStyle =
  ({
    invalid,
    width = 'initial',
    height = 'fit-content',
    size,
    disabled,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SelectMultipleProps) =>
  (theme: Theme) => css`
    display: flex;
    border: none;
    background-color: ${theme.semantic.effect.transparent.primary};
    backdrop-filter: blur(32px);
    width: ${toCssValue(width)};
    height: ${toCssValue(height)};
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
    transition: box-shadow ease 0.2s;
    align-items: center;
    cursor: pointer;

    ${selectSizeStyle({ size }, theme)}

    [data-role='select-wrapper'], [data-role='select-multiple-wrapper'] {
      padding: ${theme.spacing[0]} ${theme.spacing[4]};
      width: 100%;
      height: 100%;

      &:has([data-component='chip']) {
        [data-component='select-content'][data-variant='icon'],
        [data-component='select-content'][data-variant='icon-button'] {
          margin-right: ${theme.spacing[4]};
        }
      }
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }

    [data-role='select-placeholder'],
    [data-role='select-multiple-placeholder'] {
      color: ${theme.semantic.foreground.neutral.tertiary};
    }

    [data-role='select-values'],
    [data-role='select-multiple-values'] {
      color: ${theme.semantic.foreground.neutral.primary};
    }

    ${invalid &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.negative.primary};
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.surface.neutral.tertiary};
          backdrop-filter: none;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.tertiary};
          cursor: default;

          [data-role='select-placeholder'],
          [data-role='select-multiple-placeholder'] {
            color: ${theme.semantic.foreground.disable.primary};
          }

          [data-role='select-values'],
          [data-role='select-multiple-values'] {
            color: ${theme.semantic.foreground.neutral.primary};
          }
        `
      : css`
          &:focus,
          &[aria-expanded='true'] {
            ${invalid
              ? css`
                  box-shadow:
                    inset 0 0 0 1px ${theme.semantic.line.negative.strong},
                    0 0 0 4px ${theme.semantic.line.negative.focus};
                `
              : css`
                  box-shadow:
                    inset 0 0 0 1px ${theme.semantic.line.brand.strong},
                    0 0 0 4px ${theme.semantic.line.brand.focus};
                `}
          }
        `}


    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}

        ${params?.height !== undefined &&
        css`
          height: ${toCssValue(params.height)};
        `}

        ${selectSizeStyle({ size: params?.size }, theme)}
        ${params?.sx}
      `,
    )}
  `;

const selectSizeStyle = ({ size }: SelectMultipleProps, theme: Theme) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: ${theme.radius[14]};
        padding: ${theme.spacing[12]} ${theme.spacing[8]};

        [data-role='select-placeholder'],
        [data-role='select-values'],
        [data-role='select-multiple-placeholder'],
        [data-role='select-multiple-values'],
        [data-role='select-chip-wrapper'],
        [data-role='select-multiple-chip-render-wrapper'] {
          padding: 1px ${theme.spacing[4]};
          ${typographyStyle('body2', 'regular')}
        }

        [data-role='select-chip-wrapper'],
        [data-role='select-multiple-chip-render-wrapper'] {
          gap: ${theme.spacing[8]};

          &:has([data-component='chip']) {
            padding: ${theme.spacing[0]};
          }
        }

        [data-variant='select-chevron'],
        [data-variant='select-multiple-chevron'] {
          font-size: ${theme.dimension[16]};
        }

        --select-content-icon-wrapper-size: ${theme.dimension[24]};
        --select-content-icon-size: ${theme.dimension[20]};
        --select-content-max-height: ${theme.dimension[24]};
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[12]};
        padding: ${theme.spacing[8]} ${theme.spacing[6]};

        [data-role='select-placeholder'],
        [data-role='select-values'],
        [data-role='select-multiple-placeholder'],
        [data-role='select-multiple-values'],
        [data-role='select-chip-wrapper'],
        [data-role='select-multiple-chip-render-wrapper'] {
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          ${typographyStyle('label1', 'regular')}
        }

        [data-role='select-chip-wrapper'],
        [data-role='select-multiple-chip-render-wrapper'] {
          gap: ${theme.spacing[6]};

          &:has([data-component='chip']) {
            padding: ${theme.spacing[0]};
          }
        }

        [data-variant='select-chevron'],
        [data-variant='select-multiple-chevron'] {
          font-size: ${theme.dimension[16]};
        }

        --select-content-icon-wrapper-size: ${theme.dimension[20]};
        --select-content-icon-size: ${theme.dimension[18]};
        --select-content-max-height: ${theme.dimension[24]};
      `;
  }
};

export const selectContentStyle = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  max-height: var(--select-content-max-height);
`;

export const selectIconStyle =
  ({ disabled }: SelectMultipleProps) =>
  (theme: Theme) => css`
    ${disabled
      ? css`
          color: ${theme.semantic.foreground.disable.primary};
        `
      : css`
          color: ${theme.semantic.foreground.neutral.tertiary};
        `}
  `;

export const selectTextStyle = css`
  user-select: none;
  flex: 1;
`;

export const selectRenderChipStyle =
  ({ status }: SelectRenderChipProps) =>
  (theme: Theme) => css`
    ${status === 'negative' &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.negative.primary};
      color: ${theme.semantic.foreground.negative.primary};

      svg {
        color: ${theme.semantic.foreground.negative.primary};
      }

      & > [data-component='with-interaction'] {
        background-color: ${theme.semantic.foreground.negative.primary};
      }
    `}

    &:disabled,
    &[aria-disabled='true'] {
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
      color: ${theme.semantic.foreground.neutral.primary};

      svg {
        color: ${theme.semantic.foreground.disable.primary};
      }
    }
  `;
