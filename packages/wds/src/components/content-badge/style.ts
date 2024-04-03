import { css } from '@emotion/react';

import { addOpacity, getColorByToken } from '../../utils/color';
import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { Theme } from '@emotion/react';
import type { ContentBadgeProps } from './types';

export const contentBadgeStyle =
  ({ xs, sm, md, lg, xl, ...props }: ContentBadgeProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 4px;
    border-radius: 4px;
    width: fit-content;

    ${contentBadgeColorVariant(props, theme)}
    ${getSizeStyle(props)}

	${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${getSizeStyle(params || {})}
      `,
    )}
  `;

const getSizeStyle = ({ size }: ContentBadgeProps) => {
  switch (size) {
    case 'medium':
      return css`
        gap: 4px;
        ${typographyStyle('label1_normal', 'bold')}
      `;
    case 'small':
      return css`
        gap: 3px;
        ${typographyStyle('caption1', 'bold')}
      `;
    case 'xsmall':
      return css`
        gap: 2px;
        ${typographyStyle('caption2', 'bold')}
      `;
  }
};

const contentBadgeColorVariant = (
  { variant, color, accentColor }: ContentBadgeProps,
  theme: Theme,
) => {
  const { font, background, border } = contentBadgeColorStyle(
    { color, accentColor },
    theme,
  );

  if (!font && !background && !border) {
    return;
  }

  switch (variant) {
    case 'filled':
      return css`
        background-color: ${background};
        color: ${font};
      `;
    case 'outlined':
      return css`
        background-color: ${theme.palette.background.normal.normal};
        color: ${font};
        box-shadow: inset 0 0 0 1px ${border};
      `;
  }
};

const contentBadgeColorStyle = (
  { color, accentColor }: ContentBadgeProps,
  theme: Theme,
) => {
  if (color === 'neutral') {
    return {
      font: theme.palette.label.alternative,
      background: theme.palette.fill.normal,
      border: theme.palette.line.normal.normal,
    };
  }

  return {
    font: getColorByToken(theme, accentColor!),
    background: addOpacity(
      getColorByToken(theme, accentColor!),
      theme.opacity[8],
    ),
    border: addOpacity(getColorByToken(theme, accentColor!), theme.opacity[43]),
  };
};
