import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';
import { addOpacity } from '../../utils';

import type { ChipFilterProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const actionStyle =
  ({ xs, sm, md, lg, xl, ...props }: ChipFilterProps) =>
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
    flex-shrink: 0;

    &:disabled {
      pointer-events: none;
      cursor: initial;
    }

    ${actionVariantStyle(props, theme)}
    ${actionSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${actionSizeStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const actionSizeStyle = ({ size }: ChipFilterProps = {}) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: 6px;
        padding: 4px 6px 4px 8px;
        gap: 2px;

        svg {
          font-size: 12px;
        }
        span {
          ${typographyStyle('caption1', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('caption1', 'bold')}
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 6px 8px 6px 10px;
        gap: 4px;

        svg {
          font-size: 16px;
        }
        span {
          ${typographyStyle('label1_normal', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('label1_normal', 'bold')}
        }
      `;
    case 'normal':
      return css`
        border-radius: 10px;
        padding: 7px 8px 7px 12px;
        gap: 5px;

        svg {
          font-size: 16px;
        }

        span {
          ${typographyStyle('body2_normal', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
    case 'large':
      return css`
        border-radius: 10px;
        padding: 9px 8px 9px 12px;
        gap: 5px;

        svg {
          font-size: 16px;
        }
        span {
          ${typographyStyle('body2_normal', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
  }
};

const actionVariantStyle = (
  { variant }: ChipFilterProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'filled':
      return css`
        color: ${theme.palette.label.normal};
        background-color: ${theme.palette.fill.alternative};
        box-shadow: none;

        &[aria-pressed='true'] {
          color: ${theme.palette.inverse.label};
          background-color: ${theme.palette.inverse.background};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.interaction.disable};
          box-shadow: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.palette.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

        &[aria-pressed='true'] {
          background-color: ${addOpacity(
            theme.palette.primary.normal,
            theme.opacity[5],
          )};
          box-shadow: inset 0 0 0 1px
            ${addOpacity(theme.palette.primary.normal, theme.opacity[43])};
          color: ${theme.palette.primary.normal};

          svg {
            color: ${theme.palette.label.normal};
          }
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        }
      `;
  }
};
