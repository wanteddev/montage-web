import { IconLink } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { linkStyle } from './style';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'a'>;

const HeadingLink = ({ id, children, ...props }: Props) => (
  <Link id={id} {...props} href={`#${id}`} css={linkStyle}>
    {children}

    <IconLink aria-hidden />
  </Link>
);

export default HeadingLink;
