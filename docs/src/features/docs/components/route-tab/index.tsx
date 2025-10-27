import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Tab, TabList, TabListItem } from '@wanteddev/wds';
import Link from 'next/link';

import useThrottle from '@/hooks/use-throttle';
import { GNB_HEIGHT } from '@/features/layout/constants';

import useRouteScroll from '../../hooks/use-route-scroll';

import { tabScrollStyle, tabStyle } from './style';

import type { SxProp } from '@wanteddev/wds';
import type { SlugParams } from '../lnb/types';

type Props = {
  tabs: Array<{
    title: string;
    value: string;
  }>;
  sx?: SxProp;
};

const RouteTab = ({ tabs, sx }: Props) => {
  const params = useParams<SlugParams>();
  const tabRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);

  const [value, setValue] = useState(`/docs/${params.slug?.join('/')}`);

  useEffect(() => {
    setValue(`/docs/${params.slug?.join('/')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug?.toString()]);

  const handleScroll = useThrottle(() => {
    const top = tabRef.current?.getBoundingClientRect().top ?? GNB_HEIGHT + 1;

    setIsSticky(top <= GNB_HEIGHT);
  }, 250);

  useEffect(() => {
    handleScroll();

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsSticky, handleScroll, params.slug?.toString()]);

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      if (isSticky) {
        tabRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }, [isSticky]),
  );

  const handleValueChange = useCallback(
    (v: string) => {
      setValue(v);
      handleRouteChange();
    },
    [handleRouteChange],
  );

  return (
    <>
      <Box role="presentation" ref={tabRef} sx={tabScrollStyle} />

      <Tab value={value} onValueChange={handleValueChange}>
        <TabList sx={[tabStyle, sx]} size="large">
          {tabs.map((tab) => (
            <TabListItem
              as={Link}
              scroll={false}
              prefetch
              href={tab.value}
              key={tab.title}
              value={tab.value}
            >
              {tab.title}
            </TabListItem>
          ))}
        </TabList>
      </Tab>
    </>
  );
};

export default RouteTab;
