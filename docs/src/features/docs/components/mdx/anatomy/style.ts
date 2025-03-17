import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const anatomyWrapperStyle = css`
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
`;

export const anatomyStyle = css`
  margin-bottom: 16px;
  flex: 1 0 auto;
`;

export const anatomyItemStyle = css`
  padding: 8px 0px;
  width: 46%;
  min-width: 100px;
  max-width: 500px;
`;

export const anatomyItemPinStyle = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  display: flex;
  text-align: center;
  padding: 4px 0px;
  border-radius: 8px;
  justify-content: center;
  flex-shrink: 0;
  background: ${theme.semantic.inverse.background};
  color: ${theme.semantic.inverse.label};
`;

export const anatomyThumbnailStyle = css`
  width: 100%;
  border-radius: 16px;

  img {
    object-fit: contain;
  }
`;
