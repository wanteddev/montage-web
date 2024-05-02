import { css } from '@wanteddev/wds-engine';

import {
  activeInteractionStyle,
  focusInteractionStyle,
  focusVisibleInteractionStyle,
  hoverInteractionStyle,
} from '../with-interaction/style';

import type { Theme } from '@wanteddev/wds-engine';

export const avatarButtonStyle = (theme: Theme) => css`
  border: none;
  box-shadow: none;
  background-color: transparent;
  width: fit-content;
  height: fit-content;
  position: relative;
  display: block;

  &:focus-visible,
  &[aria-expanded='true'] {
    outline: none;

    & > [wds-component='avatar'] {
      outline-style: solid;
      outline-width: 1.5px;
      outline-offset: 2.5px;
      outline-color: ${theme.palette.primary.normal};
    }
  }

  &:hover [wds-component='with-interaction'] {
    ${hoverInteractionStyle(theme)}
  }
  &:focus [wds-component='with-interaction'] {
    ${focusInteractionStyle(theme)}
  }
  &:active [wds-component='with-interaction'] {
    ${activeInteractionStyle(theme)}
  }
  &:focus-visible [wds-component='with-interaction'] {
    ${focusVisibleInteractionStyle(theme)}
  }
`;

export const pushBadgeStyle = css`
  position: absolute;
  right: -10px;
  top: -10px;
`;
