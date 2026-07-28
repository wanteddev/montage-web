import { css } from '@montage-ui/engine';

import { ellipsisTypographyStyle, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { SegmentedControlProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const segmentedControlStyle =
  ({ size, iconOnly, xs, sm, md, lg, xl }: SegmentedControlProps) =>
  (theme: Theme) => css`
    position: relative;
    width: ${iconOnly ? 'fit-content' : '100%'};
    background-color: ${theme.semantic.surface.neutral.secondary};

    ${segmentedControlSizeStyle({ size }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentedControlSizeStyle({ size: params?.size }, theme)}
        ${params?.sx}
      `,
    )}
  `;

const segmentedControlSizeStyle = (
  { size }: SegmentedControlProps,
  theme: Theme,
) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: ${theme.radius[14]};
        height: ${theme.dimension[48]};
        padding: ${theme.spacing[4]};

        [data-role='segmented-control-motion'] {
          border-radius: ${theme.radius[10]};
        }
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[12]};
        height: ${theme.dimension[40]};
        padding: ${theme.spacing[4]};

        [data-role='segmented-control-motion'] {
          border-radius: ${theme.radius[8]};
        }
      `;
    case 'small':
      return css`
        border-radius: ${theme.radius[10]};
        height: ${theme.dimension[32]};
        padding: ${theme.spacing[4]};

        [data-role='segmented-control-motion'] {
          border-radius: ${theme.radius[8]};
        }
      `;
  }
};

export const motionThumbStyle = (theme: Theme) => css`
  position: absolute;
  background-color: ${theme.semantic.surface.elevated.primary};
  box-shadow: ${theme.semantic.elevation.shadow.normal.xsmall};
`;

type SegmentedControlItemStyleProps = {
  active?: boolean;
  disabled?: boolean;
  size?: SegmentedControlProps['size'];
  iconOnly?: boolean;
} & Pick<SegmentedControlProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export const segmentedControlItemStyle =
  ({
    iconOnly,
    size,
    disabled,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SegmentedControlItemStyleProps) =>
  (theme: Theme) => css`
    position: relative;
    height: 100%;
    cursor: pointer;
    box-shadow: none;
    min-width: 0;

    [data-role='segmented-control-item-text'] {
      font: inherit;
      display: block;
      ${ellipsisTypographyStyle(1)}
    }

    & > :not([data-role='segmented-control-item-text']) {
      flex-shrink: 0;
    }

    ${disabled &&
    css`
      cursor: initial;
    `}

    color: ${theme.semantic.foreground.neutral.tertiary};
    background-color: transparent;
    box-shadow: none;
    transition: color 0.2s;

    &[data-active='true'] {
      color: ${theme.semantic.foreground.neutral.primary};

      &[data-ssr-motion='true'] {
        & > * {
          z-index: 1;
        }

        position: relative;
        box-shadow: ${theme.semantic.elevation.shadow.normal.xsmall};
        background-color: ${theme.semantic.surface.elevated.primary};
      }
    }

    ${segmentedControlItemSizeStyle({ size, iconOnly }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentedControlItemSizeStyle(
          { size: params?.size, iconOnly },
          theme,
        )}
      `,
    )}
  `;

const segmentedControlItemSizeStyle = (
  { size, iconOnly }: SegmentedControlItemStyleProps,
  theme: Theme,
) => {
  if (iconOnly) {
    switch (size) {
      case 'large':
        return css`
          padding: ${theme.spacing[10]} 11px;
          border-radius: ${theme.radius[10]};

          svg {
            font-size: ${theme.dimension[20]};
          }
        `;
      case 'medium':
        return css`
          padding: 7px ${theme.spacing[8]};
          border-radius: ${theme.radius[8]};

          svg {
            font-size: ${theme.dimension[18]};
          }
        `;
      case 'small':
        return css`
          padding: ${theme.spacing[4]} 5px;
          border-radius: ${theme.radius[8]};

          svg {
            font-size: ${theme.dimension[16]};
          }
        `;
    }
  }

  switch (size) {
    case 'large':
      return css`
        ${typographyStyle('body2', 'medium')}
        border-radius: ${theme.radius[10]};
        padding: 9px ${theme.spacing[8]};
        gap: ${theme.spacing[6]};

        svg {
          font-size: ${theme.dimension[18]};
        }
      `;
    case 'medium':
      return css`
        ${typographyStyle('label1', 'medium')}
        border-radius: ${theme.radius[8]};
        padding: ${theme.spacing[6]} ${theme.spacing[8]};
        gap: ${theme.spacing[6]};

        svg {
          font-size: ${theme.dimension[16]};
        }
      `;
    case 'small':
      return css`
        ${typographyStyle('caption1', 'medium')}
        border-radius: ${theme.radius[8]};
        padding: ${theme.spacing[4]} ${theme.spacing[6]};
        gap: ${theme.spacing[4]};

        svg {
          font-size: ${theme.dimension[14]};
        }
      `;
  }
};
