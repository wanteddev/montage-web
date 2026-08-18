import { css } from '@montage-ui/engine';

import { ellipsisTypographyStyle, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme } from '@montage-ui/engine';
import type {
  ListCellContentProps,
  ListCellExtraContentProps,
  ListCellProps,
} from './types';

export const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const listCellStyle =
  ({
    verticalPadding,
    variant,
    selected,
    disabled,
    disableInteraction,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ListCellProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--list-cell-vertical-padding)
      var(--list-cell-horizontal-padding);
    color: ${selected
      ? theme.semantic.foreground.brand.primary
      : theme.semantic.foreground.neutral.primary};

    ${listCellPaddingStyle({ verticalPadding }, theme)}
    ${listCellVariantStyle({ variant }, theme)}

    & > [data-component='with-interaction'] {
      border-radius: inherit;
      display: var(--list-cell-interaction-display, block);
    }

    ${selected &&
    css`
      [data-role='list-text-wrapper'] {
        color: ${theme.semantic.foreground.brand.primary};
      }
    `}

    &[aria-disabled='true'] {
      cursor: initial;
      pointer-events: none;
      color: ${theme.semantic.foreground.disable.primary};

      [data-role='list-text-caption'],
      [data-role='list-text-wrapper'] {
        color: ${theme.semantic.foreground.disable.primary};
      }
    }

    ${!disabled &&
    !disableInteraction &&
    css`
      @media (pointer: fine) {
        &:hover {
          [data-role='list-cell-divider'] {
            opacity: var(--list-cell-active-divider-opacity, 0);
          }
        }
      }

      &:active {
        [data-role='list-cell-divider'] {
          opacity: var(--list-cell-active-divider-opacity, 0);
        }
      }
    `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listCellPaddingStyle(
          {
            verticalPadding: params?.verticalPadding,
          },
          theme,
        )}

        ${params?.sx}
      `,
    )}
  `;

export const listCellLeadingContentAreaStyle = (theme: Theme) => css`
  min-height: ${theme.dimension[24]};
  gap: ${theme.spacing[8]};

  --list-cell-content-icon-padding: ${theme.spacing[4]};
  --list-cell-content-control-padding: ${theme.spacing[2]};
  --list-cell-content-image-padding: ${theme.spacing[8]};
  --list-cell-content-icon-color: ${theme.semantic.foreground.neutral.tertiary};
`;

export const listCellTrailingContentAreaStyle = (theme: Theme) => css`
  padding-left: ${theme.spacing[8]};
  min-height: ${theme.dimension[24]};
  gap: ${theme.spacing[8]};

  --list-cell-content-icon-color: ${theme.semantic.foreground.neutral
    .secondary};

  [data-component='list-cell-content'] {
    justify-content: flex-end;
  }
`;

export const listTextContentWrapperStyle =
  (ellipsis?: boolean) => (theme: Theme) => css`
    min-height: ${theme.dimension[24]};
    align-items: center;
    display: flex;
    flex: 1;
    position: relative;
    text-align: inherit;
    padding: 1px ${theme.spacing[0]};
    gap: ${theme.spacing[4]};

    [data-role='list-text-content'] {
      display: block;
      text-align: inherit;
      max-width: 100%;
      ${listTextEllipsisStyle(ellipsis)}
    }
  `;

export const listTextEllipsisStyle = (ellipsis?: boolean) =>
  ellipsis
    ? css`
        ${ellipsisTypographyStyle(1)}
        white-space: nowrap;
        overflow-wrap: anywhere;
        word-break: keep-all;
      `
    : css`
        word-break: keep-all;
        overflow-wrap: break-word;
      `;

const listCellPaddingStyle = (
  { verticalPadding }: Pick<ListCellProps, 'verticalPadding'>,
  theme: Theme,
) => css`
  &,
  & ~ [data-component='accordion-details'] {
    ${(() => {
      switch (verticalPadding) {
        case 'none':
          return css`
            --list-cell-vertical-padding: ${theme.spacing[0]};
            --list-cell-interaction-display: none;
            --list-cell-active-divider-opacity: 1;
            cursor: initial;
          `;

        case 'small':
          return css`
            --list-cell-vertical-padding: ${theme.spacing[8]};
            --list-cell-interaction-display: block;
            --list-cell-active-divider-opacity: 0;
          `;
        case 'medium':
          return css`
            --list-cell-vertical-padding: ${theme.spacing[12]};
            --list-cell-interaction-display: block;
            --list-cell-active-divider-opacity: 0;
          `;
        case 'large':
          return css`
            --list-cell-vertical-padding: ${theme.spacing[16]};
            --list-cell-interaction-display: block;
            --list-cell-active-divider-opacity: 0;
          `;
      }
    })()}
  }
`;

const listCellVariantStyle = (
  { variant }: Pick<ListCellProps, 'variant'>,
  theme: Theme,
) => {
  switch (variant) {
    case 'full':
      return css`
        &,
        & ~ [data-component='accordion-details'],
        & ~ [data-role='accordion-divider'] {
          --list-cell-horizontal-padding: ${theme.spacing[20]};
        }

        & > [data-component='with-interaction'] {
          width: 100%;
        }
      `;
    case 'inset':
      return css`
        border-radius: ${theme.radius[16]};

        &,
        & ~ [data-component='accordion-details'],
        & ~ [data-role='accordion-divider'] {
          --list-cell-horizontal-padding: ${theme.spacing[0]};
        }

        & > [data-component='with-interaction'] {
          width: calc(100% + (${theme.spacing[12]} * 2));
        }
      `;
  }
};

export const listTextStyle = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const listCellDividerStyle = css`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0px);
  transition: opacity 0.15s ease;
  width: calc(100% - (var(--list-cell-horizontal-padding) * 2));
`;

export const listCellContentStyle =
  ({ variant }: ListCellContentProps) =>
  (theme: Theme) => css`
    flex-shrink: 0;
    position: relative;
    min-height: ${theme.dimension[24]};
    align-items: center;

    [data-component='with-interaction'] {
      z-index: 1;
    }

    ${listCellContentVariantStyle({ variant }, theme)}
  `;

const listCellContentVariantStyle = (
  { variant }: Pick<ListCellContentProps, 'variant'>,
  theme: Theme,
) => {
  switch (variant) {
    case 'value':
      return css`
        ${typographyStyle('body2', 'regular')}
        color: ${theme.semantic.foreground.neutral.tertiary};

        &[data-parent-disabled='true'] {
          color: ${theme.semantic.foreground.disable.primary};
        }
      `;

    case 'thumbnail':
      return css`
        padding-right: var(--list-cell-content-image-padding, 0px);

        &[data-parent-disabled='true'] {
          opacity: ${theme.opacity[43]};
        }
      `;

    case 'icon-button':
      return css`
        margin-right: var(--list-cell-content-icon-padding, 0px);
        height: ${theme.dimension[24]};
        width: 22px;
      `;

    case 'icon':
      return css`
        color: var(
          --list-cell-content-icon-color,
          ${theme.semantic.foreground.neutral.tertiary}
        );
        font-size: ${theme.dimension[20]};

        &[data-role='list-cell-selected-icon-check'] {
          color: ${theme.semantic.foreground.brand.primary};
          font-size: 22px;
        }

        &[data-parent-disabled='true'] {
          color: ${theme.semantic.foreground.disable.primary};
        }
      `;

    case 'avatar':
      return css`
        padding-right: var(--list-cell-content-image-padding, 0px);

        &[data-parent-disabled='true'] {
          opacity: ${theme.opacity[43]};
        }
      `;

    case 'large-icon':
      return css`
        padding-right: var(--list-cell-content-image-padding, 0px);

        & > div {
          flex-shrink: 0;
          width: fit-content;
          height: fit-content;
          border-radius: ${theme.radius[12]};
          padding: ${theme.spacing[8]};
          color: ${theme.semantic.foreground.brand.primary};
          background-color: ${theme.semantic.surface.neutral.secondary};
          font-size: ${theme.dimension[20]};
        }

        &[data-parent-disabled='true'] > div {
          color: ${theme.semantic.foreground.disable.primary};
        }
      `;

    case 'checkbox':
      return css`
        height: ${theme.dimension[24]};
        &:has([data-component='checkbox'][data-tight='true']) {
          padding-right: var(--list-cell-content-control-padding, 0px);
        }
      `;
    case 'radio':
      return css`
        height: ${theme.dimension[24]};
        &:has([data-component='radio'][data-tight='true']) {
          padding-right: var(--list-cell-content-control-padding, 0px);
        }
      `;
  }
};

export const listCellLabelTrailingStyle = (theme: Theme) => css`
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
  gap: ${theme.spacing[8]};
`;

export const listCellExtraContentStyle =
  ({ variant }: ListCellExtraContentProps) =>
  (theme: Theme) => css`
    align-items: center;
    justify-content: center;

    ${listCellExtraContentVariantStyle({ variant }, theme)}
  `;

const listCellExtraContentVariantStyle = (
  { variant }: ListCellExtraContentProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'text':
      return css`
        &[data-parent-disabled='true'] {
          color: ${theme.semantic.foreground.disable.primary};
        }
      `;
  }
};
