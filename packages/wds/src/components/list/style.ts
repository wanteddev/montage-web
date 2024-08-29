import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { ListCellProps, ListItemProps } from './types';

export const listStyle = css`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
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
          cursor: not-allowed;
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

export const listTextCaptionStyle = css`
  margin-top: 4px;
  display: block;
`;

export const listCellStyle =
  ({ padding, paddingInset, xs, sm, md, lg, xl }: ListCellProps) =>
  (theme: Theme) => css`
    border-radius: 12px;

    ${listCellPaddingStyle({ padding })}
    ${listCellPaddingInsetStyle({ paddingInset })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listCellPaddingStyle({ padding: params?.padding })}
        ${listCellPaddingInsetStyle({ paddingInset: params?.paddingInset })}
        ${params?.sx}
      `,
    )}
  `;

const listCellPaddingStyle = ({ padding }: Pick<ListCellProps, 'padding'>) => {
  switch (padding) {
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

const listCellPaddingInsetStyle = ({
  paddingInset,
}: Pick<ListCellProps, 'paddingInset'>) => {
  switch (paddingInset) {
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

export const listItemContentStyle = (theme: Theme) => css`
  max-height: 24px;
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  position: relative;

  & > svg {
    color: ${theme.palette.label.assistive};
  }

  [wds-component='icon-button'][data-variant='normal'] {
    color: ${theme.palette.label.alternative};
  }
  [wds-component='text-button'][data-variant='assistive'] {
    color: ${theme.palette.label.alternative};
  }
  [wds-component='with-interaction'] {
    z-index: 1;
  }
`;
