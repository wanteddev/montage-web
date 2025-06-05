'use client';
import { Divider, FlexBox, ScrollArea } from '@wanteddev/wds';
import { Fragment, useEffect, useRef } from 'react';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';
import { useLNBContent } from './hooks';
import { isFrontmatter } from './helpers';
import LnbMobile from './mobile';

const Lnb = () => {
  const { frontmatters } = useLNBContent();

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const activeElement = viewport.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );

    if (activeElement) {
      const offsetTop = activeElement.offsetTop + activeElement.clientHeight;

      viewport.scrollTop = offsetTop - 38;
    }
  }, []);

  return (
    <>
      <LnbMobile frontmatters={frontmatters} />

      <ScrollArea sx={lnbWrapperStyle} viewportRef={viewportRef}>
        <FlexBox
          as="aside"
          sx={{ width: '100%' }}
          flexDirection="column"
          gap="20px"
        >
          <FlexBox as="nav" flexDirection="column" justifyContent="center">
            {frontmatters.map((frontmatter, i) => {
              return (
                <Fragment
                  key={
                    isFrontmatter(frontmatter)
                      ? frontmatter.slug.toString() + i
                      : frontmatter.key + i
                  }
                >
                  <LnbGroup frontmatter={frontmatter} />

                  {i < frontmatters.length - 1 && (
                    <Divider
                      color="semantic.line.solid.alternative"
                      size="calc(100% + 16px)"
                      sx={{ marginLeft: '-8px' }}
                    />
                  )}
                </Fragment>
              );
            })}
          </FlexBox>
        </FlexBox>
      </ScrollArea>
    </>
  );
};

export default Lnb;
