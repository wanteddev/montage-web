import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

const NOT_IN_PREVIEW = `:not([data-role='demo-viewport'] *)`;

export const wrapperStyle = (theme: Theme) => css`
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${theme.semantic.label.neutral};
  ${typographyStyle('body2-reading', 'medium')}

  strong${NOT_IN_PREVIEW} {
    ${typographyStyle('body2-reading', 'bold')}
  }

  img${NOT_IN_PREVIEW} {
    max-width: 100%;
  }

  h1${NOT_IN_PREVIEW},
    h2${NOT_IN_PREVIEW},
    h3${NOT_IN_PREVIEW},
    h4${NOT_IN_PREVIEW},
    h5${NOT_IN_PREVIEW},
    h6${NOT_IN_PREVIEW} {
    color: ${theme.semantic.label.normal};
  }

  h2${NOT_IN_PREVIEW} {
    margin-bottom: 24px;

    &:first-of-type {
      margin-top: 32px;
    }
  }

  h3${NOT_IN_PREVIEW} {
    margin-bottom: 16px;
  }

  figure${NOT_IN_PREVIEW} {
    width: 100%;
    border-radius: 24px;

    &::after {
      border: 1px solid ${theme.semantic.line.solid.neutral};
    }
  }

  ol${NOT_IN_PREVIEW}, ul${NOT_IN_PREVIEW} {
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

  hr${NOT_IN_PREVIEW} {
    margin: 64px 0px;
  }
`;
