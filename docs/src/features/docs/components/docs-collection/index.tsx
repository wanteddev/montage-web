'use client';
import { useMemo } from 'react';
import {
  Card,
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

import HeadingLink from '../mdx/heading-link';

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
    return allFrontmatter
      .filter(
        (frontmatter) =>
          frontmatter.slug.at(0) === category &&
          frontmatter.slug.at(frontmatter.slug.length - 1) === 'design',
      )
      .reduce((acc, cur) => {
        const key = cur.slug.at(1);

        if (!key) {
          return acc;
        }

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key]!.push(cur);

        return acc;
      }, {} as Collection);
  }, [allFrontmatter, category]);

  return (
    <FlexBox flexDirection="column">
      {Object.entries(collection).map(([key, list], i) => (
        <FlexBox flexDirection="column" key={key + i}>
          <Typography
            data-heading=""
            variant="title2"
            weight="bold"
            display="block"
            as="h2"
            id={kebabCase(key)}
          >
            <HeadingLink id={kebabCase(key)}>{capitalCase(key)}</HeadingLink>
          </Typography>

          <Grid sx={{ marginBottom: 20 }}>
            {list.map((data) => (
              <GridItem key={data.slug.toString()} columns={3}>
                <Card as={Link} href={`/docs/${data.slug.join('/')}`}>
                  <CardThumbnail
                    // TODO: fallback image
                    src={data.image ?? '/images/placeholder.png'}
                    alt={data.title}
                    width="500px"
                    quality={95}
                  />
                  <CardContent>
                    <CardTitle>{data.title}</CardTitle>
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
