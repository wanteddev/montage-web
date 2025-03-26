'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';

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
        <FlexBox as="nav" flexDirection="column" gap="4px">
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
  );
};

export default Lnb;
