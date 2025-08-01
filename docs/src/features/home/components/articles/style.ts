import { addOpacity, css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const articleWrapperStyle = css`
  display: flex;
  flex-direction: row;
  width: calc(100% + var(--padding-inline) * 2);
  margin-left: calc(var(--padding-inline) * -1);
  padding-inline: var(--padding-inline);
  overflow: hidden;
`;

export const articleContentStyle = css`
  touch-action: pan-y pinch-zoom;
  width: 100%;
`;

export const articleItemStyle = (theme: Theme) => css`
  flex: 0 0 283px;
  aspect-ratio: 3/4;
  border-radius: 24px;
  transform: translate3d(0, 0, 0);
  position: relative;
  user-select: none;
  border-radius: 24px;
  padding: 8px;
  position: relative;
  width: 100%;
  margin-right: 16px;
  overflow: hidden;

  &:last-child {
    margin-right: 0px;
  }

  ${respondMore(theme.breakpoint.sm)} {
    flex: 0 0 315px;
  }

  ${respondMore(theme.breakpoint.md)} {
    flex: 0 0 336px;
  }

  &:hover {
    [data-role='article-icon'] {
      opacity: 1;
      transform: scale(1);
    }

    [data-role='article-video'] {
      transform: scale(1.05);
    }
  }
`;

export const articleItemVideoStyle = css`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
  object-fit: cover;
  top: 0px;
  left: 0px;
  z-index: -1;
  transform-origin: center center;
  transition: transform 0.2s ease;
`;

export const articleIconStyle = css`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 1;
  font-size: 32px;
  opacity: 0;
  will-change: transform, opacity;
  transform: scale(0);
  transform-origin: center center;
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
`;

export const articleItemContentStyle = (theme: Theme) => css`
  border-radius: 20px;
  background-color: ${addOpacity(
    theme.semantic.background.elevated.normal,
    theme.opacity[12],
  )};
  backdrop-filter: blur(32px);
  padding: 24px 16px 16px;
  align-items: center;
`;

export const articleItemTitleStyle = (theme: Theme) => css`
  color: ${theme.semantic.static.white};
  font-family: var(--font-family-wanted-sans);
  text-shadow: 0px 0px 32px ${addOpacity(theme.semantic.static.black, 0.1)};
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.252px;
  text-align: center;

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 20px;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
`;

export const articleItemDescriptionStyle = (theme: Theme) => css`
  color: ${addOpacity(theme.semantic.static.white, theme.opacity[88])};
  font-family: var(--font-family-wanted-sans);
  text-align: center;
  white-space: pre-wrap;
  text-shadow: 0px 0px 32px ${addOpacity(theme.semantic.static.black, 0.05)};
  font-size: 13px;
  font-weight: 500;
  line-height: 146.1%;
  letter-spacing: -0.182px;

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 14px;
    letter-spacing: -0.196px;
  }
`;

export const articleItemLinkStyle = (theme: Theme) => css`
  gap: 0px;
  border-radius: 8px;
  padding: 8px 0px;
  color: ${theme.semantic.static.white};
  display: grid;
  grid-template-columns: 1fr 0px;
  transition: grid-template-columns 0.2s ease-in-out;

  span {
    font-family: var(--font-family-wanted-sans);
    font-size: 16px;
    font-weight: 600;
    line-height: 144.5%;
    letter-spacing: -0.224px;
  }

  svg {
    display: block;
    margin-left: 8px;
    font-size: 20px;
    opacity: 0;
    will-change: transform, opacity;
    transform: scale(0);
    transform-origin: center center;
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }

  & > [wds-component='with-interaction'] {
    opacity: 0 !important;
  }

  &:hover {
    grid-template-columns: 1fr 20px;
    svg {
      transform: scale(1);
      opacity: 1;
    }
  }

  ${respondMore(theme.breakpoint.sm)} {
    span {
      font-size: 18px;
      line-height: 144.5%;
      letter-spacing: -0.252px;
    }
  }
`;
