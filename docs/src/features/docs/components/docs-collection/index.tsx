'use client';
import { useCallback, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardThumbnail,
  CardTitle,
  FlexBox,
  Grid,
  GridItem,
} from '@wanteddev/wds';
import { capitalCase } from 'change-case';
import Link from 'next/link';

import { useMDXContext } from '@/features/docs/contexts';
import { getImageUrl } from '@/helpers/image';

import { PLATFORM_PATTERN } from '../../constants';
import { Heading2 } from '../mdx/section/layout';
import useRouteScroll from '../../hooks/use-route-scroll';

import type { Frontmatter } from '@/features/docs/types';

type Collection = {
  [key in string]: Array<Frontmatter>;
};

type Props = {
  category: 'foundations' | 'components' | 'utilities';
};

const DocsCollection = ({ category }: Props) => {
  const { allFrontmatter } = useMDXContext();

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

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
    <FlexBox flexDirection="column" gap="40px" sx={{ marginTop: '32px' }}>
      {collection
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, list], i) => (
          <FlexBox flexDirection="column" key={key + i}>
            <Heading2 content={capitalCase(key)} />

            <Grid columnSpacing={8} rowSpacing={12}>
              {list.map((data) => (
                <GridItem
                  key={data.slug.toString()}
                  columns={6}
                  sm={{ columns: 4 }}
                >
                  <Card
                    as={Link}
                    prefetch={false}
                    onClick={handleRouteChange}
                    href={`/docs/${data.slug.join('/')}`}
                    sx={{
                      marginBottom: '22px',
                      figure: {
                        borderRadius: '12px !important',
                        '&::after': {
                          border: 'none !important',
                        },
                      },
                    }}
                  >
                    <CardThumbnail
                      src={getImageUrl(
                        data.ogImage ?? data.image ?? '/images/placeholder.png',
                      )}
                      alt={data.title}
                      aria-hidden
                      ratio="16:9"
                      width="100%"
                    />
                    <CardContent>
                      <CardTitle
                        variant="body1"
                        weight="medium"
                        color="semantic.label.neutral"
                        sx={{ '&&': { margin: '0px' } }}
                      >
                        {data.title}
                      </CardTitle>
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
