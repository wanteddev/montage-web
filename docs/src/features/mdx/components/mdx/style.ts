import { css } from '@emotion/react';
import { typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const mdxRootStyle = (theme: Theme) => css`
  width: 100%;
  color: ${theme.palette.label.normal};
  ${typographyStyle('body1_reading', 'regular')}

  strong {
    ${typographyStyle('body1_reading', 'bold')}
  }

  p > a {
    text-decoration: underline;
    color: ${theme.palette.primary.normal};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    a {
      scroll-margin-top: var(--header-height);
    }
    margin-top: 24px;
    margin-bottom: 16px;
    padding-bottom: 2px;
    border-bottom: 1px solid ${theme.palette.line.normal.normal};
  }

  & > ol,
  & > ul {
    list-style-type: disc;
    padding-left: 24px;

    li::marker {
      font-size: 0.8em;
    }
    margin-top: 24px;
    margin-bottom: 24px;

    ul,
    ol,
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  blockquote {
    margin-top: 24px;
    border-left: 4px solid ${theme.palette.line.normal.normal};
    padding-left: 12px;
    font-style: italic;

    & > p {
      margin: 0;
    }
  }

  table {
    margin: 20px 0px 30px 0px;
    min-width: 100%;
    border-radius: 8px;
    overflow: auto;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    box-shadow: inset 0 -1px ${theme.palette.line.normal.normal};
    color: ${theme.palette.label.strong};
    background-color: ${theme.palette.background.elevated.alternative};
    padding: 12px 16px;
    text-align: left;
    ${typographyStyle('body1_reading', 'bold')}
  }
  td {
    padding: 12px 16px;
    color: ${theme.palette.label.normal};
    box-shadow: inset 0 -1px ${theme.palette.line.normal.normal};
    text-align: left;
    ${typographyStyle('body1_reading', 'regular')}
  }
`;
