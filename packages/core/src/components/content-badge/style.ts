import { css, getColorByToken } from '@montage-ui/engine';

import { addOpacity } from '../../utils/color';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { typographyStyle } from '../../utils/typography';

import type { ContentBadgeProps } from './types';
import type { Theme, ThemeColorsToken } from '@montage-ui/engine';

export const contentBadgeStyle =
  ({ xs, sm, md, lg, xl, ...props }: ContentBadgeProps) =>
  (theme: Theme) =>
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: fit-content;
      flex-shrink: 0;

      svg {
        flex-shrink: 0;
      }

      [data-role='content-badge-text'] {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

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
    case 'medium':
      return css`
        border-radius: 10px;
        padding: 5px 8px;
        gap: 4px;
        ${typographyStyle('label2', 'medium')}

        svg {
          font-size: 14px;
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 4px 6px;
        gap: 4px;
        ${typographyStyle('caption1', 'medium')}

        svg {
          font-size: 14px;
        }
      `;
    case 'xsmall':
      return css`
        border-radius: 8px;
        padding: 3px 6px;
        gap: 2px;
        ${typographyStyle('caption2', 'medium')}

        svg {
          font-size: 12px;
        }
      `;
  }
};

const contentBadgeColorVariant = (
  {
    variant,
    color,
    accentColor,
    accentBackgroundColor,
    neutralColor,
  }: ContentBadgeProps,
  theme: Theme,
) => {
  const { font, background, border } = contentBadgeColorStyle(
    { color, accentColor, accentBackgroundColor, neutralColor },
    theme,
  );

  if (!font && !background && !border) {
    return;
  }

  switch (variant) {
    case 'solid':
      return css`
        background-color: ${background};
        color: ${font};
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${font};
        box-shadow: inset 0 0 0 1px ${border};
      `;
  }
};

type SurfaceAccentKey = keyof Theme['semantic']['surface']['accent'];

const getAccentBackground = (
  theme: Theme,
  accentColor: ThemeColorsToken,
  accentBackgroundColor?: ThemeColorsToken,
) => {
  if (accentBackgroundColor) {
    return getColorByToken(theme, accentBackgroundColor);
  }

  const accentKey = accentColor.match(
    /^semantic\.foreground\.accent\.(\w+)$/,
  )?.[1] as SurfaceAccentKey | undefined;

  return (
    (accentKey && theme.semantic.surface.accent[accentKey]) ??
    addOpacity(getColorByToken(theme, accentColor), theme.opacity[8])
  );
};

const contentBadgeColorStyle = (
  {
    color,
    accentColor,
    accentBackgroundColor,
    neutralColor,
  }: ContentBadgeProps,
  theme: Theme,
) => {
  if (color === 'neutral') {
    return {
      font: getColorByToken(theme, neutralColor!),
      background: theme.semantic.surface.neutral.secondary,
      border: theme.semantic.line.neutral.primary,
    };
  }

  return {
    font: getColorByToken(theme, accentColor!),
    background: getAccentBackground(theme, accentColor!, accentBackgroundColor),
    border: addOpacity(getColorByToken(theme, accentColor!), theme.opacity[43]),
  };
};
