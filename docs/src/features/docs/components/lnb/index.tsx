'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useMDXContext } from '../../context';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';

const Lnb = () => {
  const pathname = usePathname();

  const currentSlug = pathname.split('/').filter(Boolean);

  const { groupedPages } = useMDXContext();

  const groupKey = currentSlug.at(1);
  const frontmatters =
    groupKey && groupedPages[groupKey] ? groupedPages[groupKey] : [];

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || currentSlug.length === 1) return;

    const activeElement = viewport.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );

    if (activeElement) {
      const offsetTop = activeElement.offsetTop + activeElement.clientHeight;

      viewport.scrollTop = offsetTop - 38;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea sx={lnbWrapperStyle} viewportRef={viewportRef} size="small">
      <FlexBox
        as="aside"
        data-algolia-lnb-group
        sx={{ width: '100%' }}
        flexDirection="column"
      >
        <FlexBox as="nav" flexDirection="column" justifyContent="center">
          <LnbGroup frontmatters={frontmatters} />
        </FlexBox>
      </FlexBox>
    </ScrollArea>
  );
};

export default Lnb;
