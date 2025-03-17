import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  getPreviousValue,
  typographyStyle,
} from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { ListCellContentProps, ListCellProps } from './types';

export const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const listCellStyle =
  ({
    verticalPadding,
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
  }: ListCellProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding-top: var(--wds-list-cell-vertical-padding);
    padding-bottom: var(--wds-list-cell-vertical-padding);
    padding-left: var(--wds-list-cell-horizontal-padding);
    padding-right: var(--wds-list-cell-horizontal-padding);

    ${disabled
      ? css`
          cursor: initial;
          pointer-events: none;
          color: ${theme.semantic.label.alternative};
          opacity: ${theme.opacity[43]};
        `
      : css`
          color: ${active
            ? theme.semantic.primary.normal
            : theme.semantic.label.normal};

          ${!disableInteraction &&
          css`
            cursor: pointer;
          `}
        `}

    ${listCellPaddingStyle({ verticalPadding })}
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
        ${listCellPaddingStyle({ verticalPadding: params?.verticalPadding })}
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
      width: calc(100% + (var(--wds-list-cell-interaction-padding, 0px) * 2));
    }
  `;
};

const listCellPaddingStyle = ({
  verticalPadding,
}: Pick<ListCellProps, 'verticalPadding'>) => css`
  &,
  & ~ [wds-component='accordion-details'] {
    ${(() => {
      switch (verticalPadding) {
        case '0px':
          return css`
            --wds-list-cell-vertical-padding: 0px;
            --wds-list-cell-interaction-display: none;
          `;

        case '8px':
          return css`
            --wds-list-cell-vertical-padding: 8px;
            --wds-list-cell-interaction-display: block;
          `;
        case '16px':
          return css`
            --wds-list-cell-vertical-padding: 16px;
            --wds-list-cell-interaction-display: block;
          `;
        case '12px':
          return css`
            --wds-list-cell-vertical-padding: 12px;
            --wds-list-cell-interaction-display: block;
          `;
      }
    })()}
  }
`;

const listCellFillWidthStyle = ({
  fillWidth,
}: Pick<ListCellProps, 'fillWidth'>) => {
  switch (fillWidth) {
    case true:
      return css`
        &,
        & ~ [wds-component='accordion-details'],
        & ~ [data-role='accordion-divider'] {
          --wds-list-cell-horizontal-padding: 20px;
        }
      `;
    case false:
      return css`
        &,
        & ~ [wds-component='accordion-details'],
        & ~ [data-role='accordion-divider'] {
          --wds-list-cell-horizontal-padding: 0px;
        }
        border-radius: 12px;
      `;
  }
};

export const listCellDividerStyle = css`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0px);
  width: calc(100% - (var(--wds-list-cell-horizontal-padding) * 2));
`;

const listCellContentSizeStyle = ({
  height,
}: Pick<ListCellContentProps, 'height'>) => {
  switch (height) {
    case '40px':
      return css`
        min-width: 40px;
        max-width: max-content;
        height: 40px;
      `;

    case '56px':
      return css`
        min-width: 56px;
        max-width: max-content;
        height: 56px;
      `;

    case '24px':
    default:
      return css`
        min-width: 24px;
        max-width: max-content;
        height: 24px;
      `;
  }
};

const listCellContentVariantStyle =
  ({ variant }: Pick<ListCellContentProps, 'variant'>) =>
  (theme: Theme) => {
    switch (variant) {
      case 'icon':
        return css`
          color: ${theme.semantic.label.alternative};
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
            color: ${theme.semantic.primary.normal};
            background-color: ${theme.semantic.fill.normal};
            font-size: 32px;
          }
        `;

      case 'chevron':
        return css`
          ${typographyStyle('body1', 'regular')}
          color: ${theme.semantic.label.alternative};
        `;
    }
  };

export const listCellContentStyle =
  ({ variant, height, xl, lg, md, sm, xs }: ListCellContentProps) =>
  (theme: Theme) => css`
    flex-shrink: 0;
    position: relative;

    &[data-role='list-item-trailing-content'] {
      justify-content: flex-end;
    }

    [wds-component='with-interaction'] {
      z-index: 1;
    }

    ${listCellContentVariantStyle({ variant })(theme)}
    ${listCellContentSizeStyle({ height })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listCellContentSizeStyle({ height: params?.height })}
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
