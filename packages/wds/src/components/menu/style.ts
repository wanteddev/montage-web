import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  filter: none;
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
  width: 320px;
  min-width: 140px;

  > div {
    width: 100%;
  }
`;

export const menuScrollAreaStyle = (theme: Theme) => css`
  border-radius: inherit;
  border: 1px solid ${theme.palette.line.solid.neutral};
  background-color: ${theme.palette.background.elevated.normal};
`;

export const listInMenuStyle = css`
  max-height: 400px;
`;

export const menuGroupTitleStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 12px 20px 8px;
  z-index: 10;
  margin: auto auto auto 0;
  background-color: ${theme.palette.background.elevated.normal};
`;

export const menuGroupStyle = css`
  width: 100%;
`;

export const menuItemStyle = (theme: Theme) => css`
  width: calc(100% - 40px);

  &:focus-visible {
    outline: none;

    > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[5]};
    }
  }
`;

export const menuBottomStyle = (theme: Theme) => css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  padding: 12px;
  max-height: 56px;
  background-color: ${theme.palette.background.elevated.normal};
  z-index: 10;
  border: 1px solid ${theme.palette.line.solid.alternative};
`;

export const menuBottomContentStyle = (theme: Theme) => css`
  max-height: 32px;
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;

  & > svg {
    color: ${theme.palette.label.alternative};
  }

  [wds-component='chip-action'] {
    > svg {
      color: ${theme.palette.label.normal};
    }

    &[data-size='normal'] {
      > svg {
        font-size: 16px;
      }
    }
  }
`;
