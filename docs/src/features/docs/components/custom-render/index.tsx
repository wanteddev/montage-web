'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  foundationsElevationFrontmatter,
  foundationsGridAndLayoutFrontmatter,
  foundationsTypographyFrontmatter,
} from '../../constants';

import CustomRenderLayout from './layout';
import FoundationsTypography from './foundations/typography';
import FoundationsGridAndLayout from './foundations/grid-and-layout';
import FoundationsElevation from './foundations/elevation';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  const component = useMemo(() => {
    switch (slug.join('/')) {
      case foundationsTypographyFrontmatter.slug.join('/'):
        return <FoundationsTypography />;

      case foundationsGridAndLayoutFrontmatter.slug.join('/'):
        return <FoundationsGridAndLayout />;

      case foundationsElevationFrontmatter.slug.join('/'):
        return <FoundationsElevation />;

      default:
        return null;
    }
  }, [slug]);

  return <CustomRenderLayout>{component}</CustomRenderLayout>;
};

export default CustomRender;
