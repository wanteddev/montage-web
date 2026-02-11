'use client';
import { useMemo } from 'react';
import { sentenceCase } from 'change-case';

import RouteTab from '../../../route-tab';

const pages = ['semantic', 'atomic'];

const ColorsTab = () => {
  const tabs = useMemo(() => {
    return pages.map((page) => {
      return {
        title: sentenceCase(page),
        value: `/docs/foundations/base-material/colors/${page}`,
      };
    });
  }, []);

  return <RouteTab tabs={tabs} sx={{ marginTop: '40px' }} />;
};

export default ColorsTab;
