import { css, keyframes, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = (theme: Theme) => css`
  width: 100%;
  height: calc(100vh - var(--gnb-height));
  min-height: 856px;

  ${respondTo(theme.breakpoint.sm)} {
    min-height: 600px;
  }
`;

export const contentWrapperStyle = (theme: Theme) => css`
  width: 100%;
  padding-inline: var(--layout-padding-inline);
  margin-top: 100px;
  margin-bottom: 72px;
  gap: 60px;

  ${respondTo(theme.breakpoint.sm)} {
    margin-top: 80px;
    margin-bottom: 60px;
  }
`;

export const titleStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -1.577px;
  width: 100%;
  height: fit-content;
  text-align: center;
  color: ${theme.semantic.label.normal};

  ${respondTo(theme.breakpoint.lg)} {
    font-size: 64px;
    line-height: 100%;
    letter-spacing: -1.402px;
  }

  ${respondTo(theme.breakpoint.md)} {
    font-size: 46px;
    line-height: 105%;
    letter-spacing: -1.007px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    font-size: 40px;
    line-height: 105%;
    letter-spacing: -0.876px;
  }

  ${respondTo('500px')} {
    white-space: pre-line;
  }
`;

export const descriptionStyle = css`
  margin-block: 28px 32px;
  white-space: pre-line;

  ${respondTo('500px')} {
    white-space: initial;
  }
`;

export const startButtonStyle = (theme: Theme) => css`
  padding: 12px 20px;
  background-color: ${theme.semantic.fill.normal};
  border-radius: 99px;
  width: fit-content;
  height: fit-content;
  color: ${theme.semantic.label.normal};

  transition:
    color 0.3s ease,
    background-color 0.3s ease;

  @media (pointer: fine) {
    &:hover {
      background-color: ${theme.semantic.inverse.background};
      color: ${theme.semantic.inverse.label};
    }
  }
`;

const marquee = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--marquee-gap)));
  }
`;

export const marqueeWrapperStyle = (theme: Theme) => css`
  width: calc(100% + (var(--layout-padding-inline) * 2));
  max-width: 1600px;
  position: relative;
  overflow: hidden;
  gap: 12px;

  --marquee-gap: 20px;

  &[data-animation-state='animation-end'] [data-role='marquee-wrapper'] {
    animation: ${marquee} 40s linear infinite;
  }

  ${respondTo(theme.breakpoint.xl)} {
    --marquee-gap: 19px;
  }

  ${respondTo(theme.breakpoint.md)} {
    gap: 10px;
    --marquee-gap: 14px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    --marquee-gap: 10px;
  }
`;

export const marqueeGroupStyle = css`
  will-change: transform;
`;

export const marqueeBackgroundOverlayStyle =
  (position: 'left' | 'right') => (theme: Theme) => css`
    ${position === 'left' ? 'left: 0;' : 'right: 0;'};
    --overlay-direction: ${`to ${position}`};
    pointer-events: none;
    position: absolute;
    width: 300px;
    height: 100%;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: ${theme.semantic.background.normal.normal};
      mask-image: linear-gradient(
        ${position === 'left' ? 'to right' : 'to left'},
        #000 10%,
        rgba(0, 0, 0, 0.86) 14.03%,
        rgba(0, 0, 0, 0.73) 26.24%,
        rgba(0, 0, 0, 0.62) 36.8%,
        rgba(0, 0, 0, 0.52) 45.9%,
        rgba(0, 0, 0, 0.43) 53.7%,
        rgba(0, 0, 0, 0.35) 60.4%,
        rgba(0, 0, 0, 0.29) 66.16%,
        rgba(0, 0, 0, 0.23) 71.17%,
        rgba(0, 0, 0, 0.18) 75.6%,
        rgba(0, 0, 0, 0.14) 79.63%,
        rgba(0, 0, 0, 0.1) 83.44%,
        rgba(0, 0, 0, 0.07) 87.2%,
        rgba(0, 0, 0, 0.04) 91.1%,
        rgba(0, 0, 0, 0.02) 95.3%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    ${respondTo(theme.breakpoint.md)} {
      width: 200px;
    }

    ${respondTo(theme.breakpoint.sm)} {
      width: 80px;
    }

    [data-role='marquee-background-overlay-layer'] {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      &:nth-child(1) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 1) 10%,
          rgba(0, 0, 0, 1) 30%,
          rgba(0, 0, 0, 0) 40%
        );
        backdrop-filter: blur(1px);
      }

      &:nth-child(2) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0) 10%,
          rgba(0, 0, 0, 1) 20%,
          rgba(0, 0, 0, 1) 40%,
          rgba(0, 0, 0, 0) 50%
        );
        backdrop-filter: blur(2px);
      }

      &:nth-child(3) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0) 20%,
          rgba(0, 0, 0, 1) 40%,
          rgba(0, 0, 0, 1) 60%,
          rgba(0, 0, 0, 0) 70%
        );
        backdrop-filter: blur(4px);
      }

      &:nth-child(4) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0) 40%,
          rgba(0, 0, 0, 1) 60%,
          rgba(0, 0, 0, 1) 80%,
          rgba(0, 0, 0, 0) 90%
        );
        backdrop-filter: blur(6px);
      }

      &:nth-child(5) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0) 60%,
          rgba(0, 0, 0, 1) 80%
        );
        backdrop-filter: blur(8px);
      }

      &:nth-child(6) {
        mask: linear-gradient(
          var(--overlay-direction),
          rgba(0, 0, 0, 0) 70%,
          rgba(0, 0, 0, 1) 100%
        );
        backdrop-filter: blur(10px);
      }
    }
  `;

export const marqueeImageStyle = (theme: Theme) => css`
  width: auto;
  height: 144px;
  user-select: none;
  pointer-events: none;

  ${respondTo(theme.breakpoint.xl)} {
    height: 134px;
  }

  ${respondTo(theme.breakpoint.md)} {
    height: 126px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    height: 102px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
