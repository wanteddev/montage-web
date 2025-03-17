'use client';
import {
  FlexBox,
  ScrollArea,
  SegmentedControl,
  SegmentedControlItem,
} from '@wanteddev/wds';

import { lnbWrapperStyle } from './style';
import LNBGroup from './lnb-group';
import { useLNBContent } from './hooks';

const LNB = () => {
  const { frontmatters, category, handleCategoryChange } = useLNBContent();

  return (
    <ScrollArea sx={lnbWrapperStyle}>
      <FlexBox
        as="aside"
        sx={{ width: '100%' }}
        flexDirection="column"
        gap="8px"
      >
        <SegmentedControl value={category} onValueChange={handleCategoryChange}>
          <SegmentedControlItem value="design">Design</SegmentedControlItem>
          <SegmentedControlItem value="develop">Develop</SegmentedControlItem>
        </SegmentedControl>

        <FlexBox as="nav" flexDirection="column" gap="4px">
          {frontmatters.map((frontmatter, i) => {
            return (
              <LNBGroup key={frontmatter.key + i} frontmatter={frontmatter} />
            );
          })}
        </FlexBox>
      </FlexBox>
    </ScrollArea>
  );
};

export default LNB;
