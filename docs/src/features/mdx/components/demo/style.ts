import { css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const demoStyle = (hideCode?: boolean) => (theme: Theme) => css`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 16px;
  border: 1px solid ${theme.palette.line.normal.normal};
  background-color: ${theme.palette.background.normal.normal};
  position: relative;

  ${hideCode &&
  css`
    border-radius: 8px;
  `}
`;

export const errorStyle = (theme: Theme) => css`
  background-color: ${theme.palette.status.negative};
  color: ${theme.palette.static.white};
  padding: 2px 6px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
  border-radius: 4px;
`;

export const editorWrapperStyle = css`
  max-height: var(--demo-max-height);
  position: relative;

  & > button {
    opacity: 0;
    transition: opacity ease 0.12s;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  &:hover {
    & > button {
      opacity: 1;
    }
  }
`;

export const toolbarStyle = (theme: Theme) => css`
  border: 1px solid ${theme.palette.line.normal.normal};
  border-top-width: 0px;
  padding: 10px 16px;
  background-color: ${theme.palette.background.normal.normal};
`;

export const editorStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.elevated.normal};
  border: 1px solid ${theme.palette.line.normal.normal};
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
        ${gradient(theme.palette.background.normal.alternative, 'top')}
      }
    `}

    button {
      background-color: ${theme.palette.background.normal.normal};
    }
  `;
