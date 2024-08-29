import { css } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';
import {
  activeInteractionStyle,
  focusInteractionStyle,
  focusVisibleInteractionStyle,
  hoverInteractionStyle,
} from '../with-interaction/style';

import type { Theme } from '@wanteddev/wds-engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  filter: none;
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
`;

export const menuScrollAreaStyle = (theme: Theme) => css`
  width: 320px;
  min-width: 140px;
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

export const menuItemStyle = css`
  width: calc(100% - 40px);
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

  [wds-component='icon-button'][data-variant='normal'] {
    width: 32px;
    height: 32px;
    padding: 7px;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

    &:disabled,
    &[aria-disabled='true'] {
      background-color: ${theme.palette.background.normal.normal};
      box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
    }

    [wds-component='with-interaction'] {
      width: 100%;
      height: 100%;
    }
  }

  button[data-size='medium'] {
    border-radius: 8px;
    padding: 7px 14px;
    gap: 4px;

    & > svg {
      font-size: 16px;
    }
    & > span {
      ${typographyStyle('label2', 'bold')}
    }
  }

  [wds-component='text-button'][data-variant='assistive'][data-size='medium'] {
    border-radius: 6px;
    padding: 4px 0px;
    color: ${theme.palette.label.alternative};

    & > span {
      ${typographyStyle('label1_normal', 'bold')}
    }

    &:hover > [wds-component='with-interaction'] {
      ${hoverInteractionStyle(theme, 'light')}
    }
    &:focus > [wds-component='with-interaction'] {
      ${focusInteractionStyle(theme, 'light')}
    }
    &:focus-visible > [wds-component='with-interaction'] {
      ${focusVisibleInteractionStyle(theme)}
    }
    &:active > [wds-component='with-interaction'] {
      ${activeInteractionStyle(theme, 'light')}
    }

    [wds-component='with-interaction'] {
      width: calc(100% + 12px);
      background-color: ${theme.palette.label.normal};
    }
  }
`;
