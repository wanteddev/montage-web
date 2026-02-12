import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const resourceItemStyle = (theme: Theme) => css`
  border-radius: 12px;
  padding: 20px 24px;
  background: transparent;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.solid.neutral};

  [data-role='interaction-arrow'] {
    opacity: 0;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    transform: scale(0);
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;
