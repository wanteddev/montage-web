import { addOpacity, css, gradient } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const demoWrapperStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.neutral.primary};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
`;

type DemoStyleParams = {
  hideCode?: boolean;
  isTransparent: boolean;
};

export const demoStyle =
  ({ hideCode, isTransparent }: DemoStyleParams) =>
  (theme: Theme) => css`
    padding: 40px 16px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.primary};
    background-color: ${theme.semantic.background.neutral.primary};
    position: relative;
    display: flex;
    flex-direction: column;

    ${hideCode &&
    css`
      border-radius: inherit;
    `}

    ${isTransparent &&
    css`
      background-color: ${theme.semantic.background.neutral.primary};
      background-image:
        linear-gradient(
          45deg,
          ${theme.semantic.background.neutral.secondary} 25%,
          transparent 25%
        ),
        linear-gradient(
          135deg,
          ${theme.semantic.background.neutral.secondary} 25%,
          transparent 25%
        ),
        linear-gradient(
          45deg,
          transparent 75%,
          ${theme.semantic.background.neutral.secondary} 75%
        ),
        linear-gradient(
          135deg,
          transparent 75%,
          ${theme.semantic.background.neutral.secondary} 75%
        );
      background-position:
        0px 0px,
        10px 0px,
        10px -10px,
        0px 10px;
      background-size: 20px 20px;
    `}
  `;

type EditorWrapperStyleParams = {
  hasError: boolean;
};

export const editorWrapperStyle =
  ({ hasError }: EditorWrapperStyleParams) =>
  (theme: Theme) => css`
    max-height: var(--demo-editor-height);
    position: relative;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;

    &::before {
      z-index: 1;
      border-radius: inherit;
      content: '';
      inset: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition: box-shadow ease 0.2s;
      box-shadow:
        inset 0 0 0 1px ${theme.semantic.line.neutral.primary},
        inset 0 0 0 1px ${theme.semantic.surface.elevated.primary};
    }

    ${hasError
      ? css`
          &::before {
            box-shadow:
              inset 0 0 0 1px
                ${addOpacity(
                  theme.semantic.foreground.negative.primary,
                  theme.opacity[28],
                )},
              inset 0 0 0 1px ${theme.semantic.surface.elevated.primary};
          }

          &:has(.cm-focused) {
            &::before {
              box-shadow:
                inset 0 0 0 2px
                  ${addOpacity(
                    theme.semantic.foreground.negative.primary,
                    theme.opacity[43],
                  )},
                inset 0 0 0 2px ${theme.semantic.surface.elevated.primary};
            }
          }
        `
      : css`
          &:has(.cm-focused) {
            &::before {
              box-shadow:
                inset 0 0 0 2px
                  ${addOpacity(
                    theme.semantic.surface.brand.primary,
                    theme.opacity[43],
                  )},
                inset 0 0 0 2px ${theme.semantic.surface.elevated.primary};
            }
          }
        `}
  `;

export const editorFallbackStyle = (theme: Theme) => css`
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.primary};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  height: var(--demo-editor-height);
  background-color: ${theme.semantic.surface.elevated.primary};
  svg {
    z-index: 1;
  }

  &::before {
    height: 130px;
    position: absolute;
    content: '';
    z-index: 0;
    bottom: 1px;
    left: 1px;
    width: calc(100% - 2px);
    border-radius: inherit;
    ${gradient(
      theme.semantic.background.neutral.secondary,
      'top',
      '100%',
      'mask',
    )}
  }
`;
