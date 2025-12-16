'use client';
import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowRightThick } from '@wanteddev/wds-icon';
import { useCallback } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';
import { getImageUrl } from '@/helpers/image';

import { Heading2 } from '../../mdx/section/layout';

import { BASE_MATERIAL_ITEMS } from './constants';
import { interactionArrowStyle, linkStyle, thumbnailStyle } from './style';

const FoundationsOverview = () => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <>
      <Thumbnail
        src={getImageUrl('/foundations/overview/Image.png')}
        alt="Foundations Overview"
        aria-hidden
        radius
        sx={thumbnailStyle}
      />

      <Heading2 content="Base material" />

      {BASE_MATERIAL_ITEMS.map((item) => (
        <FlexBox
          as={Link}
          href={item.href}
          key={item.title}
          onClick={handleRouteChange}
          gap="12px"
          alignItems="center"
          sx={linkStyle}
        >
          <FlexBox
            gap="6px"
            flex="1 1 0"
            flexDirection="column"
            sm={{ gap: '12px', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography
              variant="body2"
              weight="bold"
              color="semantic.label.normal"
              display="block"
              sx={{
                width: '120px',
              }}
            >
              {item.title}
            </Typography>

            <Typography
              variant="label1"
              weight="medium"
              color="semantic.label.neutral"
              sm={{
                sx: {
                  paddingBlock: '1px',
                },
              }}
            >
              {item.description}
            </Typography>
          </FlexBox>

          <IconArrowRightThick
            sx={interactionArrowStyle}
            aria-hidden
            data-role="interaction-arrow"
          />
        </FlexBox>
      ))}
    </>
  );
};

export default FoundationsOverview;
