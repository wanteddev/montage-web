import { addOpacity, css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchPanelStyle = (theme: Theme) => css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  background-color: ${theme.semantic.background.elevated.alternative};
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  padding: 10px;
  border-radius: 8px;
`;

export const searchInputStyle = (theme: Theme) => css`
  width: 160px;
  padding: 4px 6px;
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
    box-shadow: inset 0 0 0 1.5px
      ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])};
  }
`;

export const searchInputToggleStyle = css`
  border-radius: 6px;

  & > [wds-component='with-interaction'] {
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }

  &[aria-pressed='true'] > [wds-component='with-interaction'] {
    opacity: 0.08;
  }
`;
