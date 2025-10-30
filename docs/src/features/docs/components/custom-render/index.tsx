'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { FlexBox } from '@wanteddev/wds';

import {
  componentOverviewFrontmatter,
  foundationsColorsAtomicFrontmatter,
  foundationsColorsSemanticFrontmatter,
  foundationsElevationNormalFrontmatter,
  foundationsElevationSpreadFrontmatter,
  foundationsGridFrontmatter,
  foundationsOverviewFrontmatter,
  foundationsTypographyFrontmatter,
  gettingStartedFrontmatter,
  // utilitiesOverviewAndroidFrontmatter,
  // utilitiesOverviewIosFrontmatter,
  utilitiesOverviewWebFrontmatter,
} from '../../constants';

import FoundationsTypography from './foundations/typography';
import FoundationsGrid from './foundations/grid';
import FoundationsElevationNormal from './foundations/elevation/normal';
import DocsCollection from './docs-collection';
import GettingStarted from './getting-started';
import { wrapperStyle } from './style';
import FoundationsElevationSpread from './foundations/elevation/spread';
import FoundationsColorsAtomic from './foundations/colors/atomic';
import FoundationsColorsSemantic from './foundations/colors/semantic';
import FoundationsOverview from './foundations/overview';
import UtilitiesOverview from './utilities/overview';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  const component = useMemo(() => {
    switch (slug.join('/')) {
      case gettingStartedFrontmatter.slug.join('/'):
        return <GettingStarted />;

      case foundationsTypographyFrontmatter.slug.join('/'):
        return <FoundationsTypography />;

      case foundationsColorsAtomicFrontmatter.slug.join('/'):
        return <FoundationsColorsAtomic />;

      case foundationsColorsSemanticFrontmatter.slug.join('/'):
        return <FoundationsColorsSemantic />;

      case foundationsGridFrontmatter.slug.join('/'):
        return <FoundationsGrid />;

      case foundationsElevationNormalFrontmatter.slug.join('/'):
        return <FoundationsElevationNormal />;

      case foundationsElevationSpreadFrontmatter.slug.join('/'):
        return <FoundationsElevationSpread />;

      case foundationsOverviewFrontmatter.slug.join('/'):
        return <FoundationsOverview />;

      case componentOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="components" />;

      case utilitiesOverviewWebFrontmatter.slug.join('/'):
        return <UtilitiesOverview platform="web" />;

      // case utilitiesOverviewAndroidFrontmatter.slug.join('/'):
      //   return <UtilitiesOverview platform="android" />;

      // case utilitiesOverviewIosFrontmatter.slug.join('/'):
      //   return <UtilitiesOverview platform="ios" />;

      default:
        return null;
    }
  }, [slug]);

  return (
    <FlexBox flexDirection="column" sx={wrapperStyle}>
      {component}
    </FlexBox>
  );
};

export default CustomRender;
