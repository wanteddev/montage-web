import { addOpacity, css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const iconGridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 12px;

  ${respondTo(theme.breakpoint.sm)} {
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  }
`;

export const iconItemStyle = (theme: Theme) => css`
  padding: 20px;
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 1/1;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  transition: box-shadow 0.15s ease;
  color: ${theme.semantic.label.normal};

  &[aria-expanded='true'] {
    box-shadow: inset 0 0 0 1px
      ${addOpacity(theme.semantic.primary.normal, theme.opacity[16])};

    & > [wds-component='with-interaction'] {
      background-color: ${theme.semantic.primary.normal};
      opacity: 0.06;
    }
  }

  ${respondTo(theme.breakpoint.sm)} {
    padding: 16px;
  }
`;

export const iconDetailWrapperStyle = (theme: Theme) => css`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 24px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
`;

export const iconPopoverWrapperStyle = css`
  min-width: unset !important;
  max-width: 100%;
  width: 380px;
  padding-inline: var(--layout-padding-inline);

  ${respondTo('500px')} {
    width: 100%;
  }
`;
