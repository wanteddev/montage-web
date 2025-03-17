import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const tooltipWrapperStyle = css`
  border-radius: 8px;
  backdrop-filter: blur(32px);
  min-width: 64px;
  max-width: 280px;
  transition-property: opacity;
  transition-duration: var(--wds-tooltip-transition-duration, 250ms);

  &[data-status='open'] {
    opacity: 1;
  }

  &[data-status='initial'],
  &[data-status='unmounted'],
  &[data-status='close'] {
    opacity: 0;
  }
`;

export const tooltipContentStyle = (theme: Theme) => css`
  padding: 10px;
  border-radius: inherit;
  background-color: ${addOpacity(
    theme.semantic.inverse.background,
    theme.opacity[88],
  )};
  color: ${theme.semantic.inverse.label};
  position: relative;

  &::before {
    border-radius: inherit;
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[5],
    )};
    content: '';
    inset: 0;
    position: absolute;
  }

  button {
    color: ${addOpacity(
      theme.semantic.inverse.label,
      theme.opacity[61],
    )} !important;
  }

  [wds-component='with-interaction'] {
    background: ${theme.semantic.inverse.label};
  }

  & [wds-component='popper-arrow'] {
    color: ${addOpacity(theme.semantic.inverse.background, theme.opacity[88])};
  }
`;
