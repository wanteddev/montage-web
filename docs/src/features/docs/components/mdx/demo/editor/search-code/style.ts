import { addOpacity, css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchPanelStyle = (theme: Theme) => css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  border: 1px solid ${theme.semantic.line.normal.neutral};
  padding: 10px 16px;
  border-radius: 16px;
  backdrop-filter: blur(32px);
`;

export const searchInputStyle = (theme: Theme) => css`
  width: 160px;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
  background-color: ${theme.semantic.background.elevated.normal};
  color: ${theme.semantic.label.normal};
  ${typographyStyle('label1', 'regular')}
  transition: box-shadow ease 0.2s;

  &::placeholder {
    ${typographyStyle('label1', 'regular')}
    color: ${theme.semantic.label.alternative};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow:
      inset 0 0 0 1.5px
        ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
      inset 0 0 0 1.5px ${theme.semantic.background.normal.normal};
  }
`;

export const searchInputToggleStyle = (theme: Theme) => css`
  border-radius: 8px;
  color: ${theme.semantic.label.normal};
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
  transition:
    box-shadow ease 0.2s,
    background-color ease 0.2s,
    color ease 0.2s;
  background-color: transparent;

  &[aria-pressed='true'] {
    color: ${theme.semantic.primary.normal};
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[5],
    )};
    box-shadow:
      inset 0 0 0 1.5px
        ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
      inset 0 0 0 1.5px ${theme.semantic.background.normal.normal};
  }
`;
