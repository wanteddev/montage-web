import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const bannerWrapperStyle = (theme: Theme) => css`
  width: 100%;

  ${respondMore(theme.breakpoint.sm)} {
    margin-bottom: 16px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    margin-bottom: 20px;
  }
`;

export const bannerTitleStyle = css`
  text-transform: capitalize;
  text-align: center;
`;

export const bannerSliderStyle = css`
  overflow: hidden;
  width: 100%;
`;

export const bannerSliderContentStyle = css`
  display: flex;
  touch-action: pan-y pinch-zoom;
  width: 100%;
`;

export const bannerSliderItemStyle = (theme: Theme) => css`
  min-width: 0px;
  gap: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    gap: 24px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    gap: 28px;
  }
`;

export const bannerSliderItemImageStyle = (theme: Theme) => css`
  border-radius: 24px;
  width: 100%;

  ${respondMore(theme.breakpoint.sm)} {
    border-radius: 32px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    border-radius: 40px;
  }
`;

export const bannerContentWrapperStyle = css`
  width: 100%;
  gap: 6px;
  position: relative;
`;

export const bannerSliderDotStyle = (theme: Theme) => css`
  margin-top: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    margin-top: 32px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    display: none;
  }
`;

export const bannerSliderItemContentStyle = (theme: Theme) => css`
  gap: 6px;
  flex-direction: column;

  ${respondMore(theme.breakpoint.sm)} {
    gap: 32px;
    flex-direction: row;
    padding-inline: 16px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    padding-inline: 20px;
  }
`;

export const bannerSliderItemTitleStyle = (theme: Theme) => css`
  width: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 136.4%;
  letter-spacing: -0.252px;
  text-align: center;
  font-family: var(--font-family-wanted-sans);
  color: ${theme.semantic.label.normal};
  user-select: none;

  ${respondMore(theme.breakpoint.sm)} {
    white-space: pre-line;
    text-align: left;
    flex: 0 0 fit-content;
  }

  ${respondMore(theme.breakpoint.lg)} {
    font-size: 20px;
    line-height: 136.4%;
    letter-spacing: -0.28px;
  }
`;

export const bannerSliderItemDescriptionStyle = (theme: Theme) => css`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 157.1%;
  letter-spacing: -0.336px;
  text-align: center;
  font-family: var(--font-family-wanted-sans);
  color: ${theme.semantic.label.alternative};
  user-select: none;

  ${respondMore(theme.breakpoint.sm)} {
    height: fit-content;
    flex: 1 0 0%;
    text-align: left;
    font-size: 15px;
    line-height: 142.9%;
    letter-spacing: -0.21px;
    color: ${theme.semantic.label.neutral};
    align-self: center;
  }

  ${respondMore(theme.breakpoint.lg)} {
    max-width: 560px;
  }
`;

export const bannerSliderButtonWrapperStyle = (theme: Theme) => css`
  display: none;
  position: absolute;
  bottom: 12px;
  right: 20px;

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }
`;

export const bannerSliderButtonStyle = css`
  svg {
    width: 16px !important;
    height: 16px !important;
  }
`;
