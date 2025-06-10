'use client';

import { useParams } from 'next/navigation';

import {
  isComponentOverview,
  isFoundationsOverview,
  isGetStarted,
} from '../../helpers/overview';

import FoundationsOverview from './foundations-overview';
import GetStarted from './get-started';
import ComponentsOverview from './components-overview';

import type { SlugParams } from '../lnb/types';

const CustomRender = () => {
  const { slug = [] } = useParams<SlugParams>();

  if (isFoundationsOverview(slug)) {
    return <FoundationsOverview />;
  }

  if (isComponentOverview(slug)) {
    return <ComponentsOverview />;
  }

  if (isGetStarted(slug)) {
    return <GetStarted />;
  }

  return null;
};

export default CustomRender;
