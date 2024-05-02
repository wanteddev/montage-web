import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { ChipMultiSelectProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const multiSelectStyle =
  ({ xs, sm, md, lg, xl, ...props }: ChipMultiSelectProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    cursor: pointer;
    width: fit-content;
    color: ${theme.palette.label.alternative};
    background-color: transparent;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
    transition:
      box-shadow 0.15s ease,
      color 0.15s ease;

    svg {
      color: ${theme.palette.label.assistive};
      pointer-events: none;
    }

    &[aria-checked='true'] {
      box-shadow: inset 0 0 0 1px ${theme.palette.primary.normal};
      color: ${theme.palette.primary.normal};
      svg {
        color: ${theme.palette.primary.normal};
      }
    }

    &[aria-disabled='true'] {
      box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.alternative};
      color: ${theme.palette.label.disable};
      pointer-events: none;
      cursor: not-allowed;

      svg {
        color: ${theme.palette.label.disable};
      }
    }

    &[aria-invalid='true'] {
      box-shadow: inset 0 0 0 1px ${theme.palette.status.negative};
    }

    ${multiSelectSizeStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${multiSelectSizeStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const multiSelectSizeStyle = ({
  size,
}: Pick<ChipMultiSelectProps, 'size'> = {}) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 8px;
        padding: 9px 16px;
        gap: 5px;

        & > svg {
          font-size: 16px;
        }

        & > span {
          ${typographyStyle('body2_normal', 'medium')}
        }
      `;
    case 'medium':
      return css`
        border-radius: 6px;
        padding: 6px 12px;
        gap: 4px;

        & > svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1_normal', 'bold')}
        }
      `;
  }
};
