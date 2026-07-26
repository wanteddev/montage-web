import { css } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const progressIndicatorStyle = (theme: Theme) => css`
  width: 100%;
  height: 2px;
  background-color: ${theme.semantic.surface.neutral.secondary};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: var(--progress-indicator-transform);
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${theme.semantic.surface.brand.primary};
  }
`;
