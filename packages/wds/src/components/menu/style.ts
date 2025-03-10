import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  width: 320px;
  filter: none;
  box-shadow: 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
`;

export const menuScrollAreaStyle = (theme: Theme) => css`
  width: 100%;
  min-width: 140px;
  max-height: 400px;
  height: auto;
  border-radius: inherit;
  border: 1px solid ${theme.palette.line.solid.neutral};
  background-color: ${theme.palette.background.elevated.normal};

  [data-radix-scroll-area-content] {
    width: 100%;
    min-width: initial !important;
  }
`;

export const menuGroupTitleStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 4px 20px;
  z-index: 10;
  margin: auto auto auto 0;
  background-color: ${theme.palette.background.elevated.normal};
`;

export const menuGroupStyle = css`
  width: 100%;
`;

export const menuListStyle = css`
  padding: 8px 0;
`;

export const menuItemStyle = (theme: Theme) => css`
  width: calc(100% - 40px);

  &:hover {
    > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[5]};
    }
  }

  &:focus-visible {
    outline: none;

    > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[5]};
    }
  }

  [data-role='menu-item-active-icon-check'] {
    color: ${theme.palette.primary.normal};
  }
`;

export const menuBottomStyle = (theme: Theme) => css`
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 56px;
  padding: 0 12px;
  max-height: 56px;
  background-color: ${theme.palette.background.elevated.normal};
  z-index: 10;
  border-top: 1px solid ${theme.palette.line.solid.alternative};
`;

export const menuBottomContentStyle = css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
`;
