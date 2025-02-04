import { css, getColorByToken } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils/color';
import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { Theme } from '@wanteddev/wds-engine';
import type { ContentBadgeProps } from './types';

export const contentBadgeStyle =
  ({ xs, sm, md, lg, xl, ...props }: ContentBadgeProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;

    ${contentBadgeColorVariant(props, theme)}
    ${getSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${getSizeStyle(params || {})}
        ${params?.sx}
      `,
    )}
  `;

const getSizeStyle = ({ size }: ContentBadgeProps) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 8px;
        padding: 7px 8px;
        gap: 4px;
        ${typographyStyle('label2', 'medium')}
      `;
    case 'medium':
      return css`
        border-radius: 6px;
        padding: 4px 6px;
        gap: 3px;
        ${typographyStyle('caption1', 'medium')}
      `;
    case 'normal':
      return css`
        border-radius: 6px;
        padding: 3px 6px;
        gap: 2px;
        ${typographyStyle('caption2', 'medium')}
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
    case 'solid':
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
