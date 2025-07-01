import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const bannerWrapperStyle = css`
  width: 100%;
  margin-top: 64px;

  ${respondMore('620px')} {
    margin-top: 56px;
    margin-bottom: 16px;
  }

  ${respondMore('1200px')} {
    margin-bottom: 20px;
  }
`;

export const bannerTitleStyle = css`
  font-size: 24px;
  line-height: 120%;
  letter-spacing: -0.336px;
  font-style: normal;
  font-weight: 800;
  text-transform: capitalize;
  text-align: center;
  font-family: var(--font-family-wanted-sans);
  margin-bottom: 20px;

  ${respondMore('375px')} {
    font-size: 28px;
    line-height: 120%;
    letter-spacing: -0.392px;
  }

  ${respondMore('620px')} {
    margin-bottom: 28px;
  }

  ${respondMore('768px')} {
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -0.768px;
  }

  ${respondMore('1200px')} {
    font-size: 40px;
    line-height: 120%;
    letter-spacing: -0.96px;
  }
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
  margin-right: 12px;
  gap: 20px;

  ${respondMore('620px')} {
    gap: 24px;
  }

  ${respondMore('1200px')} {
    gap: 28px;
  }
`;

export const bannerSliderItemImageStyle = css`
  border-radius: 24px;
  width: 100%;
  height: clamp(280px, 20vw, 429px);

  ${respondMore('768px')} {
    border-radius: 32px;
  }

  ${respondMore('1200px')} {
    border-radius: 40px;
  }
`;

export const bannerContentWrapperStyle = css`
  gap: 6px;
`;

export const bannerSliderDotStyle = css`
  margin-top: 20px;

  ${respondMore('620px')} {
    margin-top: 32px;
  }

  ${respondMore('1200px')} {
    display: none;
  }
`;

export const bannerSliderItemContentStyle = css`
  gap: 6px;
  flex-direction: column;
`;

export const bannerSliderItemTitleStyle = (theme: Theme) => css`
  width: 100%;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 136.4%;
  letter-spacing: -0.252px;
  text-align: center;
  font-family: var(--font-family-wanted-sans);
  color: ${theme.semantic.label.normal};

  ${respondMore('768px')} {
    font-size: 20px;
    line-height: 136.4%;
    letter-spacing: -0.388px;
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
`;
