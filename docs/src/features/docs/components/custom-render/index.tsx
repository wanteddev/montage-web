'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  componentOverviewFrontmatter,
  foundationsElevationFrontmatter,
  foundationsGridFrontmatter,
  foundationsOverviewFrontmatter,
  foundationsTypographyFrontmatter,
} from '../../constants';

import CustomRenderLayout from './layout';
import FoundationsTypography from './foundations/typography';
import FoundationsGrid from './foundations/grid';
import FoundationsElevation from './foundations/elevation';
import DocsCollection from './docs-collection';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  const component = useMemo(() => {
    switch (slug.join('/')) {
      case foundationsTypographyFrontmatter.slug.join('/'):
        return <FoundationsTypography />;

      case foundationsGridFrontmatter.slug.join('/'):
        return <FoundationsGrid />;

      case foundationsElevationFrontmatter.slug.join('/'):
        return <FoundationsElevation />;

      case foundationsOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="foundations" />;

      case componentOverviewFrontmatter.slug.join('/'):
        return <DocsCollection category="components" />;

      default:
        return null;
    }
  }, [slug]);

  return <CustomRenderLayout>{component}</CustomRenderLayout>;
};

export default CustomRender;
