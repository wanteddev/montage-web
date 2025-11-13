import { css } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { TextAreaProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const textAreaWrapperStyle =
  ({
    disabled,
    invalid,
    width = 'fit-content',
    xs,
    sm,
    md,
    lg,
    xl,
  }: TextAreaProps) =>
  (theme: Theme) => css`
    border: none;
    transition: box-shadow ease 0.2s;
    box-shadow:
      inset 0 0 0 1px ${theme.semantic.line.normal.neutral},
      ${theme.semantic.elevation.shadow.normal.xsmall};
    border-radius: 12px;
    background-color: ${theme.semantic.background.transparent.normal};
    backdrop-filter: blur(32px);
    padding: 12px;

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
        ${theme.semantic.elevation.shadow.normal.xsmall};
    `}

    ${disabled
      ? css`
          background-color: ${theme.semantic.fill.alternative};
          backdrop-filter: none;
          box-shadow:
            inset 0 0 0 1px ${theme.semantic.line.normal.alternative},
            ${theme.semantic.elevation.shadow.normal.xsmall};
          cursor: default;
        `
      : css`
          cursor: text;

          @supports selector(:has(*)) {
            &:where(:has(textarea:focus)) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )},
                      ${theme.semantic.elevation.shadow.normal.xsmall};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )},
                      ${theme.semantic.elevation.shadow.normal.xsmall};
                  `}
            }
          }

          @supports not selector(:has(*)) {
            &:where(:focus-within) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.status.negative,
                          theme.opacity[43],
                        )},
                      ${theme.semantic.elevation.shadow.normal.xsmall};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.semantic.primary.normal,
                          theme.opacity[43],
                        )},
                      ${theme.semantic.elevation.shadow.normal.xsmall};
                  `}
            }
          }
        `}

    width: ${toCssValue(width)};

    button {
      flex-shrink: 0;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    [data-radix-scroll-area-viewport] {
      height: var(--wds-text-area-scroll-height);
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
      `,
    )}
  `;

export const textAreaStyle =
  ({ xs, sm, md, lg, xl }: TextAreaProps) =>
  (theme: Theme) => css`
    height: var(--wds-text-area-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 4px;
    flex-shrink: 2;
    background-color: transparent;
    caret-color: ${theme.semantic.primary.normal};
    outline: none;
    border: none;
    resize: none;
    color: ${theme.semantic.label.normal};
    ${typographyStyle('body1-reading', 'regular')}

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::placeholder {
      ${typographyStyle('body1-reading', 'regular')}
      color: ${theme.semantic.label.assistive};
    }

    &:disabled {
      color: ${theme.semantic.label.alternative};
    }

    &:disabled::placeholder {
      color: ${theme.semantic.label.disable};
    }

    &:focus {
      outline: none;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
        `}

        ${params?.sx}
      `,
    )}
  `;

export const textAreaBottomAreaStyle = css`
  width: 100%;
`;

export const textAreaContentStyle = css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
`;

export const textAreaCharacterCounterStyle = (theme: Theme) => css`
  padding: 0px 4px;
  opacity: ${theme.opacity[74]};

  &[data-is-overflow='true'] {
    [data-role='text-area-content-character-counter-length'] {
      color: ${theme.semantic.status.negative};
    }
  }
`;

export const invalidIconWrapperStyle = (theme: Theme) => css`
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.semantic.static.white};
  }

  svg {
    color: ${theme.semantic.status.negative};
    z-index: 1;
  }
`;
