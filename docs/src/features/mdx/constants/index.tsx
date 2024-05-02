import { Typography } from '@wanteddev/wds';

import HeadingLink from '../components/heading-link';
import CodeBlock from '../components/code-block';
import Pre from '../components/pre';
import Demo from '../components/demo';
import PropsTable from '../components/props-table';

import type { ReactNode } from 'react';

const MDXComponents: { [key: string]: (props: any) => ReactNode } = {
  h1: (props) => (
    <Typography {...props} variant="display2" weight="bold" as="h1" />
  ),
  h2: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading="true"
      variant="title1"
      weight="bold"
      as="h2"
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h3: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading="true"
      variant="title2"
      weight="bold"
      as="h3"
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h4: (props) => (
    <Typography {...props} variant="title3" weight="bold" as="h4" />
  ),
  h5: (props) => (
    <Typography {...props} variant="heading1" weight="bold" as="h4" />
  ),
  h6: (props) => (
    <Typography {...props} variant="heading2" weight="bold" as="h4" />
  ),
  p: (props) => (
    <Typography
      {...props}
      variant="body1_normal"
      weight="regular"
      as="p"
      sx={{
        margin: '24px 0px 16px 0px',
        display: 'block',
      }}
    />
  ),
  pre: Pre,
  code: CodeBlock,
  Demo,
  PropsTable,
};

export default MDXComponents;
