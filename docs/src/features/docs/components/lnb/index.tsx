'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useMDXContext } from '../../contexts';

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

    if (
      activeElement &&
      !viewport
        .querySelectorAll('[role="link"]')
        .item(0)
        .isEqualNode(activeElement)
    ) {
      const offsetTop = activeElement.offsetTop + activeElement.clientHeight;

      viewport.scrollTop = offsetTop - 38;
    } else {
      viewport.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupKey]);

  return (
    <ScrollArea sx={lnbWrapperStyle} viewportRef={viewportRef} size="small">
      <FlexBox
        as="aside"
        aria-label={`Pages of ${groupKey}`}
        data-algolia-lnb-group
        sx={{ width: '100%' }}
        flexDirection="column"
      >
        <FlexBox flexDirection="column" justifyContent="center">
          <LnbGroup frontmatters={frontmatters} />
        </FlexBox>
      </FlexBox>
    </ScrollArea>
  );
};

export default Lnb;
