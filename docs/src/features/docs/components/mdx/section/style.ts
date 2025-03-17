import { css, getColorByToken } from '@wanteddev/wds';

import type { Theme, ThemeColorsToken } from '@wanteddev/wds';

export const sectionLayoutStyle = css`
  && {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 16px;
      padding-top: 0px;
      border: none;
    }
  }

  margin-bottom: 16px;
`;

export const sectionFigureStyle = css`
  && {
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const sectionFigureThumbnailStyle =
  (color: ThemeColorsToken | undefined) => (theme: Theme) => css`
    width: 100%;
    margin-bottom: 24px;
    border-radius: 16px;

    ${Boolean(color) &&
    css`
      position: relative;
      overflow: hidden;

      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 8px;
        bottom: 0.5px;
        left: 0px;
        background: ${getColorByToken(theme, color!)};
      }
    `}

    img {
      object-fit: contain;
    }
  `;
