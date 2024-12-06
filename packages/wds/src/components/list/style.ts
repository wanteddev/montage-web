import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  getPreviousValue,
  typographyStyle,
} from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type {
  ListCellProps,
  ListItemContentProps,
  ListItemProps,
} from './types';

export const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const listItemStyle =
  ({
    active,
    disabled,
    clickable,
  }: ListItemProps & {
    clickable: boolean;
  }) =>
  (theme: Theme) => css`
    width: 100%;

    ${disabled
      ? css`
          cursor: initial;
          pointer-events: none;
          color: ${theme.palette.label.alternative};
          opacity: ${theme.opacity[43]};
        `
      : css`
          cursor: ${clickable ? 'pointer' : 'initial'};
          color: ${active
            ? theme.palette.primary.normal
            : theme.palette.label.normal};
        `}
  `;

export const listTextEllipsisStyle = css`
  ${ellipsisTypographyStyle(1)}
  white-space: nowrap;
  overflow-wrap: anywhere;
  word-break: keep-all;
`;

export const listCellStyle =
  ({
    padding,
    fillWidth,
    interactionPadding,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ListCellProps) =>
  (theme: Theme) => css`
    ${listCellPaddingStyle({ padding })}
    ${listCellFillWidthStyle({ fillWidth })}
    ${listCellInteractionPaddingStyle({ fillWidth, interactionPadding })}
    
    & > [wds-component='with-interaction'] {
      border-radius: inherit;
      display: var(--wds-list-cell-interaction-display, block);
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${listCellPaddingStyle({ padding: params?.padding })}
        ${listCellFillWidthStyle({
          fillWidth: params?.fillWidth,
        })}
        ${listCellInteractionPaddingStyle({
          fillWidth: getPreviousValue(
            { xs, sm, md, lg, xl },
            'fillWidth',
            fillWidth,
            breakpoint!,
          ),
          interactionPadding: params?.interactionPadding,
        })}
        ${params?.sx}
      `,
    )}
  `;

const listCellInteractionPaddingStyle = ({
  fillWidth,
  interactionPadding,
}: Pick<ListCellProps, 'fillWidth' | 'interactionPadding'>) => {
  if (fillWidth) {
    return css`
      & > [wds-component='with-interaction'] {
        width: 100%;
      }
    `;
  }
  return css`
    --wds-list-cell-interaction-padding: ${interactionPadding ?? '12px'};

    & > [wds-component='with-interaction'] {
      width: calc(100% + (var(--wds-list-cell-interaction-padding) * 2));
    }
  `;
};

const listCellPaddingStyle = ({ padding }: Pick<ListCellProps, 'padding'>) => {
  switch (padding) {
    case '0px':
      return css`
        padding-top: 0px;
        padding-bottom: 0px;

        --wds-list-cell-interaction-display: none;
      `;
    case '8px':
      return css`
        padding-top: 8px;
        padding-bottom: 8px;

        --wds-list-cell-interaction-display: block;
      `;
    case '16px':
      return css`
        padding-top: 16px;
        padding-bottom: 16px;

        --wds-list-cell-interaction-display: block;
      `;
    case '12px':
      return css`
        padding-top: 12px;
        padding-bottom: 12px;

        --wds-list-cell-interaction-display: block;
      `;
  }
};

const listCellFillWidthStyle = ({
  fillWidth,
}: Pick<ListCellProps, 'fillWidth'>) => {
  switch (fillWidth) {
    case true:
      return css`
        padding-right: 20px;
        padding-left: 20px;

        & > [data-role='list-cell-divider'] {
          width: calc(100% - 40px);
        }
      `;
    case false:
      return css`
        padding-right: 0px;
        padding-left: 0px;
        border-radius: 12px;

        & > [data-role='list-cell-divider'] {
          width: 100%;
        }
      `;
  }
};

export const listCellDividerStyle = css`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0px);
  width: 100%;
`;

const listItemContentSizeStyle = ({
  height,
}: Pick<ListItemContentProps, 'height'>) => {
  switch (height) {
    case 'medium':
      return css`
        min-width: 40px;
        max-width: max-content;
        height: 40px;
        max-height: 40px;
      `;

    case 'large':
      return css`
        min-width: 56px;
        max-width: max-content;
        height: 56px;
        max-height: 56px;
      `;

    case 'normal':
    default:
      return css`
        min-width: 24px;
        max-width: max-content;
        height: 24px;
        max-height: 24px;
      `;
  }
};

const listItemContentVariantStyle =
  ({ variant }: Pick<ListItemContentProps, 'variant'>) =>
  (theme: Theme) => {
    switch (variant) {
      case 'button':
      case 'radio':
      case 'checkbox':
      case 'icon-button':
        return;

      case 'icon':
        return css`
          color: ${theme.palette.label.alternative};
          font-size: 24px;
          overflow-y: clip;
        `;

      case 'avatar':
        return css`
          padding-right: 8px;
          overflow-y: clip;
        `;

      case 'large-icon':
        return css`
          & > div {
            flex-shrink: 0;
            width: fit-content;
            height: fit-content;
            border-radius: 12px;
            padding: 8px;
            color: ${theme.palette.primary.normal};
            background-color: ${theme.palette.fill.normal};
            font-size: 32px;
            overflow-y: clip;
          }
        `;

      case 'chevron':
        return css`
          ${typographyStyle('body1_normal', 'regular')}
          color: ${theme.palette.label.alternative};
          overflow-y: clip;
        `;

      default:
        return css`
          overflow-y: clip;
        `;
    }
  };

export const listItemContentStyle =
  ({ variant, height, xl, lg, md, sm, xs }: ListItemContentProps) =>
  (theme: Theme) => css`
    flex-shrink: 0;
    position: relative;

    &[data-role='list-item-right-content'] {
      justify-content: flex-end;
    }

    [wds-component='with-interaction'] {
      z-index: 1;
    }

    ${listItemContentVariantStyle({ variant })(theme)}
    ${listItemContentSizeStyle({ height })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listItemContentSizeStyle({ height: params?.height })}
        ${params?.sx}
      `,
    )}
  `;
