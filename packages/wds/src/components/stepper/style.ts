import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const stepperWrapperStyle = css`
  width: 100%;
  height: fit-content;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const stepperChevronStyle = (theme: Theme) => css`
  font-size: 16px;
  color: ${theme.semantic.label.assistive};
`;

export const stepperCircleStyle =
  (isActive: boolean, completed: boolean) => (theme: Theme) => css`
    background-color: ${theme.semantic.fill.strong};
    color: ${theme.semantic.static.white};
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 9999px;
    font-size: 14px;

    [data-role='stepper-item-step'] {
      text-shadow: 0px 0px 12px
        ${addOpacity(theme.semantic.static.black, theme.opacity[12])};
    }

    ${(isActive || completed) &&
    css`
      background-color: ${theme.semantic.primary.normal};

      [data-role='stepper-item-step'] {
        text-shadow: none;
      }
    `}
  `;

export const stepperLabelStyle = css`
  padding: 1px 0px;
  height: fit-content;
`;
