import { FlexBox } from '@wanteddev/wds';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { sentenceCase } from 'change-case';

import { useMDXContext } from '@/features/docs/context';
import {
  MERGE_ONE_FRONTMATTER_PATTERN,
  foundationsElevationNormalFrontmatter,
  foundationsElevationSpreadFrontmatter,
  utilitiesOverviewFrontmatters,
  // utilitiesOverviewAndroidFrontmatter,
  // utilitiesOverviewIosFrontmatter,
  utilitiesOverviewWebFrontmatter,
} from '@/features/docs/constants';

import DocsTitle from '../../title';
import DocsThumbnail from '../../thumbnail';
import RouteTab from '../../route-tab';

import ElevationSummary from './elevation';
import UtilitiesSummary from './utilities';

import type { SlugParams } from '../../lnb/types';

const CustomRenderSummary = () => {
  const { allFrontmatter } = useMDXContext();
  const { slug = [] } = useParams<SlugParams>();

  const hasMergeOneFrontmatter = useMemo(
    () =>
      Object.hasOwn(MERGE_ONE_FRONTMATTER_PATTERN, slug.at(0) ?? '') &&
      Object.keys(
        MERGE_ONE_FRONTMATTER_PATTERN[
          slug.at(0) as keyof typeof MERGE_ONE_FRONTMATTER_PATTERN
        ],
      ).includes(slug.at(-1) ?? ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug.toString()],
  );

  const isUtilityOverview = useMemo(
    () => slug.at(0) === 'utilities',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug.toString()],
  );

  const tabs = useMemo(() => {
    if (hasMergeOneFrontmatter) {
      const firstSegment = slug.at(0) ?? '';

      const PATTERN = new RegExp(
        `${Object.keys(MERGE_ONE_FRONTMATTER_PATTERN[firstSegment as keyof typeof MERGE_ONE_FRONTMATTER_PATTERN]).join('|')}$`,
      );

      const pages = allFrontmatter.filter((v) =>
        v.slug.toString().includes(slug.toString().replace(PATTERN, '')),
      );

      return pages.map((page) => {
        return {
          title: sentenceCase(page.slug.at(-1) ?? ''),
          value: `/docs/${page.slug.join('/')}`,
        };
      });
    }

    if (isUtilityOverview) {
      return utilitiesOverviewFrontmatters.map((frontmatter) => {
        let title;

        switch (frontmatter.slug.at(-1)) {
          case 'android':
            title = 'Android';
            break;
          case 'ios':
            title = 'iOS';
            break;
          case 'web':
          default:
            title = 'Web';
            break;
        }

        return {
          title,
          value: `/docs/${frontmatter.slug.join('/')}`,
        };
      });
    }

    return [];
  }, [isUtilityOverview, hasMergeOneFrontmatter, slug, allFrontmatter]);

  const summary = useMemo(() => {
    switch (slug.join('/')) {
      case foundationsElevationNormalFrontmatter.slug.join('/'):
      case foundationsElevationSpreadFrontmatter.slug.join('/'):
        return <ElevationSummary />;
      case utilitiesOverviewWebFrontmatter.slug.join('/'):
        // case utilitiesOverviewAndroidFrontmatter.slug.join('/'):
        // case utilitiesOverviewIosFrontmatter.slug.join('/'):
        return <UtilitiesSummary />;
      default:
        return null;
    }
  }, [slug]);

  return (
    <>
      <FlexBox flexDirection="column" sx={{ marginBottom: '24px' }}>
        <DocsTitle />
      </FlexBox>

      <DocsThumbnail />

      {summary}

      {tabs.length > 0 && (
        <RouteTab tabs={tabs} sx={{ marginBottom: '56px' }} />
      )}
    </>
  );
};

export default CustomRenderSummary;
