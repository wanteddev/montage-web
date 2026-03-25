import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const iconGridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;

  ${respondTo(theme.breakpoint.sm)} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const iconItemWrapperStyle = css`
  height: 112px;
`;

export const iconItemStyle = css`
  padding: 24px 8px 0px;
  width: 100%;
  border-radius: 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 36px;
  max-height: 150px;
`;

export const iconNameStyle = css`
  max-width: 100%;
  overflow: hidden;
  display: -webkit-box;
  overflow: hidden;
  padding: 8px 8px 16px;
  width: 100%;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const iconDetailWrapperStyle = (theme: Theme) => css`
  width: 100%;
  height: 150px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: ${theme.semantic.background.normal.normal};
  border-radius: 12px;
  background-image: linear-gradient(
      45deg,
      ${theme.semantic.background.normal.alternative} 25%,
      transparent 25%
    ),
    linear-gradient(
      135deg,
      ${theme.semantic.background.normal.alternative} 25%,
      transparent 25%
    ),
    linear-gradient(
      45deg,
      transparent 75%,
      ${theme.semantic.background.normal.alternative} 75%
    ),
    linear-gradient(
      135deg,
      transparent 75%,
      ${theme.semantic.background.normal.alternative} 75%
    );
  background-position:
    0px 0px,
    10px 0px,
    10px -10px,
    0px 10px;
  background-size: 20px 20px;

  svg {
    width: 50%;
    height: 50%;
  }
`;

export const summaryWrapperStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: min-content;
  row-gap: 24px;

  ${respondTo(theme.breakpoint.sm)} {
    column-gap: 16px;
  }
`;
