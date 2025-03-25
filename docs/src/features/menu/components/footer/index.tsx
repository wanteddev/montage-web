'use client';
import { FlexBox, Typography } from '@wanteddev/wds';
import React from 'react';
import {
  IconLogoApple,
  IconLogoFacebook,
  IconLogoGooglePlay,
  IconLogoNaverBlog,
  IconLogoYoutube,
} from '@wanteddev/wds-icon';
import { IconButton } from '@wanteddev/wds';
import Link from 'next/link';

import LogoBlack from '@/assets/logo-black';
import { layoutStyle } from '@/styles';

import { GNB_MENUS } from '../gnb/constants';

import { footerStyle } from './style';

const Footer = () => {
  return (
    <FlexBox sx={layoutStyle}>
      <FlexBox
        sx={footerStyle}
        flexDirection="column"
        sm={{ flexDirection: 'row' }}
        columnGap="calc(var(--layout-padding) * 2)"
        rowGap="32px"
      >
        <FlexBox flex="0">
          <LogoBlack />
        </FlexBox>
        <FlexBox flex="1" gap="40px" xl={{ flex: '0' }}>
          <FlexBox flexDirection="column" gap="8px" sx={{ minWidth: 120 }}>
            {GNB_MENUS.map((menu) => (
              <Typography
                as={Link}
                variant="label1"
                color="semantic.label.neutral"
                href={menu.href}
                key={menu.label}
              >
                {menu.label}
              </Typography>
            ))}
          </FlexBox>

          <FlexBox flexDirection="column" gap="8px" sx={{ minWidth: 120 }}>
            <Typography
              as="a"
              variant="label1"
              color="semantic.label.neutral"
              href="https://www.figma.com/community/file/1355516515676178246"
            >
              Figma Community
            </Typography>
            <Typography
              as="a"
              variant="label1"
              color="semantic.label.neutral"
              href="https://github.com/wanteddev"
            >
              Github
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox
          flex="1"
          sx={{ maxWidth: 280 }}
          justifyContent="center"
          flexDirection="column"
          sm={{
            gap: '36px',
          }}
          gap="20px"
        >
          <FlexBox gap="16px" alignItems="center">
            <IconButton size={24}>
              <IconLogoYoutube />
            </IconButton>
            <IconButton size={24}>
              <IconLogoFacebook />
            </IconButton>
            <IconButton size={24}>
              <IconLogoNaverBlog />
            </IconButton>
            <IconButton size={24}>
              <IconLogoApple />
            </IconButton>
            <IconButton size={24}>
              <IconLogoGooglePlay />
            </IconButton>
          </FlexBox>

          <Typography variant="label1" color="semantic.label.normal">
            {`© ${new Date().getFullYear()} Wanted Lab, Inc.`}
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Footer;
