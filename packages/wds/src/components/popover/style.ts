import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { PopoverContentProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const popoverStyle =
  (variant: PopoverContentProps['variant']) => (theme: Theme) => css`
    background-color: ${addOpacity(
      theme.semantic.background.elevated.normal,
      theme.opacity[88],
    )};
    border-radius: 16px;
    outline-style: none;
    box-shadow: ${theme.semantic.elevation.shadow.spread.small};
    backdrop-filter: blur(32px);
    min-width: 140px;

    ${popoverVariantStyle(variant)}
  `;

const popoverVariantStyle = (variant: PopoverContentProps['variant']) => {
  switch (variant) {
    case 'custom':
      return css`
        padding: 16px;
      `;
    case 'normal':
    default:
      return css`
        border-radius: 12px;
        padding: 12px 14px;
        max-width: 360px;
        flex-direction: column;
        gap: 0px;
      `;
  }
};
