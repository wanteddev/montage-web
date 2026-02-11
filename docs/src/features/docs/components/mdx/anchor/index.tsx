import { Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { useCallback } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import type { HTMLProps } from 'react';

type Props = HTMLProps<HTMLAnchorElement>;

const Anchor = ({ href, ...props }: Props) => {
  const isExternal = href?.startsWith('http');

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <Typography
      {...props}
      variant="body1"
      weight="medium"
      as={isExternal ? 'a' : Link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={isExternal ? undefined : handleRouteChange}
      color="semantic.primary.normal"
      sx={{
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textUnderlineOffset: 'auto',
        textUnderlinePosition: 'from-font',
        textDecorationSkipInk: 'auto',
        textDecorationThickness: '0.5px',
      }}
      href={href}
    />
  );
};

export default Anchor;
