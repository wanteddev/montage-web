import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  getPreviousValue,
  typographyStyle,
} from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { ListItemContentProps, ListItemProps } from './types';

export const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const listItemStyle =
  ({
    padding,
    fillWidth,
    interactionPadding,
    active,
    disabled,
    disableInteraction,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ListItemProps) =>
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
          color: ${active
            ? theme.palette.primary.normal
            : theme.palette.label.normal};

          ${!disableInteraction &&
          css`
            cursor: pointer;
          `}
        `}

    ${listItemPaddingStyle({ padding })}
    ${listItemFillWidthStyle({ fillWidth })}
    ${listItemInteractionPaddingStyle({ fillWidth, interactionPadding })}

    & > [wds-component='with-interaction'] {
      border-radius: inherit;
      display: var(--wds-list-cell-interaction-display, block);
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${listItemPaddingStyle({ padding: params?.padding })}
        ${listItemFillWidthStyle({
          fillWidth: params?.fillWidth,
        })}
        ${listItemInteractionPaddingStyle({
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

export const listTextEllipsisStyle = css`
  ${ellipsisTypographyStyle(1)}
  white-space: nowrap;
  overflow-wrap: anywhere;
  word-break: keep-all;
`;

const listItemInteractionPaddingStyle = ({
  fillWidth,
  interactionPadding,
}: Pick<ListItemProps, 'fillWidth' | 'interactionPadding'>) => {
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

const listItemPaddingStyle = ({ padding }: Pick<ListItemProps, 'padding'>) => {
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

const listItemFillWidthStyle = ({
  fillWidth,
}: Pick<ListItemProps, 'fillWidth'>) => {
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

export const listItemDividerStyle = css`
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
      `;

    case 'large':
      return css`
        min-width: 56px;
        max-width: max-content;
        height: 56px;
      `;

    case 'normal':
    default:
      return css`
        min-width: 24px;
        max-width: max-content;
        height: 24px;
      `;
  }
};

const listItemContentVariantStyle =
  ({ variant }: Pick<ListItemContentProps, 'variant'>) =>
  (theme: Theme) => {
    switch (variant) {
      case 'icon':
        return css`
          color: ${theme.palette.label.alternative};
          font-size: 24px;
        `;

      case 'avatar':
        return css`
          padding-right: 8px;
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
          }
        `;

      case 'chevron':
        return css`
          ${typographyStyle('body1_normal', 'regular')}
          color: ${theme.palette.label.alternative};
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

export const listTextStyle = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
