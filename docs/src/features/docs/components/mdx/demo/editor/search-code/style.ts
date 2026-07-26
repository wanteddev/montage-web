import { addOpacity, css, typographyStyle } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const searchPanelStyle = (theme: Theme) => css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  background-color: ${addOpacity(
    theme.semantic.background.neutral.primary,
    theme.opacity[88],
  )};
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  border: 1px solid ${theme.semantic.line.neutral.secondary};
  padding: 10px 16px;
  border-radius: 16px;
  backdrop-filter: blur(32px);
`;

export const searchInputStyle = (theme: Theme) => css`
  width: 160px;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
  background-color: ${theme.semantic.surface.elevated.primary};
  color: ${theme.semantic.foreground.neutral.primary};
  ${typographyStyle('label1', 'regular')}
  transition: box-shadow ease 0.2s;

  &::placeholder {
    ${typographyStyle('label1', 'regular')}
    color: ${theme.semantic.foreground.neutral.tertiary};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow:
      inset 0 0 0 1.5px
        ${addOpacity(theme.semantic.surface.brand.primary, theme.opacity[43])},
      inset 0 0 0 1.5px ${theme.semantic.background.neutral.primary};
  }
`;

export const searchInputToggleStyle = (theme: Theme) => css`
  border-radius: 8px;
  color: ${theme.semantic.foreground.neutral.primary};
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
  transition:
    box-shadow ease 0.2s,
    background-color ease 0.2s,
    color ease 0.2s;
  background-color: transparent;

  &[aria-pressed='true'] {
    color: ${theme.semantic.foreground.brand.primary};
    background-color: ${addOpacity(
      theme.semantic.surface.brand.primary,
      theme.opacity[5],
    )};
    box-shadow:
      inset 0 0 0 1.5px
        ${addOpacity(theme.semantic.surface.brand.primary, theme.opacity[43])},
      inset 0 0 0 1.5px ${theme.semantic.background.neutral.primary};
  }
`;
