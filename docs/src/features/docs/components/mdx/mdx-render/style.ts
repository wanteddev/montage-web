import { addOpacity, css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const mdxRootStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.neutral};
  ${typographyStyle('body2-reading', 'medium')}

  & > :not(:is([data-role="demo"])):not(:is([data-role="hierarchy"])):not(:is([data-role="variants"])) {
    word-break: keep-all;
    overflow-wrap: break-word;

    [data-role='property-type'] {
      font-family: inherit !important;
      ${typographyStyle('label2', 'medium')}
      color: ${theme.semantic.accent.background.redOrange};
      background-color: transparent;
    }

    :is(code),
    code,
    :is(.npm__react-simple-code-editor__textarea),
    .npm__react-simple-code-editor__textarea,
    :is(pre),
    pre {
      font-family: 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace,
        'DejaVu Sans Mono', 'Roboto Mono' !important;
    }

    :is(strong),
    strong {
      ${typographyStyle('body2-reading', 'bold')}
    }

    :is(img),
    img {
      max-width: 100%;
    }

    :is(h1),
    h1,
    :is(h2),
    h2 {
      color: ${theme.semantic.label.normal};
      scroll-margin-top: calc(var(--gnb-height) + 56px);
    }

    :is(h3),
    h3,
    :is(h4),
    h4,
    :is(h5),
    h5,
    :is(h6),
    h6 {
      color: ${theme.semantic.label.normal};
      scroll-margin-top: calc(var(--gnb-height) + 64px);
    }

    :is(p),
    p {
      margin-bottom: 16px;
    }

    :is(h1),
    h1 {
      margin-top: 32px;
      margin-bottom: 24px;
      padding-top: 32px;
      border-top: 1px solid ${theme.semantic.line.normal.neutral};
    }

    :is(h2),
    h2 {
      margin-top: 32px;
      margin-bottom: 32px;
      padding-top: 32px;
      border-top: 1px solid ${theme.semantic.line.normal.neutral};

      &:not(:not(:last-child) ~ *) {
        border: none;
        margin-top: 0;
        padding-top: 0px;
      }
    }

    :is(h3),
    h3 {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    :is(h4),
    h4 {
      margin-top: 8px;
      margin-bottom: 20px;
    }

    :is(h5),
    h5 {
      margin-top: 8px;
      margin-bottom: 16px;
    }

    :is(h6),
    h6 {
      margin-top: 8px;
      margin-bottom: 16px;
    }

    :is(ol),
    ol:not([class]),
    :is(ul:not([class])),
    ul:not([class]) {
      list-style-type: disc;
      padding-left: 24px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      li::marker {
        font-size: 0.8em;
      }

      li {
        [data-role='table'] {
          margin-bottom: 16px;
        }

        p + [data-role='table'],
        strong + [data-role='table'],
        p + details {
          margin-top: 16px;
        }

        p + [data-role='pre'],
        strong + [data-role='pre'] {
          margin-top: 16px;
          margin-bottom: 16px;
        }

        p + p {
          margin-bottom: 16px;
        }

        p + blockquote {
          margin-top: 16px;
        }
      }

      ol:not([class]),
      ul:not([class]),
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    :is(hr),
    hr {
      margin: 16px 0px;
      border: none;
      border-top: 1px solid ${theme.semantic.line.normal.neutral};
    }

    :is(blockquote),
    blockquote {
      margin-bottom: 16px;
      border-left: 4px solid
        ${addOpacity(theme.semantic.primary.normal, theme.opacity[61])};
      padding: 8px 0px 8px 12px;
      font-style: initial;
      color: ${theme.semantic.label.neutral};
      background-color: ${addOpacity(
        theme.semantic.primary.normal,
        theme.opacity[5],
      )};
      border-radius: 4px;
      position: relative;

      :is(p),
      p {
        margin: 0 !important;
      }

      p + p {
        margin-top: 16px !important;
      }
    }

    :is(details),
    details {
      margin-bottom: 16px;
      padding-left: 16px;

      summary {
        margin-left: -16px;
        ${typographyStyle('body2-reading', 'medium')}
      }

      &[open] {
        summary {
          margin-bottom: 16px;
        }
      }
    }

    :last-child {
      margin-bottom: 0px !important;
    }
  }
`;
