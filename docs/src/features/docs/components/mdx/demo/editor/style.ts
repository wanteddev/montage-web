import { css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const editorWrapperStyle = css`
  max-height: var(--demo-max-height);
  position: relative;
  font-family: 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace,
    'DejaVu Sans Mono', 'Roboto Mono' !important;
`;

export const toolbarStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.normal.normal};
  border-top-width: 0px;
  padding: 10px 16px;
  background-color: ${theme.semantic.background.normal.normal};
`;

export const focusGuardStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.normal.normal};
  background-color: ${theme.semantic.background.elevated.alternative};
  padding: 4px 8px;
  border-radius: 6px;
  position: absolute;
  transition: all ease 0.2s;
  z-index: 2;
  top: 60px;
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

export const editorStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  border: 1px solid ${theme.semantic.line.normal.normal};
  min-width: 100%;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-width: 0px;
  font-size: 0.9em;

  textarea {
    border-radius: inherit;
  }
`;

export const collapseWrapperStyle =
  (collapsed?: boolean) => (theme: Theme) => css`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 16px;

    ${collapsed &&
    css`
      &::before {
        height: 130px;
        content: '';
        position: absolute;
        bottom: 1px;
        width: calc(100% - 2px);
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        left: 1px;
        pointer-events: none;
        ${gradient(
          theme.semantic.background.normal.alternative,
          'top',
          '100%',
          'mask',
        )}
      }
    `}

    button {
      background-color: ${theme.semantic.background.normal.normal};
    }
  `;
