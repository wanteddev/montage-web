import { css } from '@wanteddev/wds-engine';

import { activeInteractionStyle } from '../with-interaction/style';

import type { Theme } from '@wanteddev/wds-engine';

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

    [wds-component='avatar'] {
      &::before {
        content: '';
        position: absolute;
        border-radius: inherit;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 16px);
        height: calc(100% + 16px);
        outline-width: 2px;
        outline-style: solid;
        outline-color: Highlight;
        outline-color: -webkit-focus-ring-color;
      }
    }
  }

  &[aria-expanded='true'] {
    [wds-component='with-interaction'] {
      ${activeInteractionStyle(theme)}
    }
  }
`;
