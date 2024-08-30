import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';
import type { SelectSingleProps } from './types';

export const textInputButtonStyle =
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
          [data-icon='select-button-arrow'] > svg {
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
      [data-icon='select-button-arrow'] > svg {
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

export const textInputStyle = css`
  &,
  input {
    cursor: pointer;
  }

  [data-role='text-input-reset'] {
    display: none;
  }
`;

export const textInputButtonChevronStyle = (theme: Theme) => css`
  font-size: 18px;
  color: ${theme.palette.label.alternative};
`;

export const selectStyle = (width: SelectSingleProps['width']) => css`
  width: ${width};
`;
