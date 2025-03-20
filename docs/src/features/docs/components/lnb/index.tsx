'use client';
import { FlexBox, ScrollArea } from '@wanteddev/wds';

import { lnbWrapperStyle } from './style';
import LnbGroup from './group';
import { useLNBContent } from './hooks';

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
              <LnbGroup key={frontmatter.key + i} frontmatter={frontmatter} />
            );
          })}
        </FlexBox>
      </FlexBox>
    </ScrollArea>
  );
};

export default Lnb;
