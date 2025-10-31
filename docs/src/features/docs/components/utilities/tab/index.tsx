'use client';
import { Box } from '@wanteddev/wds';
import Image from 'next/image';
import { useMemo } from 'react';

import RouteTab from '../../route-tab';

import { wrapperStyle } from './style';

const defaultPlatform = 'web';
const platforms = ['web'];

const UtilitiesTab = () => {
  const tabs = useMemo(() => {
    return platforms.map((platform) => {
      let title;

      switch (platform) {
        case 'web':
          title = 'Web';
          break;
        case 'android':
          title = 'Android';
          break;
        case 'ios':
          title = 'iOS';
          break;
      }

      return {
        title: title ?? '',
        value: `/docs/utilities${platform === defaultPlatform ? '' : `/${platform}`}`,
      };
    });
  }, []);

  return (
    <>
      <Box sx={wrapperStyle}>
        <Box
          as={Image}
          src="/utilities/overview/Image.png"
          width={760}
          height={226}
          alt="Utilities Overview"
          fetchPriority="high"
          priority
        />
      </Box>

      <RouteTab tabs={tabs} />
    </>
  );
};

export default UtilitiesTab;
