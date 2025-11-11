import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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
  border-radius: 24px;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: inherit;
    border: 1px solid ${theme.semantic.line.normal.alternative};
  }

  img {
    position: relative;
    border-radius: inherit;
  }
`;
