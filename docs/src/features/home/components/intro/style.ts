import { css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const introWrapperStyle = (theme: Theme) => css`
  width: 100%;
  margin-top: 0px;
  padding: 0px;
  min-height: clamp(620px, 30vw, 30vw);
  border-radius: 0px;
  height: calc(100vh - var(--gnb-height));

  ${respondMore(theme.breakpoint.sm)} {
    border-radius: 24px;
    margin-top: 8px;
    padding: 0px 20px 20px;
    border-radius: 24px;
    height: calc(100vh - var(--gnb-height) - 8px);
  }

  ${respondMore(theme.breakpoint.lg)} {
    border-radius: 28px;
    margin-top: 12px;
    padding: 0px 48px 48px;
    height: calc(100vh - var(--gnb-height) - 12px);
  }

  ${respondMore(theme.breakpoint.xl)} {
    border-radius: 32px;
  }
`;

export const introBackgroundStyle = (theme: Theme) => css`
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  box-shadow: inset 240px 240px 240px rgb(15 67 206 / 80%);

  & > video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    z-index: -1;
    inset: 0;
  }

  ${respondTo(theme.breakpoint.sm)} {
    padding-bottom: 80px;
  }
`;

export const titleTextStyle = (theme: Theme) => css`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  text-shadow: 4px 4px 24px rgba(0, 0, 0, 0.12);
  font-family: var(--font-family-wanted-sans);
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 100.7%;
  letter-spacing: -0.72px;
  text-transform: uppercase;
  color: ${theme.semantic.static.white};

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 72px;
    line-height: 100.7%;
    letter-spacing: -0.96px;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 96px;
    line-height: 100.7%;
    letter-spacing: -1.08px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    font-size: 116px;
    line-height: 100.7%;
    letter-spacing: -1.74px;
  }
`;

export const descriptionTextStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  text-align: center;
  color: ${theme.semantic.static.white};
  font-weight: 500;
  text-shadow: 4px 4px 24px rgba(0, 0, 0, 0.16);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 142.9%;
  letter-spacing: -0.182px;

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 13px;
    line-height: 160%;
    letter-spacing: -0.182px;
    font-weight: 600;
  }

  ${respondMore(theme.breakpoint.md)} {
    font-size: 16px;
    line-height: 160%;
    letter-spacing: -0.224px;
  }
`;
