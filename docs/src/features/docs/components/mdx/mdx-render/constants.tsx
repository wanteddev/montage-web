import { Typography } from '@wanteddev/wds';

import HeadingLink from '../heading-link';
import CodeBlock from '../code-block';
import Pre from '../pre';
import Demo from '../demo';
import PropsTable from '../props-table';
import Description from '../description';
import Thumbnail from '../thumbnail';
import Anatomy from '../anatomy';
import Note from '../note';
import { SectionDivider, SectionFigure, SectionLayout } from '../section';

import type { ReactNode } from 'react';

export const MDX_COMPONENTS: { [key: string]: (props: any) => ReactNode } = {
  h1: (props) => (
    <Typography
      {...props}
      variant="display2"
      display="block"
      weight="bold"
      as="h1"
    />
  ),
  h2: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading=""
      variant="display3"
      weight="bold"
      display="block"
      as="h2"
      id={id}
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h3: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading=""
      variant="title3"
      display="block"
      weight="bold"
      as="h3"
      id={id}
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h4: ({ children, id, ...props }) => (
    <Typography
      {...props}
      display="block"
      variant="headline1"
      weight="bold"
      as="h4"
      id={id}
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h5: ({ children, id, ...props }) => (
    <Typography
      {...props}
      display="block"
      variant="body2"
      weight="bold"
      as="h5"
      id={id}
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  h6: ({ children, id, ...props }) => (
    <Typography
      {...props}
      display="block"
      variant="label1"
      weight="bold"
      as="h6"
      color="semantic.label.alternative"
      id={id}
    >
      <HeadingLink id={id}>{children}</HeadingLink>
    </Typography>
  ),
  p: (props) => (
    <Typography
      {...props}
      variant="body1"
      weight="regular"
      as="p"
      display="block"
    />
  ),
  pre: Pre,
  code: CodeBlock,
  Demo,
  PropsTable,
  Description,
  Thumbnail,
  Anatomy,
  Note,
  SectionLayout,
  SectionFigure,
  SectionDivider,
};
