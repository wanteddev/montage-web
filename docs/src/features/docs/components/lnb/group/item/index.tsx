import { ListCell } from '@wanteddev/wds';
import Link from 'next/link';

import { lnbItemStyle } from './style';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  href: string;
  isActive: boolean;
  depth?: string;
}>;

const LnbGroupItem = ({ href, children, isActive, depth = '1' }: Props) => {
  return (
    <ListCell
      as={Link}
      href={href}
      sx={lnbItemStyle}
      active={isActive}
      verticalPadding="12px"
      data-depth={depth}
      aria-current={isActive ? 'page' : undefined}
      textProps={{
        variant: 'body1',
        weight: 'regular',
      }}
    >
      {children}
    </ListCell>
  );
};

export default LnbGroupItem;
