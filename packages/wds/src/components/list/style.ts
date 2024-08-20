import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';
import type { ListCellProps, ListItemProps } from './types';

type ListItemStyleProps = Pick<ListItemProps, 'active' | 'disabled'>;
type ListItemInCellProps = Pick<ListCellProps, 'padding' | 'paddingInset'>;

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
    cursor: ${clickable ? 'pointer' : 'initial'};
  `;

export const listTextStyle = css`
  & {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
`;

export const listItemInCellStyle = ({
  paddingInset,
  padding = 'normal',
}: ListItemInCellProps) => {
  const sidePadding = paddingInset ? 20 : 12;
  const verticalPadding = {
    normal: 12,
    small: 8,
    medium: 16,
  }[padding];

  return css`
    --wds-list-cell-border-radius: 12px;
    padding: ${verticalPadding}px ${sidePadding}px;
    border-radius: var(--wds-list-cell-border-radius);
  `;
};

export const listCellDividerStyle = css`
  position: absolute;
  bottom: 0;
  left: var(--wds-list-cell-border-radius);
  width: calc(100% - var(--wds-list-cell-border-radius) * 2);
`;

export const listChevronButtonStyle = css`
  background-color: transparent;
`;
