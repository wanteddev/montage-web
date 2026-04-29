'use client';
import { FlexBox, Typography } from '@wanteddev/wds';
import { IconArrowRightThick } from '@wanteddev/wds-icon';
import Link from 'next/link';
import { useCallback } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { Heading2 } from '../../mdx/section/layout';

import { TEMPLATE_ITEMS } from './constants';
import { interactionArrowStyle, linkStyle } from './style';

const TemplatesOverview = () => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <>
      <Heading2 content="Templates" />

      {TEMPLATE_ITEMS.map((item) => (
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
              sx={{ width: '120px' }}
            >
              {item.title}
            </Typography>

            <Typography
              variant="label1"
              weight="medium"
              color="semantic.label.neutral"
              sm={{ sx: { paddingBlock: '1px' } }}
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

export default TemplatesOverview;
