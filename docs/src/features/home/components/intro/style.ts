import {
  addOpacity,
  css,
  keyframes,
  respondMore,
  respondTo,
} from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const introWrapperStyle = (theme: Theme) => css`
  width: 100%;
  margin-top: 0px;
  padding: 0px;
  min-height: clamp(620px, 30vw, 30vw);
  border-radius: 0px;
  height: calc(100vh - var(--gnb-height));

  ${respondMore(theme.breakpoint.sm)} {
    margin-top: 8px;
    padding: 0px 20px 20px;
    border-radius: 24px;
    height: calc(100vh - var(--gnb-height) - 8px);
  }

  ${respondMore(theme.breakpoint.md)} {
    border-radius: 28px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    padding: 0px 28px 28px;
  }
`;

export const introBackgroundStyle = css`
  position: relative;
  border-radius: inherit;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

export const titleTextStyle = (theme: Theme) => css`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  text-shadow: 0px 0px 60px rgba(0, 0, 0, 0.16);
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
  font-weight: 600;
  font-size: 13px;
  line-height: 142.9%;
  letter-spacing: -0.182px;
  text-shadow: 0px 0px 32px
    ${addOpacity(theme.semantic.static.black, theme.opacity[16])};
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
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: calc(100% - 32px);
  padding-top: 16px;
  border-top: 1px solid ${addOpacity(theme.semantic.static.white, 0.18)};

  ${respondTo(theme.breakpoint.lg)} {
    display: none;
  }
`;

export const versionInfoStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  color: ${theme.semantic.static.white};
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 138.5%;
  letter-spacing: -0.182px;
  padding-bottom: 6px;
  padding-left: 6px;
  display: block;
`;

export const navigationBarLinkStyle = (theme: Theme) => css`
  border-radius: 999px;
  box-shadow: none;
  background-color: ${addOpacity(theme.semantic.static.black, 0.08)};
  backdrop-filter: blur(12px);
  color: ${theme.semantic.static.white};

  span {
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
