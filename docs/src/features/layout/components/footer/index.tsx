'use client';
import { Box, FlexBox } from '@wanteddev/wds';
import Link from 'next/link';
import { useCallback } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { footerLinkStyle, footerStyle } from './style';

import type { SxProp } from '@wanteddev/wds';

type Props = {
  sx?: SxProp;
};

const Footer = ({ sx }: Props) => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <FlexBox
      as="footer"
      sx={[footerStyle, sx]}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box as="p" sx={footerLinkStyle}>
        © 2025 Wanted Lab, Inc.
      </Box>

      <FlexBox gap="40px">
        <Box
          as={Link}
          href="/docs/getting-started/terms-of-use"
          sx={footerLinkStyle}
          onClick={handleRouteChange}
        >
          Terms of Use
        </Box>
      </FlexBox>
    </FlexBox>
  );
};

export default Footer;
