import { addOpacity, css, respondMore } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const layoutStyle = css`
  --playground-toolbar-height: 56px;
  --playground-panels-height: calc(100dvh - var(--playground-toolbar-height));

  width: 100%;
  height: 100dvh;
  overflow: hidden;
`;

export const panelsStyle = (theme: Theme) => css`
  flex: 1 1 auto;
  min-height: 0;

  --playground-panel-height: calc(var(--playground-panels-height) / 2);

  ${respondMore(theme.breakpoint.lg)} {
    flex-direction: row;
    --playground-panel-height: var(--playground-panels-height);
  }
`;

export const editorPanelStyle = (theme: Theme) => css`
  flex: 1 1 50%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  background-color: ${theme.semantic.surface.elevated.primary};
`;

export const editorStyle = css`
  flex: 1 1 auto;
  min-height: 0;
  position: relative;

  [data-radix-scroll-area-viewport] {
    height: var(--playground-panel-height);
  }
`;

export const editorFallbackStyle = (theme: Theme) => css`
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  background-color: ${theme.semantic.surface.elevated.primary};
`;

type PreviewPanelStyleParams = {
  isTransparent: boolean;
};

export const previewPanelStyle =
  ({ isTransparent }: PreviewPanelStyleParams) =>
  (theme: Theme) => css`
    flex: 1 1 50%;
    min-height: 0;
    min-width: 0;
    background-color: ${theme.semantic.background.neutral.primary};
    border-left: 1px solid ${theme.semantic.line.neutral.primary};

    ${isTransparent &&
    css`
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

export const previewViewportStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 40px 16px;
  box-sizing: border-box;

  [data-radix-scroll-area-content] {
    display: flex;
    width: 100%;
  }
`;

export const errorStyle = (theme: Theme) => css`
  flex: 0 0 auto;
  max-height: 30%;
  overflow: auto;
  padding: 12px 16px;
  background-color: ${addOpacity(
    theme.semantic.foreground.negative.primary,
    theme.opacity[8],
  )};
  box-shadow: inset 0 1px 0 0
    ${addOpacity(theme.semantic.foreground.negative.primary, theme.opacity[28])};

  svg {
    flex: 0 0 auto;
    color: ${theme.semantic.foreground.negative.primary};
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
`;
