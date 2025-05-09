'use client';
import { FlexBox, Typography } from '@wanteddev/wds';
import React from 'react';
import Link from 'next/link';

import { footerStyle } from './style';

const Footer = () => {
  return (
    <FlexBox
      sx={footerStyle}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography variant="label1" color="semantic.label.neutral">
        © 2025 Wanted Lab, Inc.
      </Typography>

      <FlexBox gap="40px">
        <Typography
          as={Link}
          href="#"
          variant="label1"
          color="semantic.label.neutral"
        >
          Terms of Use
        </Typography>
        <Typography
          as={Link}
          href="#"
          variant="label1"
          color="semantic.label.neutral"
        >
          FAQ
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

export default Footer;
