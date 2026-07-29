import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { TextAreaProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const textAreaWrapperStyle =
  ({
    disabled,
    invalid,
    width = 'fit-content',
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: TextAreaProps) =>
  (theme: Theme) => css`
    border: none;
    transition: box-shadow ease 0.2s;
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
    border-radius: 12px;
    background-color: ${theme.semantic.effect.transparent.primary};
    backdrop-filter: blur(32px);
    padding: 12px;
    width: ${toCssValue(width)};

    ${textAreaWrapperSizeStyle({ size }, theme)}

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
        `
      : css`
          cursor: text;

          @supports selector(:has(*)) {
            &:where(:has(textarea:focus)) {
              ${
                invalid
                  ? css`
                      box-shadow:
                        inset 0 0 0 1px ${theme.semantic.line.negative.strong},
                        0 0 0 4px ${theme.semantic.line.negative.focus};
                    `
                  : css`
                      box-shadow:
                        inset 0 0 0 1px ${theme.semantic.line.brand.strong},
                        0 0 0 4px ${theme.semantic.line.brand.focus};
                    `
              }
            }
          }

          @supports not selector(:has(*)) {
           &:where(:focus-within) {
              ${
                invalid
                  ? css`
                      box-shadow:
                        inset 0 0 0 1px ${theme.semantic.line.negative.strong},
                        0 0 0 4px ${theme.semantic.line.negative.focus};
                    `
                  : css`
                      box-shadow:
                        inset 0 0 0 1px ${theme.semantic.line.brand.strong},
                        0 0 0 4px ${theme.semantic.line.brand.focus};
                    `
              }
          }
        `}

    button {
      flex-shrink: 0;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    [data-radix-scroll-area-viewport] {
      height: var(--text-area-scroll-height);
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}

        ${textAreaWrapperSizeStyle({ size: params?.size }, theme)}

        ${params?.sx}
      `,
    )}
  `;

export const textAreaWrapperSizeStyle = (
  { size }: TextAreaProps,
  theme: Theme,
) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: ${theme.radius[14]};

        --text-area-content-icon-size: ${theme.dimension[20]};
        --text-area-content-icon-wrapper-width: 22px;
        --text-area-content-icon-wrapper-height: ${theme.dimension[20]};
        --text-area-content-button-gap: ${theme.spacing[8]};

        [data-role='text-area-bottom-area'] {
          gap: ${theme.spacing[8]};
        }

        [data-role='text-area-bottom-area-leading-content'],
        [data-role='text-area-bottom-area-trailing-content'] {
          gap: ${theme.spacing[8]};
        }
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[12]};

        --text-area-content-icon-size: ${theme.dimension[18]};
        --text-area-content-icon-wrapper-width: 22px;
        --text-area-content-icon-wrapper-height: 22px;
        --text-area-content-button-gap: ${theme.spacing[6]};

        [data-role='text-area-bottom-area'] {
          gap: ${theme.spacing[8]};
        }

        [data-role='text-area-bottom-area-leading-content'],
        [data-role='text-area-bottom-area-trailing-content'] {
          gap: ${theme.spacing[6]};
        }
      `;
  }
};

export const textAreaStyle =
  ({ size, xs, sm, md, lg, xl }: TextAreaProps) =>
  (theme: Theme) => css`
    height: var(--text-area-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.spacing[0]} ${theme.spacing[4]};
    flex-shrink: 2;
    background-color: transparent;
    caret-color: ${theme.semantic.foreground.brand.primary};
    outline: none;
    border: none;
    resize: none;
    color: ${theme.semantic.foreground.neutral.primary};

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::placeholder {
      color: ${theme.semantic.foreground.neutral.tertiary};
    }

    &:disabled {
      color: ${theme.semantic.foreground.neutral.primary};
    }

    &:disabled::placeholder {
      color: ${theme.semantic.foreground.disable.primary};
    }

    &:focus {
      outline: none;
    }

    ${textAreaSizeStyle({ size })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
        `}

        ${textAreaSizeStyle({ size: params?.size })}
      `,
    )}
  `;

export const textAreaSizeStyle = ({ size }: TextAreaProps) => {
  switch (size) {
    case 'large':
      return css`
        ${typographyStyle('body2-reading', 'regular')}

        &::placeholder, & ~ textarea {
          ${typographyStyle('body2-reading', 'regular')}
        }
      `;
    case 'medium':
      return css`
        ${typographyStyle('label1-reading', 'regular')}

        &::placeholder, & ~ textarea {
          ${typographyStyle('label1-reading', 'regular')}
        }
      `;
  }
};

export const textAreaBottomAreaStyle = css`
  width: 100%;
`;

export const textAreaContentStyle = css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
`;

export const textAreaCharacterCounterStyle = (theme: Theme) => css`
  padding: ${theme.spacing[0]} ${theme.spacing[4]};
  opacity: ${theme.opacity[74]};

  &[data-is-overflow='true'] {
    [data-role='text-area-content-character-counter-length'] {
      color: ${theme.semantic.foreground.negative.primary};
    }
  }
`;
