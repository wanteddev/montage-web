import type { WithInteractionProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

type VariantType = 'normal' | 'light' | 'strong';

export const getWrapperStyle = (
  theme: Theme,
  { disabled, variant, scale }: WithInteractionProps,
) => `
  position: relative;

  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
  }

  ${
    !disabled &&
    `
      &:hover > [wds-component='with-interaction'] {
        ${hoverInteractionStyle(theme, variant)}
      }
      &:focus > [wds-component='with-interaction'] {
        ${focusInteractionStyle(theme, variant)}
      }
      &:focus-visible > [wds-component='with-interaction'] {
        ${focusVisibleInteractionStyle(theme)}
      }
      &:active > [wds-component='with-interaction'] {
        ${activeInteractionStyle(theme, variant)}
      }
      
      ${
        scale &&
        `
        & > [wds-component='with-interaction'] {
          transform: translate(-50%, -50%) scale(0.95);
        }

        &:hover > [wds-component='with-interaction'] {
          transform: translate(-50%, -50%) scale(1);
        }
      `
      }
    `
  }
`;

export const hoverInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return `
        opacity: ${theme.opacity[5]};
      `;
    case 'light':
      return `
        opacity: ${0.0375};
      `;
    case 'strong':
      return `
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
      return `
        opacity: ${theme.opacity[8]};
      `;
    case 'light':
      return `
        opacity: ${0.06};
      `;
    case 'strong':
      return `
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
      return `
        opacity: ${theme.opacity[12]};
      `;
    case 'light':
      return `
        opacity: ${0.09};
      `;
    case 'strong':
      return `
        opacity: ${0.18};
      `;
  }
};

export const focusVisibleInteractionStyle = (theme: Theme) => `
  opacity: ${theme.opacity[0]};
`;
