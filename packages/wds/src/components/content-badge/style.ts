import { css } from '@emotion/react';

import { addOpacity, createResponsiveStyle, typographyStyle } from '@/utils';

import type { Theme } from '@emotion/react';
import type { ContentBadgeProps } from './types';

export const contentBadgeStyle =
  ({ xs, sm, md, lg, ...props }: ContentBadgeProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 4px;
    border-radius: 4px;

    ${contentBadgeColorVariant(props, theme)}
    ${getSizeStyle(props)}

	${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${contentBadgeColorVariant(params || {}, theme)}
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
  const { font, background, border } =
    contentBadgeColorStyle({ color, accentColor }, theme) || {};

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
        border: 1px solid ${border};
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

  switch (accentColor) {
    case 'lime':
      return {
        font: theme.palette.accent.lime,
        background: addOpacity(theme.palette.accent.lime, theme.opacity[8]),
        border: addOpacity(theme.palette.accent.lime, theme.opacity[43]),
      };
    case 'cyan':
      return {
        font: theme.palette.accent.cyan,
        background: addOpacity(theme.palette.accent.cyan, theme.opacity[8]),
        border: addOpacity(theme.palette.accent.cyan, theme.opacity[43]),
      };
    case 'lightBlue':
      return {
        font: theme.palette.accent.lightBlue,
        background: addOpacity(
          theme.palette.accent.lightBlue,
          theme.opacity[8],
        ),
        border: addOpacity(theme.palette.accent.lightBlue, theme.opacity[43]),
      };
    case 'violet':
      return {
        font: theme.palette.accent.violet,
        background: addOpacity(theme.palette.accent.violet, theme.opacity[8]),
        border: addOpacity(theme.palette.accent.violet, theme.opacity[43]),
      };
    case 'pink':
      return {
        font: theme.palette.accent.pink,
        background: addOpacity(theme.palette.accent.pink, theme.opacity[8]),
        border: addOpacity(theme.palette.accent.pink, theme.opacity[43]),
      };
    case 'redOrange':
      return {
        font: theme.palette.accent.redOrange,
        background: addOpacity(
          theme.palette.accent.redOrange,
          theme.opacity[8],
        ),
        border: addOpacity(theme.palette.accent.redOrange, theme.opacity[43]),
      };
    case 'cautionary':
      return {
        font: theme.palette.status.cautionary,
        background: addOpacity(
          theme.palette.status.cautionary,
          theme.opacity[8],
        ),
        border: addOpacity(theme.palette.status.cautionary, theme.opacity[43]),
      };
    case 'negative':
      return {
        font: theme.palette.status.negative,
        background: addOpacity(theme.palette.status.negative, theme.opacity[8]),
        border: addOpacity(theme.palette.status.negative, theme.opacity[43]),
      };
    case 'positive':
      return {
        font: theme.palette.status.positive,
        background: addOpacity(theme.palette.status.positive, theme.opacity[8]),
        border: addOpacity(theme.palette.status.positive, theme.opacity[43]),
      };
    case 'primary':
      return {
        font: theme.palette.primary.normal,
        background: addOpacity(theme.palette.primary.normal, theme.opacity[8]),
        border: addOpacity(theme.palette.primary.normal, theme.opacity[43]),
      };
  }
};
