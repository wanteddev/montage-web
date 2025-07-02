import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const bannerWrapperStyle = css`
  width: 100%;

  ${respondMore('620px')} {
    margin-bottom: 16px;
  }

  ${respondMore('1360px')} {
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

export const bannerSliderItemStyle = css`
  min-width: 0px;
  gap: 20px;

  ${respondMore('620px')} {
    gap: 24px;
  }

  ${respondMore('1360px')} {
    gap: 28px;
  }
`;

export const bannerSliderItemImageStyle = css`
  border-radius: 24px;
  width: 100%;
  aspect-ratio: 1/1;

  ${respondMore('620px')} {
    aspect-ratio: 21/9;
  }

  ${respondMore('780px')} {
    border-radius: 32px;
  }

  ${respondMore('1360px')} {
    border-radius: 40px;
  }
`;

export const bannerContentWrapperStyle = css`
  width: 100%;
  gap: 6px;
  position: relative;
`;

export const bannerSliderDotStyle = css`
  margin-top: 20px;

  ${respondMore('620px')} {
    margin-top: 32px;
  }

  ${respondMore('1360px')} {
    display: none;
  }
`;

export const bannerSliderItemContentStyle = css`
  gap: 6px;
  flex-direction: column;

  ${respondMore('620px')} {
    gap: 32px;
    flex-direction: row;
    padding-inline: 16px;
    align-items: center;
  }

  ${respondMore('1360px')} {
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

  ${respondMore('620px')} {
    white-space: pre-line;
    text-align: left;
    flex: 0 0 fit-content;
  }

  ${respondMore('780px')} {
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

  ${respondMore('620px')} {
    height: fit-content;
    flex: 1 0 0%;
    text-align: left;
    font-size: 13px;
    line-height: 142.9%;
    letter-spacing: -0.182px;
    color: ${theme.semantic.label.neutral};
  }

  ${respondMore('700px')} {
    font-size: 14px;
    line-height: 142.9%;
    letter-spacing: -0.196px;
  }

  ${respondMore('780px')} {
    font-size: 15px;
    line-height: 142.9%;
    letter-spacing: -0.21px;
  }

  ${respondMore('1360px')} {
    max-width: 560px;
  }
`;

export const bannerSliderButtonWrapperStyle = css`
  display: none;
  position: absolute;
  bottom: 12px;
  right: 20px;

  ${respondMore('1360px')} {
    display: flex;
  }
`;

export const bannerSliderButtonStyle = css`
  svg {
    width: 16px !important;
    height: 16px !important;
  }
`;
