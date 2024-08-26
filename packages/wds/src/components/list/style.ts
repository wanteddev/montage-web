import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type {
  ListCellProps,
  ListCellResponsiveProps,
  ListItemProps,
} from './types';

type ListItemStyleProps = Pick<ListItemProps, 'active' | 'disabled'>;
type ListItemInCellProps = Pick<ListCellProps, 'padding' | 'paddingInset'> &
  ListCellResponsiveProps;

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
  }: ListItemStyleProps & {
    clickable: boolean;
  }) =>
  (theme: Theme) => css`
    width: 100%;
    color: ${disabled
      ? theme.palette.label.disable
      : active
        ? theme.palette.primary.normal
        : theme.palette.label.normal};
    pointer-events: ${disabled ? 'none' : 'initial'};
    cursor: ${disabled ? 'not-allowed' : clickable ? 'pointer' : 'initial'};
  `;

export const listTextStyle = ({ hasCheckbox }: { hasCheckbox: boolean }) => css`
  ${hasCheckbox &&
  css`
    cursor: pointer;
  `}
`;

export const listTextCaptionStyle = css`
  margin-top: 4px;
  display: block;
`;

const listItemInCellSizeStyle = (
  padding: ListItemInCellProps['padding'],
  paddingInset: ListItemInCellProps['paddingInset'],
) => {
  const sidePadding = paddingInset ? 12 : 0;

  switch (padding) {
    case 'small':
      return css`
        padding: 8px ${sidePadding}px;
      `;
    case 'medium':
      return css`
        padding: 16px ${sidePadding}px;
      `;
    case 'normal':
    default:
      return css`
        padding: 12px ${sidePadding}px;
      `;
  }
};

export const listItemInCellStyle =
  ({ padding, paddingInset, xs, sm, md, lg, xl }: ListItemInCellProps) =>
  (theme: Theme) => css`
    --wds-list-cell-border-radius: 12px;
    border-radius: var(--wds-list-cell-border-radius);

    ${listItemInCellSizeStyle(padding, paddingInset)}
    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${listItemInCellSizeStyle(params?.padding, params?.paddingInset)}
        ${params?.sx}
      `,
    )}
  `;

export const listCellDividerStyle = css`
  position: absolute;
  bottom: 0;
  left: var(--wds-list-cell-border-radius);
  width: calc(100% - var(--wds-list-cell-border-radius) * 2);
`;

export const listChevronButtonStyle = css`
  background-color: transparent;
`;

export const listItemContentStyle = (theme: Theme) => css`
  max-height: 24px;
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;

  & > svg {
    color: ${theme.palette.label.assistive};
  }

  [wds-component='icon-button'][data-variant='normal'] {
    color: ${theme.palette.label.alternative};
  }
  [wds-component='text-button'][data-variant='assistive'] {
    color: ${theme.palette.label.alternative};
  }
`;
