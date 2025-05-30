import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography,
} from '@wanteddev/wds';
import Link from 'next/link';

import HeadingLink from '../heading-link';
import CodeBlock from '../code-block';
import Pre from '../pre';
import Demo from '../demo';
import PropsTable from '../props-table';
import Thumbnail from '../thumbnail';
import Anatomy from '../anatomy';
import Note from '../note';
import {
  SectionCustomize,
  SectionFigure,
  SectionFigureGroup,
  SectionHierarchy,
  SectionHierarchyItem,
  SectionLayout,
  SectionStates,
  SectionVariants,
} from '../section';
import DocsCollection from '../docs-collection';

import type { ReactNode } from 'react';

export const MDX_COMPONENTS: { [key: string]: (props: any) => ReactNode } = {
  h1: (props) => (
    <Typography {...props} variant="title1" weight="bold" as="h1" />
  ),
  h2: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading=""
      variant="title3"
      weight="bold"
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
      variant="heading2"
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
      data-heading=""
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
      data-heading=""
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
      data-heading=""
      display="block"
      variant="label2"
      weight="medium"
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
  a: ({ href, ...props }) => (
    <Typography
      {...props}
      variant="body1"
      weight="regular"
      as={href.includes('http') ? 'a' : Link}
      target={href.includes('http') ? '_blank' : undefined}
      color="semantic.primary.normal"
      sx={{
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textUnderlineOffset: 'auto',
        textUnderlinePosition: 'from-font',
        textDecorationSkipInk: 'auto',
        textDecorationThickness: '0.5px',
      }}
      href={href}
    />
  ),
  pre: Pre,
  code: CodeBlock,
  Demo,
  PropsTable,
  Thumbnail,
  Anatomy,
  Note,
  SectionLayout,
  SectionFigureGroup,
  SectionFigure,
  SectionStates,
  SectionCustomize,
  SectionHierarchy,
  SectionHierarchyItem,
  SectionVariants,
  DocsCollection,
  table: (props) => (
    <Table
      {...props}
      sx={(theme) => ({
        marginBottom: 40,
        '--wds-table-border-color': theme.semantic.line.solid.alternative,
      })}
    />
  ),
  tr: TableRow,
  td: (props) => (
    <TableCell
      {...props}
      variant="label1"
      sx={(theme) => ({
        color: theme.semantic.label.neutral,
      })}
    />
  ),
  th: TableHeadCell,
  tbody: TableBody,
  tfoot: TableFoot,
  thead: TableHead,
};
