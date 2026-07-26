import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const tokenThumbnailStyle = (theme: Theme) => css`
  && {
    border-radius: 32px;

    &::after {
      border: 1px solid ${theme.semantic.line.neutral.secondaryOpaque};
    }
  }
`;

export const triggerStyle = (theme: Theme) => css`
  background-color: transparent;
  border: none;
  border-radius: 32px;
  transition: box-shadow 0.3s ease;

  &:not(:disabled) {
    @media (pointer: fine) {
      &:hover {
        box-shadow: ${theme.semantic.elevation.shadow.normal.small};
      }
    }
  }

  &[aria-expanded='true'] {
    box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  }

  &:disabled {
    cursor: initial;
  }
`;

export const carouselWrapperStyle = css`
  --carousel-item-gap: 20px;
  --carousel-item-width: 110px;
`;
