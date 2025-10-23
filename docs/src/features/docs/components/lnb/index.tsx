'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';
import { useLNBContent } from './hooks';
import { isFrontmatter } from './helpers';
import LnbMobile from './mobile';

import type { SlugParams } from './types';

const Lnb = () => {
  const params = useParams<SlugParams>();

  const { frontmatters } = useLNBContent();

  const filteredFrontmatters = frontmatters.filter((item) => {
    return item.key.replace(/ /g, '-').toLowerCase() === params.slug?.at(0);
  });

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || params.slug?.length === 1) return;

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
    <>
      <LnbMobile frontmatters={frontmatters} />

      <ScrollArea sx={lnbWrapperStyle} viewportRef={viewportRef} size="small">
        <FlexBox
          as="aside"
          data-algolia-lnb-group
          sx={{ width: '100%' }}
          flexDirection="column"
        >
          <FlexBox as="nav" flexDirection="column" justifyContent="center">
            {filteredFrontmatters.map((frontmatter, i) => {
              return (
                <LnbGroup
                  key={
                    isFrontmatter(frontmatter)
                      ? frontmatter.slug.toString() + i
                      : frontmatter.key + i
                  }
                  frontmatter={frontmatter}
                />
              );
            })}
          </FlexBox>
        </FlexBox>
      </ScrollArea>
    </>
  );
};

export default Lnb;
