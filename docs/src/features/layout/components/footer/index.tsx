'use client';
import {
  Box,
  FlexBox,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
  TextButton,
} from '@wanteddev/wds';
import Link from 'next/link';
import { useCallback } from 'react';
import { IconCaretDown } from '@wanteddev/wds-icon';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { footerLinkStyle, footerStyle, footerTextButtonStyle } from './style';

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
        © 2026 Wanted Lab, Inc.
      </Box>

      <FlexBox gap="40px">
        <Menu value="">
          <MenuTrigger>
            <TextButton
              size="medium"
              color="assistive"
              sx={footerTextButtonStyle}
              trailingContent={<IconCaretDown aria-hidden />}
            >
              More information
            </TextButton>
          </MenuTrigger>

          <MenuContent sx={{ width: '140px' }} position="top-center">
            <MenuList>
              <MenuItem
                verticalPadding="small"
                value="terms-of-use"
                as={Link}
                href="/docs/getting-started/terms-of-use"
                onClick={(e) => {
                  e.defaultPrevented = true;
                  handleRouteChange();
                }}
                textProps={{
                  variant: 'label1',
                  weight: 'medium',
                }}
              >
                Terms of use
              </MenuItem>
              <MenuItem
                verticalPadding="small"
                value="release-note"
                as={Link}
                href="/docs/release-note"
                onClick={(e) => {
                  e.defaultPrevented = true;
                  handleRouteChange();
                }}
                textProps={{
                  variant: 'label1',
                  weight: 'medium',
                }}
              >
                Release note
              </MenuItem>
            </MenuList>
          </MenuContent>
        </Menu>
      </FlexBox>
    </FlexBox>
  );
};

export default Footer;
