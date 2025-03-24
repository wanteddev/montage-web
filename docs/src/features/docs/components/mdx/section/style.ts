import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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
  (border?: boolean) => (theme: Theme) => css`
    width: 100%;
    margin-bottom: 24px;
    border-radius: 20px;
    ${border &&
    css`
      border: 1px solid ${theme.semantic.line.normal.normal};
    `}

    img {
      object-fit: contain;
    }
  `;

export const customizeStyle = (theme: Theme) => css`
  border-radius: 20px;
  border: 1px solid ${theme.semantic.line.normal.normal};
  padding: 20px;
`;
