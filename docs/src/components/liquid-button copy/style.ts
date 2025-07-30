import { addOpacity, css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const liquidButtonStyle = (theme: Theme) => css`
  padding: 9px 16px;
  display: flex;
  border: none;
  position: relative;
  border-radius: 145px;
  background-color: transparent;
  border: none;
  outline: none;
  transition: transform ease-out 0.2s;
  transform: translate(
      var(--liquid-button-transform-translate-x),
      var(--liquid-button-transform-translate-y)
    )
    var(--liquid-button-transform-scale);
  backdrop-filter: var(--liquid-button-filter);

  &::before {
    opacity: 0;
    background-image: radial-gradient(
      circle at 50% 0%,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 80%
    );
    content: '';
    mix-blend-mode: overlay;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    position: absolute;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 0.2;
  }

  &:active {
    --liquid-button-transform-scale: scaleX(0.96) scaleY(0.96) !important;
    ::before {
      opacity: 0.3;
    }
  }

  ${respondMore(theme.breakpoint.sm)} {
    padding: 9px 20px;
  }

  ${respondMore(theme.breakpoint.md)} {
    padding: 11px 24px;
  }
`;

export const liquidButtonFirstLayerStyle = (theme: Theme) => css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: ${addOpacity(
    theme.semantic.static.black,
    theme.opacity[8],
  )};
`;

export const liquidButtonSecondLayerStyle = (theme: Theme) => css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  box-shadow:
    inset 0 0 6px ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset 1px 1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset -1px -1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])};
`;

export const liquidButtonContentStyle = (theme: Theme) => css`
  position: relative;
  z-index: 1;
  color: ${theme.semantic.static.white};
  font-family: var(--font-family-wanted-sans);
  text-shadow: 0 0 4px
    ${addOpacity(theme.semantic.static.white, theme.opacity[28])};
  width: 100%;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 144.5%;
  letter-spacing: -0.003px;

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 15px;
    line-height: 144.5%;
    letter-spacing: -0.003px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 18px;
    letter-spacing: -0.252px;
  }
`;
