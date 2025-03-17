import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const progressIndicatorStyle = (theme: Theme) => css`
  width: 100%;
  height: 2px;
  background-color: ${theme.semantic.fill.normal};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: var(--wds-progress-indicator-transform);
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${theme.semantic.primary.normal};
  }
`;
