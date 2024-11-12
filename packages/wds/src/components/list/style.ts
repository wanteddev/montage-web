import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, ellipsisTypographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { ListCellProps, ListItemProps } from './types';

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
          color: ${theme.palette.label.disable};
          pointer-events: none;
        `
      : css`
          cursor: ${clickable ? 'pointer' : 'initial'};
          color: ${active
            ? theme.palette.primary.normal
            : theme.palette.label.normal};
        `}
  `;

export const listTextStyle = css`
  ${ellipsisTypographyStyle(1)}
  white-space: nowrap;
  overflow-wrap: anywhere;
  word-break: keep-all;
`;

export const listCellStyle =
  ({ padding, fillWidth, xs, sm, md, lg, xl }: ListCellProps) =>
  (theme: Theme) => css`
    border-radius: 12px;

    ${listCellPaddingStyle({ padding })}
    ${listCellFillWidthStyle({ fillWidth })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listCellPaddingStyle({ padding: params?.padding })}
        ${listCellFillWidthStyle({ fillWidth: params?.fillWidth })}
        ${params?.sx}
      `,
    )}
  `;

const listCellPaddingStyle = ({ padding }: Pick<ListCellProps, 'padding'>) => {
  switch (padding) {
    case false:
      return css`
        padding-top: 0px;
        padding-bottom: 0px;
      `;
    case 'small':
      return css`
        padding-top: 8px;
        padding-bottom: 8px;
      `;
    case 'medium':
      return css`
        padding-top: 16px;
        padding-bottom: 16px;
      `;
    case 'normal':
    default:
      return css`
        padding-top: 12px;
        padding-bottom: 12px;
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

        & > [wds-component='with-interaction'] {
          width: 100%;
        }

        & > [data-role='list-cell-divider'] {
          width: calc(100% - 40px);
        }
      `;
    case false:
      return css`
        padding-right: 0px;
        padding-left: 0px;

        & > [wds-component='with-interaction'] {
          width: calc(100% + 24px);
        }

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

export const listItemContentStyle = css`
  max-height: 24px;
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  position: relative;

  [wds-component='with-interaction'] {
    z-index: 1;
  }
`;
