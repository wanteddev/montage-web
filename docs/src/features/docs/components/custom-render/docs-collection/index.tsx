'use client';
import { useMemo } from 'react';
import {
  Card,
  CardCaption,
  CardContent,
  CardThumbnail,
  CardTitle,
  FlexBox,
  Grid,
  GridItem,
  Typography,
} from '@wanteddev/wds';
import { capitalCase, kebabCase } from 'change-case';
import Link from 'next/link';

import { useMDXContext } from '@/features/docs/context';

import HeadingLink from '../../mdx/heading-link';
import { PLATFORM_PATTERN } from '../../lnb/constants';

import type { Frontmatter } from '@/features/docs/types';

type Collection = {
  [key in string]: Array<Frontmatter>;
};

type Props = {
  category: 'foundations' | 'components';
};

const DocsCollection = ({ category }: Props) => {
  const { allFrontmatter } = useMDXContext();

  const collection = useMemo(() => {
    return Object.entries(
      allFrontmatter
        .filter(
          (frontmatter) =>
            frontmatter.slug.at(0) === category &&
            (frontmatter.slug.at(-1)?.match(PLATFORM_PATTERN)
              ? frontmatter.slug.at(frontmatter.slug.length - 1) === 'design'
              : true),
        )
        .reduce((acc, cur) => {
          const key = cur.slug.at(1);

          if (!key) {
            return acc;
          }

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(cur);
          acc[key] = acc[key].sort((a, b) => a.title.localeCompare(b.title));

          return acc;
        }, {} as Collection),
    ).sort((a, b) => a[0].localeCompare(b[0]));
  }, [allFrontmatter, category]);

  return (
    <FlexBox flexDirection="column" gap="80px">
      {collection
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, list], i) => (
          <FlexBox flexDirection="column" key={key + i} gap="24px">
            <Typography
              data-heading=""
              variant="title2"
              weight="bold"
              display="block"
              as="h2"
              id={kebabCase(key)}
              sx={{ scrollMarginTop: 'calc(var(--gnb-height) + 12px)' }}
            >
              <HeadingLink id={kebabCase(key)}>{capitalCase(key)}</HeadingLink>
            </Typography>

            <Grid columnSpacing={32} rowSpacing={12}>
              {list.map((data) => (
                <GridItem
                  key={data.slug.toString()}
                  columns={6}
                  sm={{ columns: 4 }}
                >
                  <Card as={Link} href={`/docs/${data.slug.join('/')}`}>
                    <CardThumbnail
                      src={data.image ?? '/images/placeholder.png'}
                      alt={data.title}
                    />
                    <CardContent>
                      <CardTitle color="semantic.label.normal">
                        {data.title}
                      </CardTitle>
                      <CardCaption>{data.description}</CardCaption>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </FlexBox>
        ))}
    </FlexBox>
  );
};

export default DocsCollection;
