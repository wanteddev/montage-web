import { addOpacity, css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

type DemoWrapperStyleParams = {
  embedded?: boolean;
};

export const demoWrapperStyle =
  ({ embedded }: DemoWrapperStyleParams = {}) =>
  (theme: Theme) => css`
    ${embedded
      ? css`
          background-color: transparent;
          border-radius: 0;
          margin-bottom: 0;
        `
      : css`
          background-color: ${theme.semantic.background.normal.normal};
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
        `}
  `;

type DemoStyleParams = {
  hideCode?: boolean;
  isTransparent: boolean;
  previewBackground?: 'normal' | 'alternative';
  embedded?: boolean;
};

export const demoStyle =
  ({
    hideCode,
    isTransparent,
    previewBackground = 'normal',
    embedded,
  }: DemoStyleParams) =>
  (theme: Theme) => css`
    padding: 40px 16px;
    ${embedded
      ? css`
          border-radius: 0;
        `
      : css`
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
        `}
    background-color: ${previewBackground === 'alternative'
      ? theme.semantic.background.normal.alternative
      : theme.semantic.background.normal.normal};
    position: relative;
    display: flex;
    flex-direction: column;

    ${hideCode &&
    !embedded &&
    css`
      border-radius: inherit;
    `}

    ${isTransparent &&
    css`
      background-color: ${theme.semantic.background.normal.normal};
      background-image: linear-gradient(
          45deg,
          ${theme.semantic.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          135deg,
          ${theme.semantic.background.normal.alternative} 25%,
          transparent 25%
        ),
        linear-gradient(
          45deg,
          transparent 75%,
          ${theme.semantic.background.normal.alternative} 75%
        ),
        linear-gradient(
          135deg,
          transparent 75%,
          ${theme.semantic.background.normal.alternative} 75%
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
  embedded?: boolean;
};

export const editorWrapperStyle =
  ({ hasError, embedded }: EditorWrapperStyleParams) =>
  (theme: Theme) => css`
    max-height: var(--demo-editor-height);
    position: relative;
    ${embedded
      ? css`
          border-radius: 0;
        `
      : css`
          border-bottom-right-radius: 16px;
          border-bottom-left-radius: 16px;
        `}

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
      ${embedded
        ? css`
            box-shadow: none;
          `
        : css`
            box-shadow:
              inset 0 0 0 1px ${theme.semantic.line.normal.normal},
              inset 0 0 0 1px ${theme.semantic.background.elevated.normal};
          `}
    }

    ${hasError
      ? css`
          &::before {
            box-shadow:
              inset 0 0 0 1px
                ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
              inset 0 0 0 1px ${theme.semantic.background.elevated.normal};
          }

          &:has(.cm-focused) {
            &::before {
              box-shadow:
                inset 0 0 0 2px
                  ${addOpacity(
                    theme.semantic.status.negative,
                    theme.opacity[43],
                  )},
                inset 0 0 0 2px ${theme.semantic.background.elevated.normal};
            }
          }
        `
      : css`
          &:has(.cm-focused) {
            &::before {
              box-shadow:
                inset 0 0 0 2px
                  ${addOpacity(
                    theme.semantic.primary.normal,
                    theme.opacity[43],
                  )},
                inset 0 0 0 2px ${theme.semantic.background.elevated.normal};
            }
          }
        `}
  `;

type EditorFallbackStyleParams = {
  embedded?: boolean;
};

export const editorFallbackStyle =
  ({ embedded }: EditorFallbackStyleParams = {}) =>
  (theme: Theme) => css`
    ${embedded
      ? css`
          box-shadow: none;
          border-radius: 0;
        `
      : css`
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
          border-bottom-right-radius: 16px;
          border-bottom-left-radius: 16px;
        `}
    height: var(--demo-editor-height);
    background-color: ${theme.semantic.background.elevated.normal};
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
        theme.semantic.background.normal.alternative,
        'top',
        '100%',
        'mask',
      )}
    }
  `;
