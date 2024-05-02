import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

type VariantType = 'normal' | 'light' | 'strong';

export const hoverInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return css`
        opacity: ${theme.opacity[5]};
      `;
    case 'light':
      return css`
        opacity: ${0.0375};
      `;
    case 'strong':
      return css`
        opacity: ${0.075};
      `;
  }
};

export const focusInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return css`
        opacity: ${theme.opacity[8]};
      `;
    case 'light':
      return css`
        opacity: ${0.06};
      `;
    case 'strong':
      return css`
        opacity: ${theme.opacity[12]};
      `;
  }
};

export const activeInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return css`
        opacity: ${theme.opacity[12]};
      `;
    case 'light':
      return css`
        opacity: ${0.09};
      `;
    case 'strong':
      return css`
        opacity: ${0.18};
      `;
  }
};

export const focusVisibleInteractionStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[0]};
`;
