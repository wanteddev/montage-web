import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const footerStyle = (theme: Theme) => css`
  width: 100%;
  padding: 40px 0 16px 0;
  background-color: ${theme.semantic.background.normal.normal};
  border-top: 1px solid ${theme.semantic.line.normal.neutral};

  ${respondTo(theme.breakpoint.sm)} {
    padding: 32px 0 16px 0;
  }
`;

export const logoWantedStyle = (theme: Theme) => css`
  width: 112px;
  height: 32px;

  ${respondTo(theme.breakpoint.sm)} {
    width: 98px;
    height: 28px;
  }
`;

export const lintWrapperStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.sm)} {
    margin-top: 24px;
    width: 100%;

    > span {
      &:nth-child(3) {
        order: 4;
      }
      &:nth-child(4) {
        order: 5;
      }

      [data-role='privacy-policy'] {
        order: 3;
      }
    }
  }
`;

export const summaryWrapperStyle = (theme: Theme) => css`
  margin-top: 28px;

  ${respondTo(theme.breakpoint.sm)} {
    margin-top: 23px;
    width: 100%;
    display: inline;
  }
`;

export const summaryStyle = (theme: Theme) => css`
  line-height: 138.5%;
  letter-spacing: 0.25px;

  span {
    word-wrap: break-word;
    word-break: keep-all;
    text-rendering: optimizeLegibility;
  }

  span + span::before {
    content: '|';
    margin: 0 8px;
    color: ${theme.semantic.line.normal.normal};
  }

  ${respondTo(theme.breakpoint.sm)} {
    display: inline;
    line-height: 133.4%;
    letter-spacing: 0.3px;

    span {
      word-break: break-all;
    }

    & + &::before {
      content: '|';
      margin: 0 8px;
      color: ${theme.semantic.line.normal.normal};
    }
  }
`;
export const askLinkWrapperStyle = (theme: Theme) => css`
  margin: 28px 0 32px 0;

  ${respondTo(theme.breakpoint.sm)} {
    margin: 24px 0 28px 0;
  }
`;

export const socialWrapperStyle = (theme: Theme) => css`
  margin-top: 12px;

  ${respondTo(theme.breakpoint.sm)} {
    margin-top: 20px;
  }
`;
