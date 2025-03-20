import { css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const editorWrapperStyle = css`
  max-height: var(--demo-max-height);
  position: relative;
`;

export const toolbarStyle = (theme: Theme) => css`
  border-bottom: 1px solid ${theme.semantic.line.normal.normal};
  border-top-width: 0px;
  padding: 10px 16px;
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
  min-width: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-width: 0px;
  font-size: 0.9em;
  leading-trim: both;
  text-edge: cap;
  font-family: 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace,
    'DejaVu Sans Mono', 'Roboto Mono' !important;

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
        bottom: 0px;
        width: 100%;
        left: 0px;
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

export const errorStyle = (theme: Theme) => css`
  svg {
    color: ${theme.semantic.status.negative};
  }
`;
