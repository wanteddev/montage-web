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
  padding: 4px 0px;
  width: 46%;
  min-width: 100px;
  max-width: 500px;
`;

export const anatomyItemPinStyle = (theme: Theme) => css`
  width: 24px;
  height: 24px;
  display: flex;
  text-align: center;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${theme.semantic.fill.strong};
  color: ${theme.semantic.label.normal};
`;

export const anatomyThumbnailStyle = css`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  img {
    object-fit: contain;
    border-radius: 20px;
    overflow: hidden;
  }
`;
