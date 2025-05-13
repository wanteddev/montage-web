'use client';
import { Divider, FlexBox, ScrollArea } from '@wanteddev/wds';
import { Fragment } from 'react';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';
import { useLNBContent } from './hooks';
import { isFrontmatter } from './helpers';

const Lnb = () => {
  const { frontmatters } = useLNBContent();

  return (
    <ScrollArea sx={lnbWrapperStyle}>
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
  );
};

export default Lnb;
