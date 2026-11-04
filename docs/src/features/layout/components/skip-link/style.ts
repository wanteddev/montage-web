import { css, respondMore } from '@montage-ui/core';

import { SKIP_TARGET_ID } from '../../constants';

import type { SKIP_LINKS } from './constants';
import type { Theme } from '@montage-ui/core';

export const skipLinkWrapperStyle = (theme: Theme) => css`
  position: fixed;
  top: 16px;
  left: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${theme.semantic.surface.neutral.primary};
  border: 1px solid ${theme.semantic.line.neutral.primary};
  z-index: -1;
  opacity: 0;
  pointer-events: none;

  &:focus-within {
    z-index: calc(${theme.zIndex.modal} + 1);
    opacity: 1;
    pointer-events: auto;
  }
`;

export const skipLinkStyle =
  (targetId: (typeof SKIP_LINKS)[number]['targetId']) => (theme: Theme) => {
    switch (targetId) {
      case SKIP_TARGET_ID.leftNavigation:
        return css`
          display: none;

          ${respondMore(theme.breakpoint.lg)} {
            body:has(#${SKIP_TARGET_ID.leftNavigation} a) & {
              display: block;
            }
          }
        `;
      case SKIP_TARGET_ID.onThisPage:
        return css`
          display: none;

          ${respondMore(theme.breakpoint.xl)} {
            body:has(#${SKIP_TARGET_ID.onThisPage} li a) & {
              display: block;
            }
          }
        `;
    }
  };
