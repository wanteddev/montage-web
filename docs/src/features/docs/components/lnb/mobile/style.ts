import { css, gradient, keyframes, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

const mountKeyframe = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const unMountKeyframe = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const mobileMountKeyframe = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const mobileUnMountKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const containerStyle = css`
  --lnb-padding: 10px;

  max-height: calc(
    100% - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)
  );
  border-radius: 0px;
  width: 75%;
  animation: ${mountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);

  &[data-status='close'] {
    animation: ${unMountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  ${respondTo('620px')} {
    width: 100%;
    max-width: 100%;
    animation: ${mobileMountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
    transform: none;

    &[data-status='close'] {
      transform: none;
      animation: ${mobileUnMountKeyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
    }
  }
`;

export const wrapperStyle = css`
  padding: 0px;
  align-items: initial;
  justify-content: flex-end;

  [data-role='modal-dimmer'] {
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  ${respondTo('620px')} {
    [data-role='modal-dimmer'] {
      display: none;
    }
  }
`;

export const navigationStyle = (theme: Theme) => css`
  --wds-top-navigation-padding-x: 24px;
  position: relative;
  background-color: transparent;
  backdrop-filter: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    z-index: -1;
    left: 0;
    width: 100%;
    height: calc(100% + 16px);
    ${gradient(
      theme.semantic.background.elevated.normal,
      'bottom',
      '32px',
      'mask',
    )}
  }

  [data-role='top-navigation-wrapper'] {
    gap: 8px;
  }

  [data-role='navigation-title'] h2 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const backButtonStyle = css`
  background-color: transparent;
  border: none;
  position: relative;
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1);

  &[aria-hidden='true'] {
    opacity: 0;
  }
`;

export const navigationTitleStyle = css`
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &[data-is-visible='false'] {
    opacity: 0;
  }

  &[data-is-scrolling='true'] {
    opacity: 1;
  }
  &[data-is-scrolling='false'] {
    opacity: 0;
  }
`;

export const categoryTitleStyle = css`
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding-block: 8px;

  &[data-is-scrolling='true'] {
    opacity: 0;
  }
  &[data-is-scrolling='false'] {
    opacity: 1;
  }
`;

const frontmatterMountKeyframe = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

export const frontmatterWrapperStyle = css`
  animation: ${frontmatterMountKeyframe} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const focusedCategoryMountKeyframe = keyframes`
  0% {
    transform: translateX(20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

export const focusedCategoryWrapperStyle = css`
  animation: ${focusedCategoryMountKeyframe} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
