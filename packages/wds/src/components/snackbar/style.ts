import { css, keyframes } from '@wanteddev/wds-engine';

import {
  addOpacity,
  respondMore,
  respondTo,
  typographyStyle,
} from '../../utils';

import type { SnackbarProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const mountKeyframes = keyframes`
  from {
    opacity: 0;
    height: 0;
    margin-top: 0;
  }
  to {
    opacity: 1;
    height: var(--wds-snackbar-animation-height);
    margin-top: var(--wds-snackbar-animation-margin-top);
  }
`;

const unmountKeyframes = keyframes`
  from {
    opacity: 1;
    height: var(--wds-snackbar-animation-height);
    margin-top: var(--wds-snackbar-animation-margin-top);
  }
  to {
    opacity: 0;
    height: 0;
    margin-top: 0;
  }
`;

export const wrapperStyle =
  ({ disableAnimation }: Pick<SnackbarProps, 'disableAnimation'>) =>
  (theme: Theme) => css`
    backdrop-filter: blur(32px);
    will-change: backdrop-filter;
    border-radius: 12px;
    margin-top: var(--wds-snackbar-animation-margin-top);
    max-width: 100%;

    ${respondMore(theme.breakpoint.sm)} {
      min-width: 356px;
      max-width: 420px;
    }
    ${respondTo(theme.breakpoint.sm)} {
      width: 100%;
    }

    ${!disableAnimation &&
    css`
      &[data-status='open'] {
        animation: ${mountKeyframes} 0.2s ease;
      }
      &[data-status='close'] {
        animation: ${unmountKeyframes} 0.2s ease;
      }
    `}
  `;

export const snackbarStyle = css`
  border-radius: inherit;
  padding: 11px 16px;
  display: flex;
  gap: 16px;
  font-size: 20px;
  pointer-events: auto;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > :not([role='presentation']) {
    z-index: 1;
  }
`;

export const firstOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.semantic.inverse.background,
    theme.opacity[52],
  )};
  inset: 0;
`;

export const secondOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.semantic.primary.normal,
    theme.opacity[5],
  )};
  inset: 0;
`;

export const messageStyle = css`
  padding: 5px 2px;
`;

export const snackbarActionStyle = (theme: Theme) => css`
  color: ${theme.semantic.static.white};
  margin: 0px 2px;
  flex-shrink: 0;

  & > span {
    ${typographyStyle('body2', 'bold')}
  }

  & [wds-component='with-interaction'] {
    background-color: ${theme.semantic.background.normal.normal};
  }
`;

export const textStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[88]};
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const fullWidthFlexBoxStyle = css`
  width: 100%;
`;

export const snackbarCloseButtonStyle = (theme: Theme) => css`
  flex-shrink: 0;
  padding: 2px;
  width: fit-content;
  height: fit-content;

  svg {
    opacity: ${theme.opacity[61]};
  }

  & [wds-component='with-interaction'] {
    background-color: ${theme.semantic.background.normal.normal};
  }
`;
