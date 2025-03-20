import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const mdxRootStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.normal};
  ${typographyStyle('body1', 'regular')}

  & > :not(:is([data-role="demo"])) {
    word-break: keep-all;
    overflow-wrap: break-word;

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
      ${typographyStyle('body1', 'bold')}
    }

    &:not(button) > a,
    :is(:not(button)) > a {
      text-decoration: underline;
      color: ${theme.semantic.primary.normal};
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-skip-ink: none;
      text-decoration-thickness: auto;
      text-underline-offset: auto;
      text-underline-position: from-font;
    }

    :is(img),
    img {
      max-width: 100%;
    }

    :is(h1),
    h1,
    :is(h2),
    h2,
    :is(h3),
    h3,
    :is(h4),
    h4,
    :is(h5),
    h5,
    :is(h6),
    h6 {
      scroll-margin-top: calc(var(--gnb-height) + 56px);
    }

    :is(p),
    p {
      margin-bottom: 16px;
    }

    :is(h1),
    h1 {
      margin-top: 32px;
      margin-bottom: 32px;
      padding-top: 32px;
      border-top: 1px solid ${theme.semantic.line.normal.normal};

      &:not(:not(:last-child) ~ *) {
        border: none;
        margin-top: 0;
        padding-top: 0px;
      }
    }

    :is(h2),
    h2 {
      margin-top: 32px;
      margin-bottom: 32px;
      padding-top: 32px;
      border-top: 1px solid ${theme.semantic.line.normal.normal};
    }

    :is(h3),
    h3 {
      margin-top: 8px;
      margin-bottom: 20px;
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
      margin-bottom: 20px;
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

      ol:not([class]),
      ul:not([class]),
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    :is(blockquote),
    blockquote {
      margin-bottom: 16px;
      border-left: 2px solid ${theme.semantic.label.alternative};
      padding-left: 16px;
      font-style: initial;

      :is(p),
      p {
        margin: 0;
      }
    }

    :is(table),
    table {
      margin-bottom: 16px;
      min-width: 100%;
      border-radius: 8px;
      overflow: auto;
      border-collapse: collapse;
      border-spacing: 0;
    }

    :is(th),
    th {
      box-shadow: inset 0 -1px ${theme.semantic.line.normal.normal};
      color: ${theme.semantic.label.strong};
      background-color: ${theme.semantic.background.elevated.alternative};
      padding: 12px 16px;
      text-align: left;
      ${typographyStyle('body1-reading', 'bold')}
    }
    :is(td),
    td {
      padding: 12px 16px;
      color: ${theme.semantic.label.normal};
      box-shadow: inset 0 -1px ${theme.semantic.line.normal.normal};
      text-align: left;
      ${typographyStyle('body1-reading', 'regular')}
    }

    :is(details),
    details {
      margin-bottom: 16px;

      summary {
        list-style: none;
        padding-left: 24px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAYAAABwrHhvAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGMSURBVHgB7ZY9T4NAGMefAxrSzowcmqajg4bEkGoIQ+fOrn4HZ+d+C1ddmRkalb4MjXO3ahkc6lpbcuUEq0lrylt7yHK/iXB34Xf/54AHgMPhcDickkFpE0zTxMslvYiuq1XR6Xa7M2BIooCuW0qlQjpbCxD0ZFmyWYmISYOahtvhA+t/bmNCglNVPfr0vLcpHIiQPIxqMQMKAL02jMuOZVkKHEBiAuEuzxCiOGFKLUyjhbGmNBr16WQymUNOBGAApdBcLMiNYVgtyMmhCWwSlis4UVWtifHxh+e9vmdZxFJgQ4SeZy0LkxLsYl2W1W1aWQoT+NEI0yBXhmG2oRyBX4K2ruu1EgXi+RcBSgNnNBrtPIwSFAoKH0rt4bDnxM0oTAAh4UWWhYe0n1YRAjNRpHeu+zjOMpmhwDruweDZybOKiUDUI/j+/D7uoBUmgBAaC0Jgu66bKe49BGjMjtZx9/tPueLOLSDLyPV9uvUtj95pQpb2PnHvIrUpjfpCSVp9SxTRlHI4HA6HUzpfJfKPmv7kZGAAAAAASUVORK5CYII=')
          no-repeat;
        background-size: 16px 24px;
        ${typographyStyle('body1', 'regular')}
      }

      &[open] {
        summary {
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAYAAABwrHhvAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF5SURBVHgB7dW/T8JAFAfwd3fl58xWYHB262hCHPzH3Bz8G5xlcOniwkAqhW4sLizGWJIuZa0BjuI1LtXctXe0kZi8T0JC7r2m1+u3dwAIIYQQOjOiKoxGo8F2e7yi9NiFCtKUJJ0Om0yn0xh0J+A4171Gg99BjZpNeut5Xvh7nMqaLetwAzXLVlM2TuHMpBPgnE2gZlkOZONMNhhF74lt97uEkAuoASEwn808X1ZTvgLOt664NIHq4lbLclVFpipEUbTv94d78fcSKiFj8fQrVbUwhEEwm4jXsILTxUHw4hc1lH4FlKYunKjdtu7LelhZQxiGG9se9kSQBmCgKHh5WvsA55+PhoEsDF5e6QpkTgikK57+VadReyfMAilWYaPRGn/36jHaihlLH8p6CDmMwYDRBHzfXxFCl6C8OcwXi8USDBgfRrsdHcsDSRLd4OVphTAvEueEIpBPusGrNIHMev3x9vOwOrpB4D/DX3Mcp5v9ACGEEPrPvgB2D35PtkcsWwAAAABJRU5ErkJggg==')
            no-repeat;
          background-size: 16px 24px;
          margin-bottom: 16px;
        }
      }
    }
  }
`;
