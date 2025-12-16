'use client';
import { Box } from '@wanteddev/wds';
import Image from 'next/image';
import { useMemo } from 'react';

import { getImageUrl } from '@/helpers/image';

import RouteTab from '../../route-tab';

import { wrapperStyle } from './style';

const defaultPlatform = 'web';
const platforms = ['web', 'ios', 'android'];

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
          src={getImageUrl('/utilities/overview/Image.png')}
          width={760}
          height={232}
          alt="Utilities Overview"
          aria-hidden
          fetchPriority="high"
          priority
        />
      </Box>

      <RouteTab tabs={tabs} />
    </>
  );
};

export default UtilitiesTab;
