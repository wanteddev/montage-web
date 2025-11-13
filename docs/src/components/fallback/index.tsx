'use client';

import { Box, Button, FlexBox, Typography } from '@wanteddev/wds';
import Link from 'next/link';

import { fallbackTitleStyle } from './style';

import type { ReactNode } from 'react';

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
};

const Fallback = ({ title, subtitle, description }: Props) => {
  return (
    <FlexBox flexDirection="column" gap="40px">
      <Box as="h1" sx={fallbackTitleStyle}>
        {title}
      </Box>
      <FlexBox flexDirection="column" gap="24px" alignItems="center">
        <FlexBox flexDirection="column" gap="11px">
          <Typography
            as="p"
            variant="headline1"
            align="center"
            weight="bold"
            color="semantic.label.normal"
            lg={{
              variant: 'title2',
            }}
          >
            {subtitle}
          </Typography>
          <Typography
            as="p"
            variant="label2"
            align="center"
            weight="regular"
            color="semantic.label.alternative"
            lg={{
              variant: 'label1',
            }}
          >
            {description}
          </Typography>
        </FlexBox>

        <Button
          variant="outlined"
          color="assistive"
          size="medium"
          sx={{ borderRadius: '999px' }}
          as={Link}
          href="/"
        >
          Go Home
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default Fallback;
