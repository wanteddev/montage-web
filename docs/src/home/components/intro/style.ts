import { css, respondMore } from '@wanteddev/wds';

import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { Theme } from '@wanteddev/wds';

export const introBackgroundStyle = (theme: Theme) => css`
  position: relative;
  background-image: url(/background-image.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  margin-top: var(--intro-background-margin-top);

  --intro-background-padding-inline: 20px;
  --intro-background-height-offset: ${GNB_HEIGHT + 20 + 20}px;
  --intro-background-border-radius: 40px;
  --intro-background-margin-top: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    --intro-background-padding-inline: 48px;
    --intro-background-height-offset: ${GNB_HEIGHT + 24 + 48}px;
    --intro-background-border-radius: 40px;
    --intro-background-margin-top: 24px;
  }
`;
