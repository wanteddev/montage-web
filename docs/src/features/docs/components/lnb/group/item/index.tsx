import { ListCell } from '@wanteddev/wds';
import Link from 'next/link';
import { type PropsWithChildren, useCallback } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { lnbItemStyle } from './style';

type Props = PropsWithChildren<{
  href: string;
  isActive: boolean;
  depth?: string;
}>;

const LnbGroupItem = ({ href, children, isActive, depth = '1' }: Props) => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <ListCell
      as={Link}
      href={href}
      sx={lnbItemStyle}
      onClick={handleRouteChange}
      active={isActive}
      fillWidth
      verticalPadding={depth === '0' ? 'large' : 'small'}
      data-depth={depth}
      aria-current={isActive ? 'page' : undefined}
      textProps={{
        variant: depth === '0' ? 'headline2' : 'label1',
        weight: depth === '0' ? 'bold' : 'medium',
      }}
    >
      {children}
    </ListCell>
  );
};

export default LnbGroupItem;
