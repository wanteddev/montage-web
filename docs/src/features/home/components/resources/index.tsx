'use client';
import { Box, FlexBox, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowUpRight } from '@wanteddev/wds-icon';

import SectionWrapper from '../section/wrapper';
import SectionTitle from '../section/title';

import { itemDividerStyle, itemLinkStyle } from './style';
import { RESOURCE_ITEMS } from './constants';

const Resources = () => {
  return (
    <SectionWrapper gap="20px" md={{ gap: '24px' }}>
      <SectionTitle>Start Your Montage</SectionTitle>

      <FlexBox
        gap="24px"
        flexDirection="column"
        md={{
          gap: '48px',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {RESOURCE_ITEMS.map((item) => (
          <FlexBox
            key={item.title}
            gap="12px"
            flex="1 0 0"
            md={{ gap: '20px' }}
          >
            <Box as="hr" sx={itemDividerStyle(item.color)} />

            <FlexBox
              gap="6px"
              as={Link}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={itemLinkStyle}
              flex="1"
              justifyContent="space-between"
              md={{
                flexDirection: 'column',
              }}
            >
              <FlexBox gap="12px">
                <Typography
                  variant="headline1"
                  weight="bold"
                  color="semantic.label.normal"
                  as="p"
                  md={{
                    variant: 'heading2',
                  }}
                >
                  {item.title}
                </Typography>

                <IconArrowUpRight aria-hidden data-role="interaction-arrow" />
              </FlexBox>

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
