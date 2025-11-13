import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { addOpacity } from '../../utils';

import type { FilterButtonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const filterButtonStyle =
  ({ xs, sm, md, lg, xl, ...props }: FilterButtonProps) =>
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

    ${filterButtonVariantStyle(props, theme)}
    ${filterButtonSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${filterButtonSizeStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const filterButtonSizeStyle = ({ size }: FilterButtonProps = {}) => {
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
    case 'medium':
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

const filterButtonVariantStyle = (
  { variant }: FilterButtonProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${theme.semantic.label.normal};
        background-color: ${theme.semantic.fill.alternative};
        box-shadow: none;

        &[aria-pressed='true'] {
          color: ${theme.semantic.inverse.label};
          background-color: ${theme.semantic.inverse.background};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: ${theme.semantic.interaction.disable};
          box-shadow: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.semantic.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

        &[aria-pressed='true'] {
          background-color: ${addOpacity(
            theme.semantic.primary.normal,
            theme.opacity[5],
          )};
          box-shadow: inset 0 0 0 1px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])};
          color: ${theme.semantic.primary.normal};

          svg {
            color: ${theme.semantic.label.normal};
          }
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        }
      `;
  }
};
