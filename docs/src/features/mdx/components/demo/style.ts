import { css } from '@emotion/react';
import { gradient } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const demoStyle = (hideCode?: boolean) => (theme: Theme) => css`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 16px;
  border: 1px solid ${theme.palette.line.normal.normal};

  ${hideCode &&
  css`
    border-radius: 8px;
  `}
`;

export const editorWrapperStyle = css`
  max-height: var(--demo-max-height);
  position: relative;

  & > button {
    display: none;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  &:hover {
    & > button {
      display: flex;
    }
  }
`;

export const editorStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.elevated.normal};
  border: 1px solid ${theme.palette.line.normal.normal};
  min-width: 100%;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-width: 0px;
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
        height: 100px;
        content: '';
        position: absolute;
        bottom: 1px;
        width: calc(100% - 2px);
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        left: 1px;
        ${gradient(theme.palette.static.black, 'top')}
      }
    `}

    button {
      background-color: ${theme.palette.background.normal.normal};
    }
  `;
