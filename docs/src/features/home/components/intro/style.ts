import { css, respondMore } from '@wanteddev/wds';

import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { Theme } from '@wanteddev/wds';

export const introWrapperStyle = (theme: Theme) => css`
  width: 100%;
  margin-top: var(--intro-background-margin-top);
  padding: 0px var(--intro-background-padding-inline)
    var(--intro-background-padding-inline);
  height: var(--intro-background-height);
  min-height: clamp(620px, 30vw, 30vw);
  border-radius: var(--intro-background-border-radius);

  /* initial value */
  --intro-scroll-y: 0px;

  &[data-lnb-hide='false'] {
    margin-top: var(--intro-background-origin-margin-top);
    padding: 0px var(--intro-background-origin-padding-inline)
      var(--intro-background-origin-padding-inline);
    height: var(--intro-background-origin-height);
    border-radius: var(--intro-background-origin-border-radius);
  }

  --gnb-height-with-margin: ${GNB_HEIGHT};
  --intro-background-margin-top: 0px;
  --intro-background-padding-inline: 0px;
  --intro-background-border-radius: 0px;
  --intro-background-height: 100dvh;

  /* for lnb animation */
  --intro-background-origin-margin-top: 0px;
  --intro-background-origin-padding-inline: 0px;
  --intro-background-origin-border-radius: 0px;
  --intro-background-origin-height: calc(
    100dvh - 1px * var(--gnb-height-with-margin)
  );

  ${respondMore('500px')} {
    --gnb-height-with-margin: ${GNB_HEIGHT + 16};
    --intro-background-margin-top: 16px;
    --intro-background-height: calc(
      100dvh - max(
          0px,
          calc(58px + var(--intro-background-padding-inline)) -
            (var(--intro-scroll-y) * (58 / var(--gnb-height-with-margin)))
        )
    );
    --intro-background-padding-inline: max(
      0px,
      20px - (var(--intro-scroll-y) * (20 / var(--gnb-height-with-margin)))
    );
    --intro-background-border-radius: max(
      0px,
      32px - (var(--intro-scroll-y) * (32 / var(--gnb-height-with-margin)))
    );

    /* for lnb animation */
    --intro-background-origin-margin-top: 16px;
    --intro-background-origin-padding-inline: 20px;
    --intro-background-origin-border-radius: 32px;
    --intro-background-origin-height: calc(
      100dvh - 1px * var(--gnb-height-with-margin)
    );
  }

  ${respondMore(theme.breakpoint.lg)} {
    --gnb-height-with-margin: ${GNB_HEIGHT + 24};
    --intro-background-margin-top: 24px;
    --intro-background-height: calc(
      100dvh - max(
          0px,
          calc(32px + var(--intro-background-padding-inline)) -
            (var(--intro-scroll-y) * (32 / var(--gnb-height-with-margin)))
        )
    );
    --intro-background-padding-inline: max(
      0px,
      48px - (var(--intro-scroll-y) * (48 / var(--gnb-height-with-margin)))
    );
    --intro-background-border-radius: max(
      0px,
      40px - (var(--intro-scroll-y) * (40 / var(--gnb-height-with-margin)))
    );

    /* for lnb animation */
    --intro-background-origin-margin-top: 24px;
    --intro-background-origin-padding-inline: 48px;
    --intro-background-origin-border-radius: 40px;
    --intro-background-origin-height: calc(
      100dvh - 1px * var(--gnb-height-with-margin)
    );
  }
`;

export const introBackgroundStyle = css`
  position: relative;
  background-image: url(/background-image.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: inherit;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

export const titleTextStyle = (theme: Theme) => css`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  text-shadow: 0px 0px 60px rgba(0, 0, 0, 0.32);
  font-family: var(--font-family-wanted-sans);
  font-size: clamp(48px, 6.5vw, 6.5vw);
  font-weight: 800;
  line-height: 100.7%;
  letter-spacing: -0.6px;
  text-transform: uppercase;
  color: ${theme.semantic.static.white};
`;

export const descriptionTextStyle = (theme: Theme) => css`
  text-align: center;
  color: ${theme.semantic.static.white};
  font-weight: 500;
  line-height: 157.1%;
  letter-spacing: 0.203px;
  font-size: clamp(14px, 1vw, 1vw);
  text-shadow: 0px 0px 64px rgba(0, 0, 0, 0.05);
  white-space: pre-wrap;

  ${respondMore('620px')} {
    white-space: unset;
  }
`;
