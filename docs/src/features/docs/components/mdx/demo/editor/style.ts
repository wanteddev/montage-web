import { css, gradient } from '@wanteddev/wds';

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

export const editorStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  position: relative;
  max-height: inherit;

  .cm-editor {
    height: 100%;
    display: inline-block !important;
  }

  .cm-scroller {
    overflow: auto;
  }

  .cm-scroller {
    width: 100%;
  }
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
