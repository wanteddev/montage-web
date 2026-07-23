import { css, respondTo } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const headingStyle = css`
  &&:first-of-type {
    margin-top: 0px;
  }

  &:not(:first-of-type) {
    margin-top: 88px;
  }
`;

export const linkStyle = (theme: Theme) => css`
  padding-block: 16px;
  border-bottom: 1px solid ${theme.semantic.line.neutral.tertiary};

  ${respondTo(theme.breakpoint.sm)} {
    padding-block: 20px;
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const interactionArrowStyle = (theme: Theme) => css`
  color: ${theme.semantic.foreground.neutral.primary};
  font-size: 16px;
  flex-shrink: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: translateX(-10px);
  opacity: 0;
`;
