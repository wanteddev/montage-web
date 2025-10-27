'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { FlexBox } from '@wanteddev/wds';

import {
  componentOverviewFrontmatter,
  foundationsElevationNormalFrontmatter,
  foundationsElevationSpreadFrontmatter,
  foundationsGridFrontmatter,
  foundationsOverviewFrontmatter,
  foundationsTypographyFrontmatter,
  gettingStartedFrontmatter,
  utilitiesOverviewFrontmatter,
} from '../../constants';

import FoundationsTypography from './foundations/typography';
import FoundationsGrid from './foundations/grid';
import FoundationsElevationNormal from './foundations/elevation/normal';
import DocsCollection from './docs-collection';
import GettingStarted from './getting-started';
import { wrapperStyle } from './style';
import FoundationsElevationSpread from './foundations/elevation/spread';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  const component = useMemo(() => {
    switch (slug.join('/')) {
      case gettingStartedFrontmatter.slug.join('/'):
        return <GettingStarted />;

      case foundationsTypographyFrontmatter.slug.join('/'):
        return <FoundationsTypography />;

      case foundationsGridFrontmatter.slug.join('/'):
        return <FoundationsGrid />;

      case foundationsElevationNormalFrontmatter.slug.join('/'):
        return <FoundationsElevationNormal />;

      case foundationsElevationSpreadFrontmatter.slug.join('/'):
        return <FoundationsElevationSpread />;

      case foundationsOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="foundations" />;

      case componentOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="components" />;

      case utilitiesOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="utilities" />;

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
