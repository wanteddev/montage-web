import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const tableStyle = (theme: Theme) => css`
  --wds-table-head-cell-padding-x: 20px;
  --wds-table-head-cell-padding-y: 8px;
  --wds-table-head-cell-min-height: 44px;

  --wds-table-cell-padding-x: 20px;
  --wds-table-cell-padding-y: 16px;
  --wds-table-cell-min-height: 44px;

  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${theme.palette.line.normal.neutral};

  table {
    display: table;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
    border: none;
    width: 100%;
    position: relative;

    & > *:last-child:is(tr),
    & > *:last-child > tr:last-of-type {
      &::after {
        display: none;
      }
    }
  }
`;

export const scrollAreaStyle = css`
  display: flex;
  flex-direction: column;
`;

export const tableHeadCellStyle = css`
  padding: var(--wds-table-head-cell-padding-y, 8px) 0px
    var(--wds-table-head-cell-padding-y, 8px)
    var(--wds-table-head-cell-padding-x, 20px);
  height: var(--wds-table-head-cell-min-height, 44px);
  vertical-align: middle;
  display: table-cell;
  border: none;
`;

export const tableCellStyle = css`
  padding: var(--wds-table-cell-padding-y, 16px) 0px
    var(--wds-table-cell-padding-y, 16px) var(--wds-table-cell-padding-x, 20px);
  vertical-align: middle;
  display: table-cell;
  border: none;
  height: var(--wds-table-cell-min-height, 44px);
`;

export const tableRowStyle = (theme: Theme) => css`
  position: relative;
  display: table-row;
  margin: 0;
  padding: 0;
  border: none;

  &::after {
    position: absolute;
    content: '';
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 1px;
    width: 100%;
    background-color: ${theme.palette.line.normal.neutral};
  }
`;

export const tableHeadStyle = (isSticky?: boolean) => (theme: Theme) => css`
  margin: 0;
  padding: 0;
  display: table-header-group;
  position: sticky;
  top: 0px;
  z-index: 1;
  border: none;
  will-change: backdrop-filter;

  ${isSticky
    ? css`
        ${theme.platform.ios.navigation}

        &::after {
          content: '';
          width: 100%;
          height: 100%;
          inset: 0;
          z-index: -1;
          position: absolute;
          background-color: ${theme.palette.fill.alternative};
        }
      `
    : css`
        background-color: ${theme.palette.fill.alternative};
      `}
`;

export const tableBodyStyle = css`
  margin: 0;
  padding: 0;
  display: table-row-group;
  border: none;
`;

export const tableFootStyle = css`
  margin: 0;
  padding: 0;
  display: table-row-group;
  border: none;
`;

export const paginationWrapperStyle = (theme: Theme) => css`
  padding: var(--wds-table-cell-padding-y, 16px)
    var(--wds-table-cell-padding-x, 20px);
  border-top: 1px solid ${theme.palette.line.normal.neutral};
`;
