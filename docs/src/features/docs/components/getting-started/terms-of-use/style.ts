import { css, respondTo, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const linkStyle = css`
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  ${typographyStyle('body2-reading', 'bold')}
`;

export const listStyle = (isLast?: boolean) => css`
  && {
    margin: 0px 0px ${isLast ? '0px' : '28px'};
  }
`;

export const textStyle = (theme: Theme) => css`
  && {
    max-width: unset;
    white-space: pre-line;

    ${respondTo(theme.breakpoint.sm)} {
      white-space: initial;
    }
  }
`;
