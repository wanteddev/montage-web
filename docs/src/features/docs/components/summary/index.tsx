import { Divider, FlexBox } from '@wanteddev/wds';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { sentenceCase } from 'change-case';

import { useMDXContext } from '../../contexts';
import RouteTab from '../route-tab';
import DocsTitle from '../title';
import DocsThumbnail from '../thumbnail';

import type { SlugParams } from '../lnb/types';

const DocsSummary = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const tabs = useMemo(() => {
    if (!/(web|ios|android|design)$/.test(params.slug?.toString() ?? '')) {
      return [];
    }

    const pages = allFrontmatter.filter((v) =>
      v.slug
        .toString()
        .includes(
          params.slug?.toString().replace(/(web|ios|android|design)$/, '') ??
            '',
        ),
    );

    return pages
      .map((page) => {
        return {
          title: sentenceCase(page.slug.at(page.slug.length - 1)!).replace(
            /ios/i,
            'iOS',
          ),
          value: `/docs/${page.slug.join('/')}`,
        };
      })
      .sort((a, b) => {
        const sortedObj: { [key: string]: number } = {
          design: 3,
          web: 2,
          ios: 1,
          android: 0,
        };

        return (
          (sortedObj[b.title.toLowerCase()] ?? 0) -
          (sortedObj[a.title.toLowerCase()] ?? 0)
        );
      });
  }, [allFrontmatter, params.slug]);

  return (
    <>
      <FlexBox flexDirection="column">
        <DocsTitle />
      </FlexBox>

      <DocsThumbnail />

      {tabs.length > 0 ? (
        <RouteTab tabs={tabs} />
      ) : (
        <Divider
          sx={{ margin: '64px 0px 64px' }}
          color="semantic.line.normal.neutral"
        />
      )}
    </>
  );
};

export default DocsSummary;
