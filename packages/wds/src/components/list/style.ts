import { css } from '@wanteddev/wds-engine';

import type { ListCellProps } from './types';

type ListItemBoxStyleProps = Pick<ListCellProps, 'paddingInset' | 'size'>;

export const listStyle = css`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const listItemTextStyle = css`
  & {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
`;

export const listItemInCellStyle = ({
  paddingInset,
  size = 'normal',
}: ListItemBoxStyleProps) => {
  const sidePadding = paddingInset ? 20 : 12;
  const verticalPadding = {
    normal: 12,
    small: 8,
    medium: 16,
  }[size];

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
