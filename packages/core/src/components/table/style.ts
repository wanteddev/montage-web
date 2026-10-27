import { css } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const tableStyle = (theme: Theme) => css`
  --table-head-cell-padding-x: 20px;
  --table-head-cell-padding-y: 8px;
  --table-head-cell-min-height: 44px;

  --table-cell-padding-x: 20px;
  --table-cell-padding-y: 16px;
  --table-cell-min-height: 44px;

  --table-border-color: ${theme.semantic.line.neutral.secondaryOpaque};

  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--table-border-color);

  table {
    display: table;
    margin: 0;
    padding: 0;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
    width: 100%;
    position: relative;

    tfoot:has(tr) tr:last-child th,
    tfoot:has(tr) tr:last-child td {
      border-bottom: none;
    }

    :not(:has(tfoot tr)):has(tbody tr) tbody tr:last-child th,
    :not(:has(tfoot tr)):has(tbody tr) tbody tr:last-child td {
      border-bottom: none;
    }

    :not(:has(tfoot tr)):not(:has(tbody tr)) thead tr:last-child th,
    :not(:has(tfoot tr)):not(:has(tbody tr)) thead tr:last-child td {
      border-bottom: none;
    }
  }
`;

export const scrollAreaStyle = css`
  display: flex;
  flex-direction: column;
`;

export const tableHeadCellStyle = css`
  padding: var(--table-head-cell-padding-y, 8px) 0px
    var(--table-head-cell-padding-y, 8px) var(--table-head-cell-padding-x, 20px);
  height: var(--table-head-cell-min-height, 44px);
  vertical-align: middle;
  display: table-cell;
  border: none;
  border-bottom: 1px solid var(--table-border-color);
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const tableCellStyle = css`
  padding: var(--table-cell-padding-y, 16px) 0px
    var(--table-cell-padding-y, 16px) var(--table-cell-padding-x, 20px);
  vertical-align: middle;
  display: table-cell;
  border: none;
  height: var(--table-cell-min-height, 44px);
  border-bottom: 1px solid var(--table-border-color);
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const tableRowStyle = (interaction?: boolean) => (theme: Theme) => css`
  position: relative;
  display: table-row;
  margin: 0;
  padding: 0;
  border: none;

  td:last-child {
    padding-right: var(--table-head-cell-padding-x, 20px);
  }
  th:last-child {
    padding-right: var(--table-head-cell-padding-x, 20px);
  }

  ${interaction &&
  css`
    --table-row-interaction-color: ${theme.semantic.foreground.neutral.primary};
    --table-row-interaction-opacity: ${theme.opacity[0]};

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      outline-style: solid;
      outline-width: 2px;
      outline-offset: -2px;
    }

    // Safari < 27 doesn't treat tr as a containing block, so tr::after covers the whole table.
    // Draw the layer per cell instead.
    & > :where(td, th) {
      position: relative;
    }

    & > td::after,
    & > th::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-color: var(--table-row-interaction-color);
      opacity: var(--table-row-interaction-opacity);
      transition:
        background ease 0.2s,
        opacity ease 0.2s;
    }

    &:hover > td::after,
    &:hover > th::after {
      --table-row-interaction-opacity: ${theme.opacity[5]};
    }

    @media not (pointer: fine) {
      &:hover > td::after,
      &:hover > th::after {
        --table-row-interaction-opacity: ${theme.opacity[0]};
      }
    }

    &:active > td::after,
    &:active > th::after {
      --table-row-interaction-opacity: ${theme.opacity[12]};
    }
  `}
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
        ${theme.semantic.platform.ios.navigation}

        &::before {
          content: '';
          width: 100%;
          height: 100%;
          inset: 0;
          z-index: -1;
          position: absolute;
          background-color: ${theme.semantic.surface.neutral.tertiary};
        }
      `
    : css`
        background-color: ${theme.semantic.surface.neutral.tertiary};
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

export const paginationWrapperStyle = css`
  padding: var(--table-cell-padding-y, 16px) var(--table-cell-padding-x, 20px);
  border-top: 1px solid var(--table-border-color);
`;
