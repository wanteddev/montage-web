import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';
import type { SelectSingleProps } from './types';

export const selectBoxButtonStyle =
  ({ disabled }: Pick<SelectSingleProps, 'disabled'>) =>
  (theme: Theme) => css`
    min-width: max-content;
    max-width: max-content;

    ${(() => {
      if (disabled) {
        return css`
          pointer-events: none;
          user-select: none;

          &,
          input {
            cursor: not-allowed;
          }
          [data-role='select-button-arrow'] > svg {
            color: ${theme.palette.label.disable};
          }
        `;
      }
      return css`
        &,
        input {
          cursor: pointer;
        }
      `;
    })()}

    &[aria-expanded='true'] {
      [data-role='select-button-arrow'] > svg {
        transform: rotate(180deg);
      }
      [data-role='text-input-invalid'] {
        display: none;
      }
    }
    &[aria-expanded='false'] {
      [data-role='text-input-invalid'] {
        display: flex;
      }
    }
  `;

export const selectTextInputStyle = css`
  &,
  input {
    cursor: pointer;
  }

  [data-role='text-input-reset'] {
    display: none;
  }
`;

export const selectTextInputArrowStyle = (theme: Theme) => css`
  font-size: 18px;
  color: ${theme.palette.label.alternative};
`;

export const selectMenuContentStyle = ({
  width,
}: Pick<SelectSingleProps, 'width'>) => css`
  width: ${width};
`;
