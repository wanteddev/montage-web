import {
  addOpacity,
  css,
  keyframes,
  respondMore,
  respondTo,
} from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const scrollDownWrapperStyle = (theme: Theme) => css`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;

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

export const navigationBarLinkStyle = (theme: Theme) => css`
  box-shadow: none;
  color: ${theme.semantic.static.white};
  background: ${addOpacity(theme.atomic.blue[30], theme.opacity[28])};
  border-radius: 14px;
  padding: 10px 16px;
  backdrop-filter: blur(32px);

  svg {
    font-size: 18px;
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
