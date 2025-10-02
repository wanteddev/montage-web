'use client';

import { useParams } from 'next/navigation';

import {
  isComponentOverview,
  isFoundationsOverview,
  isGetStarted,
} from '../../helpers/overview';
import {
  componentOverviewFrontmatter,
  foundationsOverviewFrontmatter,
  getStartedFrontmatter,
} from '../../constants';

import FoundationsOverview from './foundations-overview';
import GetStarted from './get-started';
import ComponentsOverview from './components-overview';
import CustomRenderLayout from './layout';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  if (isFoundationsOverview(slug)) {
    return (
      <CustomRenderLayout frontmatter={foundationsOverviewFrontmatter}>
        <FoundationsOverview />
      </CustomRenderLayout>
    );
  }

  if (isComponentOverview(slug)) {
    return (
      <CustomRenderLayout frontmatter={componentOverviewFrontmatter}>
        <ComponentsOverview />
      </CustomRenderLayout>
    );
  }

  if (isGetStarted(slug)) {
    return (
      <CustomRenderLayout frontmatter={getStartedFrontmatter}>
        <GetStarted />
      </CustomRenderLayout>
    );
  }

  return null;
};

export default CustomRender;
