import { Box, IconButton } from '@wanteddev/wds';
import { IconLink } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { linkStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const HeadingLink = ({ id, children, ...props }: Props) => (
  <Box data-role="heading-link-wrapper" {...props} sx={linkStyle}>
    <Box data-role="heading-link-area">
      <IconButton as={Link} data-role="heading-link" href={`#${id}`}>
        <IconLink aria-hidden />
      </IconButton>
    </Box>

    <span>{children}</span>
  </Box>
);

export default HeadingLink;
