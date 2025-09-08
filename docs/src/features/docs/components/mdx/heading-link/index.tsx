import { Box, FlexBox, IconButton } from '@wanteddev/wds';
import { IconLink } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { linkStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const HeadingLink = ({ id, children, ...props }: Props) => (
  <Box data-role="heading-link-wrapper" {...props} sx={linkStyle}>
    <FlexBox
      data-role="heading-link-area"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton as={Link} data-role="heading-link" href={`#${id}`}>
        <IconLink aria-hidden />
      </IconButton>
    </FlexBox>

    <Box as="span" sx={{ display: 'inline-block' }}>
      {children}
    </Box>
  </Box>
);

export default HeadingLink;
