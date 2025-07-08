import {
  addOpacity,
  css,
  keyframes,
  respondMore,
  respondTo,
} from '@wanteddev/wds';

import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { Theme } from '@wanteddev/wds';

export const introWrapperStyle = (theme: Theme) => css`
  width: 100%;
  margin-top: var(--intro-background-margin-top);
  padding: 0px var(--intro-background-padding-inline)
    var(--intro-background-padding-inline);
  height: var(--intro-background-height);
  min-height: clamp(620px, 30vw, 30vw);
  border-radius: var(--intro-background-border-radius);

  /* initial value */
  --intro-scroll-y: 0px;

  &[data-lnb-hide='false'] {
    margin-top: var(--intro-background-origin-margin-top);
    padding: 0px var(--intro-background-origin-padding-inline)
      var(--intro-background-origin-padding-inline);
    height: var(--intro-background-origin-height);
    border-radius: var(--intro-background-origin-border-radius);
  }

  --gnb-height-with-margin: ${GNB_HEIGHT};
  --intro-background-margin-top: 0px;
  --intro-background-padding-inline: 0px;
  --intro-background-border-radius: 0px;
  --intro-background-height: calc(100dvh - 1px * var(--gnb-height-with-margin));

  /* for lnb animation */
  --intro-background-origin-margin-top: 0px;
  --intro-background-origin-padding-inline: 0px;
  --intro-background-origin-border-radius: 0px;
  --intro-background-origin-height: calc(
    100dvh - 1px * var(--gnb-height-with-margin)
  );

  ${respondMore(theme.breakpoint.sm)} {
    --gnb-height-with-margin: ${GNB_HEIGHT + 8};
    --intro-background-margin-top: 8px;
    --intro-background-height: calc(
      100dvh - max(
          0px,
          calc(50px + var(--intro-background-padding-inline)) -
            (var(--intro-scroll-y) * (50 / var(--gnb-height-with-margin)))
        )
    );
    --intro-background-padding-inline: max(
      0px,
      20px - (var(--intro-scroll-y) * (20 / var(--gnb-height-with-margin)))
    );
    --intro-background-border-radius: max(
      0px,
      24px - (var(--intro-scroll-y) * (24 / var(--gnb-height-with-margin)))
    );

    /* for lnb animation */
    --intro-background-origin-margin-top: 8px;
    --intro-background-origin-padding-inline: 20px;
    --intro-background-origin-border-radius: 24px;
    --intro-background-origin-height: calc(
      100dvh - 1px * var(--gnb-height-with-margin)
    );
  }

  ${respondMore(theme.breakpoint.md)} {
    --intro-background-border-radius: max(
      0px,
      28px - (var(--intro-scroll-y) * (28 / var(--gnb-height-with-margin)))
    );
    --intro-background-origin-border-radius: 28px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    --intro-background-height: calc(
      100dvh - max(
          0px,
          calc(42px + var(--intro-background-padding-inline)) -
            (var(--intro-scroll-y) * (42 / var(--gnb-height-with-margin)))
        )
    );

    --intro-background-padding-inline: max(
      0px,
      28px - (var(--intro-scroll-y) * (28 / var(--gnb-height-with-margin)))
    );

    /* for lnb animation */
    --intro-background-origin-padding-inline: 28px;
    --intro-background-origin-height: calc(
      100dvh - 1px * var(--gnb-height-with-margin)
    );
  }
`;

export const introBackgroundStyle = css`
  position: relative;
  background-image: url(/background-image.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: inherit;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

export const titleTextStyle = (theme: Theme) => css`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  text-shadow: 0px 0px 60px rgba(0, 0, 0, 0.32);
  font-family: var(--font-family-wanted-sans);
  font-size: 48px;
  font-weight: 800;
  line-height: 100.7%;
  letter-spacing: -0.72px;
  text-transform: uppercase;
  color: ${theme.semantic.static.white};

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 56px;
    line-height: 100.7%;
    letter-spacing: -0.84px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 72px;
    line-height: 100.7%;
    letter-spacing: -1.008px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    font-size: 88px;
    line-height: 100.7%;
    letter-spacing: -1.32px;
  }
`;

export const descriptionTextStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  text-align: center;
  color: ${theme.semantic.static.white};
  font-weight: 500;
  font-size: 13px;
  line-height: 142.9%;
  letter-spacing: -0.182px;
  text-shadow: 0px 0px 32px
    ${addOpacity(theme.semantic.static.black, theme.opacity[5])};
  white-space: pre-wrap;

  ${respondMore(theme.breakpoint.sm)} {
    white-space: unset;
    font-size: 14px;
    line-height: 142.9%;
    letter-spacing: -0.196px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 15px;
    line-height: 146.7%;
    letter-spacing: -0.21px;
  }
`;

export const scrollDownWrapperStyle = (theme: Theme) => css`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const navigationBarStyle = (theme: Theme) => css`
  padding: 12px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  border-radius: 999px;

  ${respondTo(theme.breakpoint.lg)} {
    display: none;
  }
`;

export const versionInfoStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  color: ${theme.semantic.static.white};
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 138.5%;
  letter-spacing: -0.182px;
  padding: 7px 32px;
`;

export const navigationBarLinkStyle = (theme: Theme) => css`
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
  background-color: ${addOpacity(theme.semantic.static.white, 0.01)};
  backdrop-filter: blur(12px);

  span {
    color: ${theme.semantic.static.white};
    font-family: var(--font-family-wanted-sans);
    font-size: 13px;
    font-weight: 600;
    line-height: 138.5%;
    letter-spacing: -0.182px;
  }

  svg {
    font-size: 16px;
  }
`;

const bounceKeyframe = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(6px);
  }

  100% {
    transform: translateY(0);
  }
`;

export const scrollDownIconStyle = (theme: Theme) => css`
  font-size: 22px;
  color: ${theme.semantic.static.white};
  animation: ${bounceKeyframe} 3s ease-out infinite;
`;

export const scrollDownTextStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.312px;
  color: ${addOpacity(theme.semantic.static.white, theme.opacity[61])};
`;
