import { css, gradient } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const demoWrapperStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.normal.normal};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 40px;
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
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
    background-color: ${theme.semantic.background.normal.normal};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${hideCode &&
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

export const editorWrapperStyle = css`
  max-height: var(--demo-editor-height);
  position: relative;
`;

export const editorFallbackStyle = (theme: Theme) => css`
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
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
