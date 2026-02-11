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

import HeadingLink from '../heading-link';
import CodeBlock from '../code-block';
import Pre from '../pre';
import Demo from '../demo';
import PropsTable from '../props-table';
import SectionAnatomy from '../section/anatomy';
import { SectionLayout } from '../section/layout';
import SectionFigureGroup from '../section/figure-group';
import SectionFigure from '../section/figure';
import SectionStates from '../section/states';
import SectionCustomize from '../section/customize';
import { SectionHierarchy, SectionHierarchyItem } from '../section/hierarchy';
import SectionVariants from '../section/variants';
import {
  SectionAccessibility,
  SectionAccessibilityTable,
} from '../section/accessibility';
import Anchor from '../anchor';
import VariantGrid from '../../foundations/typography/variant-grid';

import type { ReactNode } from 'react';

export const MDX_COMPONENTS: { [key: string]: (props: any) => ReactNode } = {
  h1: (props) => (
    <Typography {...props} variant="display3" weight="bold" as="h1" />
  ),
  h2: ({ children, id, ...props }) => (
    <Typography
      {...props}
      data-heading=""
      variant="heading1"
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
      variant="headline2"
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
      variant="body1"
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
      variant="label2"
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
      variant="caption2"
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
      variant="body2-reading"
      weight="medium"
      as="p"
      display="block"
    />
  ),
  a: Anchor,
  pre: Pre,
  code: CodeBlock,
  Demo,
  PropsTable,
  TypographyVariantsGrid: VariantGrid,
  SectionLayout,
  SectionAnatomy,
  SectionFigureGroup,
  SectionFigure,
  SectionStates,
  SectionCustomize,
  // WIP
  SectionStatesItem: () => null,
  SectionHierarchy,
  SectionHierarchyItem,
  SectionVariants,
  SectionAccessibility,
  SectionAccessibilityTable,
  table: (props) => (
    <Table
      {...props}
      data-role="table"
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
