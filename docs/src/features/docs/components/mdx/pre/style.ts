import { css, typographyStyle } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const preWrapperStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.surface.neutral.tertiary};
  box-shadow: inset 0px 0px 0px 1px ${theme.semantic.line.neutral.tertiary};
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;

  [data-radix-scroll-area-content] {
    padding: 20px;
    min-width: initial !important;

    &:hover {
      button {
        opacity: 1;
      }
    }
  }
`;

export const preStyle = css`
  display: block;
  white-space: pre;
  ${typographyStyle('label1', 'regular')}
`;
