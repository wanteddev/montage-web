import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = (theme: Theme) => css`
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${theme.semantic.label.neutral};
  ${typographyStyle('body2-reading', 'regular')}

  p {
    max-width: 640px;
  }

  img {
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.semantic.label.normal};
  }

  h2 {
    margin-bottom: 24px;

    &:first-of-type {
      margin-top: 32px;
    }
  }

  h3 {
    margin-bottom: 16px;
  }

  figure {
    border-radius: 24px;

    &::after {
      border: 1px solid ${theme.semantic.line.normal.alternative};
    }
  }

  ol,
  ul {
    list-style-type: disc;
    padding-left: 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    li::marker {
      font-size: 0.8em;
    }

    ol,
    ul,
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  hr {
    margin: 72px 0px;
  }
`;
