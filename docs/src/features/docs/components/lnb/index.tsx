'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';
import { useEffect, useRef } from 'react';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';
import { useLNBContent } from './hooks';
import { isFrontmatter } from './helpers';
import LnbMobile from './mobile';
import { useLnbContext } from './contexts';

const Lnb = () => {
  const { frontmatters } = useLNBContent();

  const lnbContext = useLnbContext();

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || lnbContext.hide) return;

    const activeElement = viewport.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );

    if (activeElement) {
      const offsetTop = activeElement.offsetTop + activeElement.clientHeight;

      viewport.scrollTop = offsetTop - 38;
    }
  }, [lnbContext.hide]);

  return (
    <>
      <LnbMobile frontmatters={frontmatters} />

      <ScrollArea
        sx={lnbWrapperStyle}
        aria-hidden={lnbContext.hide}
        viewportRef={viewportRef}
        size="small"
      >
        <FlexBox
          as="aside"
          data-algolia-lnb-group
          sx={{ width: '100%' }}
          flexDirection="column"
          gap="20px"
        >
          <FlexBox as="nav" flexDirection="column" justifyContent="center">
            {frontmatters.map((frontmatter, i) => {
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
