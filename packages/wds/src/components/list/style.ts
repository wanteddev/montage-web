import { css } from '@wanteddev/wds-engine';

import type { ListCellProps } from './types';

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

type ListItemBoxStyleProps = Pick<ListCellProps, 'paddingInset' | 'size'>;

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
    border-radius: 12px;
    padding: ${verticalPadding}px ${sidePadding}px;
  `;
};
