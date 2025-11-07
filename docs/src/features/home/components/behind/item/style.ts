import { addOpacity, css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const carouselItemStyle = (theme: Theme) => css`
  --carousel-item-width: calc(33% - var(--carousel-item-gap) / 3);

  ${respondTo(theme.breakpoint.md)} {
    --carousel-item-width: 283px;
  }
`;

export const itemLinkStyle = (theme: Theme) => css`
  padding: 0px 6px;

  [data-role='interaction-arrow'] {
    color: ${theme.semantic.label.normal};
    transition: transform 0.2s ease;
    font-size: 24px;
    transform: scale(0);
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        transform: scale(1);
      }
    }
  }

  ${respondTo(theme.breakpoint.md)} {
    [data-role='interaction-arrow'] {
      font-size: 24px;
    }
  }
`;

export const thumbnailWrapperStyle = css`
  border-radius: 24px;
  overflow: hidden;
  position: relative;
`;

export const thumbnailStyle = (theme: Theme) => css`
  border-radius: inherit;
  position: relative;

  img {
    width: 124px;
    height: 124px;
    margin: auto;

    ${respondTo(theme.breakpoint.lg)} {
      width: 112px;
      height: 112px;
    }

    ${respondTo(theme.breakpoint.md)} {
      width: 106px;
      height: 106px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[43]};
    inset: 0;
  }
`;

export const glassEffectStyle = css`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  transform-origin: center center;
  position: absolute;
  left: 0;
  top: 0;
  width: min(35%, 70px);
  aspect-ratio: 1 / 1;

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
`;

export const glassShadowEffectStyle = (theme: Theme) => css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  box-shadow:
    inset 0 0 6px ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset 1px 1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset -1px -1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    ${theme.semantic.elevation.shadow.normal.small};
`;

export const titleStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.xl)} {
    .max-xl\\:hidden {
      display: none;
    }
  }
`;
