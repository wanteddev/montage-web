import { css } from '@emotion/react';

import {
  activeInteractionStyle,
  focusInteractionStyle,
  focusVisibleInteractionStyle,
  hoverInteractionStyle,
} from '../with-interaction/style';

import type { Theme } from '@emotion/react';

export const avatarButtonStyle = (theme: Theme) => css`
  border: none;
  box-shadow: none;
  background-color: transparent;
  width: fit-content;
  height: fit-content;
  position: relative;
  display: block;

  &:focus-visible {
    outline: none;

    & > [wds-component='avatar'] {
      outline: solid 2px Highlight;
      outline: solid 2px -webkit-focus-ring-color;
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
