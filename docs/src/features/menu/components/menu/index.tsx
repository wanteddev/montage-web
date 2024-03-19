'use client';
import {
  FlexBox,
  ScrollArea,
  Typography,
  WithInteraction,
} from '@wanteddev/wds';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { routes } from '@/docs/routes';

import { menuLinkStyle, menuWrapperStyle } from './style';

const Menu = () => {
  const params = useParams();

  const activeSlug = Array.isArray(params.slug)
    ? '/docs/' + params.slug.join('/')
    : '/docs/' + params.slug;

  return (
    <FlexBox css={menuWrapperStyle} flexDirection="column">
      <ScrollArea>
        {routes.map((route, idx) => (
          <FlexBox
            key={idx}
            flexDirection="column"
            gap="4px"
            css={{ marginBottom: '20px', padding: '0px 20px' }}
          >
            <Typography
              as="h4"
              variant="body1_normal"
              weight="bold"
              color="palette.label.normal"
            >
              {route.label}
            </Typography>

            {route.pages.map((page) => (
              <WithInteraction key={page.slug}>
                <Typography
                  as={Link}
                  href={page.slug}
                  data-active={activeSlug === page.slug}
                  css={menuLinkStyle}
                  variant="body2_normal"
                  weight={activeSlug === page.slug ? 'medium' : 'regular'}
                  color={
                    activeSlug === page.slug
                      ? 'palette.primary.normal'
                      : 'palette.label.normal'
                  }
                >
                  {page.title}
                </Typography>
              </WithInteraction>
            ))}
          </FlexBox>
        ))}
      </ScrollArea>
    </FlexBox>
  );
};

export default Menu;
