import { css, keyframes } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

const mountKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const unmountKeyframes = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const tooltipWrapperStyle = css`
  border-radius: 8px;
  backdrop-filter: blur(32px);
  max-width: 280px;

  &[data-status='open'] {
    animation: ${mountKeyframes} 200ms ease-in-out;
  }

  &[data-status='close'] {
    animation: ${unmountKeyframes} 200ms ease-in-out;
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
