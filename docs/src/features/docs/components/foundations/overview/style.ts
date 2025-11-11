import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const thumbnailStyle = (theme: Theme) => css`
  margin-top: 40px;
  margin-bottom: 32px;
  aspect-ratio: 95 / 29;

  &::before {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: inherit;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[52]};
  }
`;

export const linkStyle = (theme: Theme) => css`
  padding-block: 24px;
  border-bottom: 1px solid ${theme.semantic.line.normal.alternative};

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
  color: ${theme.semantic.label.normal};
  font-size: 16px;
  flex-shrink: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: translateX(-10px);
  opacity: 0;
`;
