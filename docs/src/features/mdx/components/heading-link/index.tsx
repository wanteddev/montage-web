import { Box } from '@wanteddev/wds';
import { IconLink } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { linkStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'a'>;

const HeadingLink = ({ id, children, ...props }: Props) => (
  <Box id={id} {...props} href={`#${id}`} sx={linkStyle} as={Link}>
    <span>{children}</span>

    <IconLink aria-hidden />
  </Box>
);

export default HeadingLink;
