import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { SectionMessageProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const sectionMessageWrapperStyle = css`
  width: 100%;
  border-radius: 12px;
  padding: 16px;
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
    theme.palette.background.normal.normal,
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
          return theme.palette.primary.normal;
        case 'positive':
          return theme.palette.status.positive;
        case 'negative':
          return theme.palette.status.negative;
        case 'cautionary':
          return theme.palette.status.cautionary;
        case 'custom':
        default:
          return theme.palette.label.assistive;
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
      padding: 2px 0px;
      height: fit-content;

      &::before {
        inset: 0;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        content: '';
        z-index: -1;
        background-color: ${theme.palette.static.white};
      }
    `;

    switch (variant) {
      case 'info':
        return css`
          color: ${theme.palette.primary.normal};
          ${defaultVariantStyle}
        `;
      case 'positive':
        return css`
          color: ${theme.palette.status.positive};
          ${defaultVariantStyle}
        `;
      case 'negative':
        return css`
          color: ${theme.palette.status.negative};
          ${defaultVariantStyle}
        `;
      case 'cautionary':
        return css`
          color: ${theme.palette.status.cautionary};
          ${defaultVariantStyle}
        `;
      case 'custom':
      default:
        return css`
          color: ${theme.palette.label.alternative};
          position: relative;
          font-size: 20px;
          padding: 2px 0px;
          height: fit-content;
        `;
    }
  };

export const sectionMessageTrailingContentStyle = css`
  padding: 0px 8px;
  height: 24px;
  flex-shrink: 0;
`;

export const sectionMessageCloseIconStyle = css`
  flex-shrink: 0;
  padding: 2px 0px;
  height: fit-content;
`;
