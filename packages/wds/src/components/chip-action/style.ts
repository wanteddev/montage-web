import { css, getColorByToken } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { addOpacity } from '../../utils';

import type { ChipActionProps } from './types';
import type { Theme, ThemeColorsToken } from '@wanteddev/wds-engine';

type ActionStyleProps = ChipActionProps & {
  overrideColor?: ThemeColorsToken;
};

export const actionStyle =
  ({ xs, sm, md, lg, xl, overrideColor, ...props }: ActionStyleProps) =>
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
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: initial;
    }

    ${actionVariantStyle({ ...props, overrideColor }, theme)}
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

const actionSizeStyle = ({ size }: ChipActionProps = {}) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: 6px;
        padding: 4px 7px;
        gap: 2px;

        svg {
          font-size: 12px;
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
          padding: 0 1px;
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 6px 8px;
        gap: 2px;

        svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'medium':
      return css`
        border-radius: 8px;
        padding: 7px 11px;
        gap: 3px;

        svg {
          font-size: 14px;
        }

        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'large':
      return css`
        border-radius: 10px;
        padding: 9px 12px;
        gap: 3px;

        svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
        }
      `;
  }
};

const actionVariantStyle = (
  { variant, active, overrideColor }: ActionStyleProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.label.normal};
        background-color: ${theme.semantic.fill.alternative};
        box-shadow: none;

        ${active &&
        css`
          color: ${theme.semantic.inverse.label};
          background-color: ${theme.semantic.inverse.background};
        `}

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: ${theme.semantic.interaction.disable};
          box-shadow: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

        ${active &&
        css`
          background-color: ${addOpacity(
            theme.semantic.primary.normal,
            theme.opacity[5],
          )};
          box-shadow: inset 0 0 0 1px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])};
          color: ${theme.semantic.primary.normal};
        `}

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        }
      `;
  }
};
