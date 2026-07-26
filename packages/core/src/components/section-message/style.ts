import { css } from '@montage-ui/engine';

import { addOpacity } from '../../utils';

import type { SectionMessageProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const sectionMessageWrapperStyle = css`
  width: 100%;
  border-radius: 12px;
  padding: 12px;
  backdrop-filter: blur(32px);
  position: relative;

  & > :not([role='presentation']) {
    z-index: 1;
  }
`;

export const firstOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.semantic.background.neutral.primary,
    theme.opacity[88],
  )};
  inset: 0;
  border-radius: inherit;
`;

export const secondOverlayStyle =
  (variant: SectionMessageProps['variant']) => (theme: Theme) => {
    const getBackgroundColor = () => {
      switch (variant) {
        case 'info':
          return theme.semantic.surface.brand.primary;
        case 'positive':
          return theme.semantic.foreground.positive.primary;
        case 'negative':
          return theme.semantic.foreground.negative.primary;
        case 'cautionary':
          return theme.semantic.foreground.cautionary.primary;
        case 'custom':
        default:
          return theme.semantic.foreground.neutral.quaternary;
      }
    };

    return css`
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: inherit;
      background-color: ${addOpacity(getBackgroundColor(), theme.opacity[5])};
      inset: 0;
    `;
  };

export const sectionMessageIconStyle =
  (variant: SectionMessageProps['variant']) => (theme: Theme) => {
    const defaultVariantStyle = css`
      position: relative;
      font-size: 20px;
      padding: 1px 0px;
      height: fit-content;

      &::before {
        inset: 0;
        width: 8px;
        height: 10px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        position: absolute;
        content: '';
        z-index: -1;
        background-color: ${theme.semantic.static.white};
      }
    `;

    switch (variant) {
      case 'info':
        return css`
          color: ${theme.semantic.foreground.brand.primary};
          ${defaultVariantStyle}
        `;
      case 'positive':
        return css`
          color: ${theme.semantic.foreground.positive.primary};
          ${defaultVariantStyle}
        `;
      case 'negative':
        return css`
          color: ${theme.semantic.foreground.negative.primary};
          ${defaultVariantStyle}
        `;
      case 'cautionary':
        return css`
          color: ${theme.semantic.foreground.cautionary.primary};
          ${defaultVariantStyle}
        `;
      case 'custom':
      default:
        return css`
          color: ${theme.semantic.foreground.neutral.tertiary};
          position: relative;
          font-size: 20px;
          padding: 2px 0px;
          height: fit-content;
        `;
    }
  };

export const sectionMessageTrailingButtonStyle = css`
  padding: 0px 8px;
  height: 22px;
  flex-shrink: 0;
`;

export const sectionMessageCloseButtonStyle = css`
  flex-shrink: 0;
  margin: 1px 0px;
  height: fit-content;
`;
