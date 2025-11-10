import { addOpacity, css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const carouselItemStyle = (theme: Theme) => css`
  --carousel-item-width: calc((100% - var(--carousel-item-gap) * 2) / 3);

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
    --carousel-item-width: 283px;
    [data-role='interaction-arrow'] {
      font-size: 24px;
    }
  }
`;

export const itemContainerStyle = css`
  padding: 0px 6px;
`;

export const thumbnailWrapperStyle = css`
  border-radius: 24px;
  overflow: hidden;
  position: relative;

  @media (pointer: fine) {
    &:has([data-role='glass-effect'][data-visible='true']),
    &:has([data-role='glass-background-effect'][data-visible='true']) {
      cursor: none;
    }
  }
`;

export const thumbnailStyle = (theme: Theme) => css`
  border-radius: inherit;
  position: relative;
  z-index: 2;

  img {
    width: 124px;
    height: 124px;
    margin: auto;
    position: relative;
    z-index: 1;
    border-radius: unset;

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
  visibility: hidden;
  border: none;
  border-radius: 50%;
  transform-origin: center center;
  position: absolute;
  left: 0;
  top: 0;
  width: min(40%, 100px);
  z-index: 2;
  aspect-ratio: 1 / 1;
  will-change: backdrop-filter, transform;
  overflow: hidden;
  filter: drop-shadow(4px 4px 15px rgba(0, 0, 0, 0.1));

  @media (pointer: fine) {
    &[data-visible='true'] {
      visibility: visible;
    }
  }
`;

export const glassBackgroundEffectStyle =
  (lightText: string, darkText: string) => (theme: Theme) => css`
    position: absolute;
    aspect-ratio: 1 / 1;
    width: min(40%, 100px);
    border-radius: 50%;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image: url(${lightText});
    background-repeat: no-repeat;
    background-size: 452px;
    visibility: hidden;

    html[data-theme='dark'] & {
      background-image: url(${darkText});
    }

    @media (pointer: fine) {
      &[data-visible='true'] {
        visibility: visible;
      }
    }

    ${respondTo(theme.breakpoint.xl)} {
      background-size: 340px;
    }

    ${respondTo(theme.breakpoint.lg)} {
      background-size: calc(
        (
            100vw - var(--layout-padding-inline) * 2 - var(--carousel-item-gap) *
              2
          ) / 3
      );
      background-size: calc(
        (
            100dvw - var(--layout-padding-inline) * 2 - var(--carousel-item-gap) *
              2
          ) / 3
      );
    }

    ${respondTo(theme.breakpoint.md)} {
      background-size: var(--carousel-item-width);
    }
  `;

export const glassShadowEffectStyle = (theme: Theme) => css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  z-index: 3;
  box-shadow:
    inset 0 0 6px ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset 1px 1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])},
    inset -1px -1px 1px
      ${addOpacity(theme.semantic.static.white, theme.opacity[28])};
`;

export const titleStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.xl)} {
    .max-xl\\:hidden {
      display: none;
    }
  }
`;
