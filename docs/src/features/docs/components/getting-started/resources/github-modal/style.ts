import { css, keyframes, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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

export const modalDimmerStyle = css`
  backdrop-filter: blur(8px);
  animation: ${mountKeyframes} 0.3s cubic-bezier(0.2, 0, 0, 1);

  &[data-status='close'] {
    animation: ${unmountKeyframes} 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

export const modalContainerStyle = css`
  --wds-modal-popup-border-radius: 32px;
  min-width: unset;
  animation: ${mountKeyframes} 0.3s cubic-bezier(0.2, 0, 0, 1);

  &[data-status='close'] {
    animation: ${unmountKeyframes} 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

export const contentButtonStyle = (theme: Theme) => css`
  background-color: transparent;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
  color: ${theme.semantic.label.normal};
  ${typographyStyle('body2', 'bold')}
`;
