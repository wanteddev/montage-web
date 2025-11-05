'use client';
import { Divider, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowUpRight } from '@wanteddev/wds-icon';

import FadeInOut from '@/components/fade-in-out';

import SectionWrapper from '../section/wrapper';
import SectionTitle from '../section/title';

import { itemDividerStyle, itemImageStyle, itemWrapperStyle } from './style';
import { RESOURCE_ITEMS } from './constants';

const Resources = () => {
  return (
    <SectionWrapper gap="20px" md={{ gap: '24px' }}>
      <FadeInOut duration={600}>
        <SectionTitle>Start Your Montage</SectionTitle>
      </FadeInOut>

      <FlexBox
        gap="0px"
        flexDirection="column"
        md={{
          gap: '16px',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        sx={{ position: 'relative' }}
      >
        <Divider color="semantic.line.normal.neutral" sx={itemDividerStyle} />

        {RESOURCE_ITEMS.map((item, idx) => (
          <FadeInOut duration={600} delay={(idx + 1) * 100} key={item.title}>
            <FlexBox
              gap="16px"
              flex="1 0 0"
              alignItems="center"
              md={{
                gap: '53px',
                flexDirection: 'column',
                alignItems: 'initial',
              }}
              sx={itemWrapperStyle}
              as={Link}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Thumbnail
                src={item.image}
                alt={item.title}
                sx={itemImageStyle}
              />

              <FlexBox
                gap="6px"
                flex="1"
                justifyContent="space-between"
                alignItems="center"
                md={{
                  flexDirection: 'column',
                  alignItems: 'initial',
                }}
              >
                <FlexBox gap="12px">
                  <Typography
                    variant="headline2"
                    weight="bold"
                    color="semantic.label.normal"
                    as="p"
                    md={{
                      variant: 'headline1',
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
          </FadeInOut>
        ))}
      </FlexBox>
    </SectionWrapper>
  );
};

export default Resources;
