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
        padding: 4px 7px 4px 5px;
        gap: 1px;

        [data-role='chip-filter-wrapper'] {
          padding: 0 1px;
          gap: 3px;
        }

        span {
          ${typographyStyle('caption1', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('caption1', 'bold')}
        }

        svg {
          font-size: 12px;
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 6px 6px 6px 8px;
        gap: 1px;

        [data-role='chip-filter-wrapper'] {
          padding: 0 2px;
          gap: 4px;
        }

        span {
          ${typographyStyle('label1', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('label1', 'bold')}
        }

        svg {
          font-size: 16px;
        }
      `;
    case 'normal':
      return css`
        border-radius: 10px;
        padding: 7px 9px 7px 11px;
        gap: 2px;

        [data-role='chip-filter-wrapper'] {
          padding: 0 2px;
          gap: 4px;
        }

        span {
          ${typographyStyle('body2', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('body2', 'bold')}
        }

        svg {
          font-size: 16px;
        }
      `;
    case 'large':
      return css`
        border-radius: 10px;
        padding: 9px 10px 9px 12px;
        gap: 2px;

        [data-role='chip-filter-wrapper'] {
          padding: 0 2px;
          gap: 4px;
        }

        span {
          ${typographyStyle('body2', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('body2', 'bold')}
        }

        svg {
          font-size: 16px;
        }
      `;
  }
};

const actionVariantStyle = (
  { variant }: ChipFilterProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
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
