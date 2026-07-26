import { css } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const autocompleteListStyle = (theme: Theme) => css`
  padding: 0px;
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  border-radius: 16px;
  background-color: ${theme.semantic.surface.elevated.primary};
`;

export const autocompleteScrollAreaStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.neutral.secondaryOpaque};
  border-radius: 16px;
  min-width: 140px;
  height: auto;
  max-height: 400px;
  border-radius: inherit;
`;

export const autocompleteListContentStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 0px;
`;

export const autocompleteGroupTitleStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 4px 20px;
  z-index: 10;
  margin: auto auto auto 0;
  background-color: ${theme.semantic.surface.elevated.primary};
`;

export const autocompleteOptionStyle = (theme: Theme) => css`
  width: calc(100% - 40px);
  cursor: pointer;

  &[aria-disabled='true'] {
    cursor: initial;
  }

  [data-role='autocomplete-option-active-icon-check'] {
    color: ${theme.semantic.foreground.brand.primary};
  }

  &[data-focus='true'] > [data-component='with-interaction'] {
    opacity: ${theme.opacity[0]};
  }

  &[data-focus-visible='true'] > [data-component='with-interaction'] {
    opacity: 0.06;
  }
`;
