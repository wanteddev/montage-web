import { css } from '@wanteddev/wds-engine';

import type { ListCellProps } from './types';

export const listStyle = css`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const listCellStyle = css`
  border-radius: 12px;

  [role='radio'] [wds-component='with-interaction'] {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
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

export const listItemBoxStyle = ({
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
    padding: ${verticalPadding}px ${sidePadding}px;
  `;
};
