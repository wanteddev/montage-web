import { Box, FlexBox, IconButton } from '@wanteddev/wds';
import { IconLink } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { breakWordStyle } from '@/styles/text';

import { linkStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const HeadingLink = ({ id, children, ...props }: Props) => (
  <Box data-role="heading-link-wrapper" {...props} sx={linkStyle}>
    <FlexBox
      data-role="heading-link-area"
      alignItems="center"
      justifyContent="center"
      as="span"
    >
      <IconButton
        as={Link}
        data-role="heading-link"
        href={`#${id}`}
        aria-labelledby={id}
      >
        <IconLink aria-hidden />
      </IconButton>
    </FlexBox>

    <FlexBox alignItems="center" gap="6px" as="span" sx={breakWordStyle}>
      {children}
    </FlexBox>
  </Box>
);

export default HeadingLink;
