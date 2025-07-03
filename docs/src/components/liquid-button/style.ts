import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const liquidButtonWrapperStyle = css`
  position: relative;

  &:has([data-role='liquid-button']:hover) {
    [data-role='liquid-button-interaction'] {
      opacity: 0.5;
    }

    [data-role='liquid-button-interaction-alternative'] {
      opacity: 0.4;
    }
  }

  &:has([data-role='liquid-button']:active) {
    [data-role='liquid-button-interaction'] {
      opacity: 0.5;
    }

    [data-role='liquid-button-interaction-active'] {
      opacity: 0.5;
    }

    [data-role='liquid-button-interaction-alternative'] {
      opacity: 0.8;
    }

    --liquid-button-transform-scale: scaleX(0.96) scaleY(0.96) !important;
  }
`;

export const liquidButtonStyle = (theme: Theme) => css`
  padding: 12px 20px;
  display: flex;
  border: none;
  background-color: transparent;
  position: relative;
  border-radius: var(--liquid-button-radius);
  transform: translate(
      var(--liquid-button-transform-translate-x),
      var(--liquid-button-transform-translate-y)
    )
    var(--liquid-button-transform-scale);
  transition: var(--liquid-button-transition);

  ${respondMore(theme.breakpoint.sm)} {
    padding: 11.5px 20px;
  }

  ${respondMore(theme.breakpoint.md)} {
    padding: 15px 24px;
  }
`;

export const liquidButtonGlassStyle = css`
  border-radius: inherit;
`;

export const liquidButtonGlassFilterStyle = css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  filter: var(--liquid-button-filter);
  backdrop-filter: blur(7.2px) saturate(130%);

  @supports (-moz-appearance: none) {
    filter: none;
  }
`;

export const liquidButtonShadowStyle = css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.22;
  box-shadow:
    0px 39px 56px -36px rgba(255, 255, 255, 0.5) inset,
    0px 7px 11px -4px #fff inset,
    0px -82px 68px -64px rgba(96, 68, 144, 0.3) inset,
    0px 98px 100px -48px rgba(202, 172, 255, 0.3) inset,
    0px 4px 18px 0px rgba(154, 146, 210, 0.3) inset,
    0px 1px 40px 0px rgba(227, 222, 255, 0.2) inset,
    0px 12px 40px rgba(0, 0, 0, 0.25);
`;

export const liquidButtonContentStyle = (theme: Theme) => css`
  position: relative;
  z-index: 1;
  color: ${theme.semantic.static.white};
  font-family: var(--font-family-wanted-sans);
  width: 100%;
  line-height: normal;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.312px;
  text-transform: uppercase;

  &,
  & * {
    text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  }

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 14px;
    letter-spacing: -0.196px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 15px;
    letter-spacing: -0.21px;
  }
`;

export const liquidButtonLineBaseStyle = css`
  position: absolute;
  inset: 0;
  border-radius: var(--liquid-button-radius);
  transform: translate(
      var(--liquid-button-transform-translate-x),
      var(--liquid-button-transform-translate-y)
    )
    var(--liquid-button-transform-scale);
  transition: var(--liquid-button-transition);
  width: var(--liquid-button-width);
  height: var(--liquid-button-height);
  pointer-events: none;
`;

export const liquidButtonLineOverlayFirstStyle = css`
  opacity: 0.2;
  mix-blend-mode: screen;
  padding: 1px;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.5) inset,
    0 1px 3px rgba(255, 255, 255, 0.25) inset,
    0 1px 4px rgba(0, 0, 0, 0.35);
`;

export const liquidButtonLineOverlaySecondaryStyle = css`
  mix-blend-mode: overlay;
  padding: 1px;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.5) inset,
    0 1px 3px rgba(255, 255, 255, 0.25) inset,
    0 1px 4px rgba(0, 0, 0, 0.35);
`;

export const liquidButtonInteractionOverlayFirstStyle = css`
  background-image: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  mix-blend-mode: overlay;
  width: calc(var(--liquid-button-width) + 1px);
  opacity: 0;
`;

export const liquidButtonInteractionOverlaySecondStyle = css`
  background-image: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 80%
  );
  mix-blend-mode: overlay;
  width: calc(var(--liquid-button-width) + 1px);
  opacity: 0;
`;

export const liquidButtonInteractionOverlayThirdStyle = css`
  background-image: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  mix-blend-mode: overlay;
  width: calc(var(--liquid-button-width) + 1px);
  opacity: 0;
`;
