import { css, keyframes } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = css`
  width: 100%;
  height: calc(100vh - var(--gnb-height));
  min-height: 856px;
`;

export const contentWrapperStyle = css`
  width: 100%;
  padding-inline: var(--layout-padding-inline);
  margin-top: 100px;
  margin-bottom: 72px;
  gap: 60px;
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
`;

export const descriptionStyle = css`
  margin-block: 28px 32px;
`;

export const startButtonStyle = (theme: Theme) => css`
  padding: 12px 20px;
  background-color: ${theme.semantic.fill.normal};
  border-radius: 99px;
  width: fit-content;
  height: fit-content;
`;

export const marqueeWrapperStyle = css`
  width: calc(100% + (var(--layout-padding-inline) * 2));
  max-width: 1600px;
  margin-left: calc(var(--layout-padding-inline) * -1);
  position: relative;
  overflow: hidden;

  --marquee-overlay-width: 100px;
  --marquee-gap: 24px;
`;

const marquee = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--marquee-gap)));
  }
`;

export const marqueeGroupStyle = css`
  animation: ${marquee} 40s linear infinite;
`;

export const marqueeBackgroundOverlayStyle = (theme: Theme) => css`
  pointer-events: none;
  position: absolute;
  width: 280px;
  height: 100%;
  z-index: 0;
  background: linear-gradient(
    var(--overlay-direction),
    transparent,
    ${theme.semantic.background.normal.normal}
  );

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

export const marqueeImageStyle = css`
  width: auto;
  height: 144px;
  user-select: none;
  pointer-events: none;
`;
