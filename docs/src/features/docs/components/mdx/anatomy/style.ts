import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const anatomyWrapperStyle = css`
  margin-bottom: 120px;

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

export const anatomyItemStyle = css`
  padding: 4px 0px;
  width: 320px;
  max-width: 100%;
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
  background: ${theme.semantic.fill.normal};
  color: ${theme.semantic.label.normal};
`;

export const anatomyThumbnailStyle = (theme: Theme) => css`
  width: 100%;
  position: relative;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: 24px;
    border: 1px solid ${theme.semantic.line.normal.alternative};
  }

  img {
    position: relative;
    border-radius: 24px;
  }
`;
