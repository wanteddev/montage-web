import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  typographyStyle,
} from '../../utils';

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
      inset 0 0 0 1px ${theme.palette.line.normal.neutral},
      0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
    border-radius: 12px;
    background-color: transparent;
    padding: 12px;

    ${invalid &&
    css`
      box-shadow:
        inset 0 0 0 1px
          ${addOpacity(theme.palette.status.negative, theme.opacity[28])},
        0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
    `}

    ${disabled
      ? css`
          background-color: ${theme.palette.interaction.disable};
          box-shadow:
            inset 0 0 0 1px ${theme.palette.line.normal.alternative},
            0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
          cursor: default;
        `
      : css`
          @supports selector(:has(*)) {
            &:where(:has(textarea:focus)) {
              ${invalid
                ? css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.palette.status.negative,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.palette.static.black, 0.03)};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.palette.primary.normal,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.palette.static.black, 0.03)};
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
                          theme.palette.status.negative,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.palette.static.black, 0.03)};
                  `
                : css`
                    box-shadow:
                      inset 0 0 0 2px
                        ${addOpacity(
                          theme.palette.primary.normal,
                          theme.opacity[43],
                        )},
                      0px 1px 2px 0px
                        ${addOpacity(theme.palette.static.black, 0.03)};
                  `}
            }
          }
        `}

    width: ${width};

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
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
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
    outline: none;
    border: none;
    resize: none;
    color: ${theme.palette.label.normal};
    ${typographyStyle('body1_reading', 'regular')}

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::placeholder {
      ${typographyStyle('body1_reading', 'regular')}
      color: ${theme.palette.label.assistive};
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

export const textAreaContentStyle = (theme: Theme) => css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;

  & > svg {
    color: ${theme.palette.label.assistive};
  }

  [wds-component='icon-button'][data-variant='normal'] {
    color: ${theme.palette.label.assistive};
  }
`;

export const invalidIconWrapperStyle = (theme: Theme) => css`
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    background-color: ${theme.palette.static.white};
  }

  svg {
    color: ${theme.palette.status.negative};
    z-index: 1;
  }
`;
