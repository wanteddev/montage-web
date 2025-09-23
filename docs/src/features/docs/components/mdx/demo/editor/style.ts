import { addOpacity, css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const focusGuardStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.normal.normal};
  background-color: ${theme.semantic.background.elevated.alternative};
  padding: 4px 8px;
  border-radius: 6px;
  position: absolute;
  transition: all ease 0.2s;
  z-index: 2;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  outline-offset: 4px;

  kbd {
    background-color: ${theme.semantic.fill.strong};
    padding: 2px 4px;
    border-radius: 4px;
  }

  &&:not(:focus-visible) {
    top: 45px;
    opacity: 0;
    pointer-events: none;
  }
`;

type EditorStyleParams = {
  collapsed: boolean;
  hasError: boolean;
};

export const editorStyle =
  ({ collapsed, hasError }: EditorStyleParams) =>
  (theme: Theme) => css`
    ${collapsed &&
    css`
      [data-radix-scroll-area-viewport] {
        overflow: hidden !important;
      }
    `}

    background-color: ${theme.semantic.background.elevated.normal};
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    position: relative;

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
        inset 0 0 0 1px ${theme.semantic.line.normal.normal},
        inset 0 0 0 1px ${theme.semantic.background.elevated.normal};
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

export const collapsedStyle = (theme: Theme) => css`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;

  &::before {
    height: 130px;
    position: absolute;
    content: '';
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
