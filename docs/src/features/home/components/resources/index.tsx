'use client';
import { Box, FlexBox, Typography } from '@wanteddev/wds';

import SectionWrapper from '../section/wrapper';
import SectionTitle from '../section/title';

import { itemDividerStyle } from './style';
import { RESOURCE_ITEMS } from './constants';

const Resources = () => {
  return (
    <SectionWrapper gap="24px">
      <SectionTitle>Start Your Montage</SectionTitle>

      <FlexBox gap="48px" justifyContent="space-between">
        {RESOURCE_ITEMS.map((item) => (
          <FlexBox key={item.title} gap="20px" flex="1 0 0">
            <Box as="hr" sx={itemDividerStyle(item.color)} />

            <FlexBox flexDirection="column" gap="6px">
              <Typography
                variant="heading2"
                weight="bold"
                color="semantic.label.normal"
                as="p"
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                weight="medium"
                color="semantic.label.alternative"
                as="p"
              >
                {item.createdAt}
              </Typography>
            </FlexBox>
          </FlexBox>
        ))}
      </FlexBox>
    </SectionWrapper>
  );
};

export default Resources;
