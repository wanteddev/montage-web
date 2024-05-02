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
    <FlexBox as="nav" sx={menuWrapperStyle} flexDirection="column">
      <ScrollArea>
        {routes.map((route, idx) => (
          <FlexBox
            key={idx}
            as="ul"
            flexDirection="column"
            gap="4px"
            sx={{
              marginBottom: '20px',
              paddingRight: '20px',
            }}
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
              <FlexBox as="li" flex="1" key={page.slug}>
                <WithInteraction>
                  <Typography
                    as={Link}
                    href={page.slug}
                    data-active={activeSlug === page.slug}
                    sx={menuLinkStyle}
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
              </FlexBox>
            ))}
          </FlexBox>
        ))}
      </ScrollArea>
    </FlexBox>
  );
};

export default Menu;
