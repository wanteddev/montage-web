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
    margin-top: 12px;
    padding: 0px 48px 28px;
    height: calc(100vh - var(--gnb-height) - 12px);
  }
`;

export const introBackgroundStyle = css`
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    z-index: -1;
    inset: 0;
  }
`;

export const titleTextStyle = (theme: Theme) => css`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  text-shadow: 4px 4px 24px rgba(0, 0, 0, 0.12);
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
    font-size: 116px;
    line-height: 100.7%;
    letter-spacing: -1.74px;
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
  text-shadow: 4px 4px 24px rgba(0, 0, 0, 0.16);
  white-space: pre-wrap;

  ${respondMore(theme.breakpoint.sm)} {
    white-space: unset;
    font-size: 14px;
    line-height: 142.9%;
    letter-spacing: -0.196px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 16px;
    line-height: 160%;
    letter-spacing: -0.224px;
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
  width: 100%;
  padding: 20px;
  align-self: flex-end;
  border-top: 1px solid ${addOpacity(theme.semantic.static.white, 0.18)};

  ${respondTo(theme.breakpoint.lg)} {
    display: none;
  }
`;

export const versionInfoStyle = (theme: Theme) => css`
  color: ${theme.semantic.static.white};
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 138.5%;
  letter-spacing: 0.252px;
  padding-inline: 16px;
  display: block;
`;

export const navigationBarLinkGroupStyle = (theme: Theme) => css`
  background: ${addOpacity(theme.atomic.blue[30], theme.opacity[28])};
  border-radius: 14px;
  padding: 10px 16px;
  backdrop-filter: blur(32px);
`;

export const navigationBarLinkStyle = (theme: Theme) => css`
  box-shadow: none;
  color: ${theme.semantic.static.white};

  svg {
    font-size: 18px;
  }

  &:hover span {
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
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
