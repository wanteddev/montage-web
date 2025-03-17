'use client';
import {
  ContentBadge,
  FlexBox,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  Typography,
  WithInteraction,
} from '@wanteddev/wds';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { routes } from '@/docs/routes';

import { useMobileMenuContext } from '../../context';

import { menuLinkStyle } from './style';

const MobileMenu = () => {
  const params = useParams();
  const context = useMobileMenuContext();

  const activeSlug = Array.isArray(params.slug)
    ? '/docs/' + params.slug.join('/')
    : '/docs/' + params.slug;

  return (
    <Modal open={context.open} onOpenChange={context.setOpen}>
      <ModalContainer variant="full">
        <ModalNavigation variant="floating" />
        <ModalContent>
          <ModalContentItem>
            {routes.map((route, idx) => (
              <FlexBox
                key={idx}
                flexDirection="column"
                gap="4px"
                sx={{
                  marginBottom: '20px',
                  paddingRight: '20px',
                }}
              >
                <Typography
                  as="h4"
                  variant="body1"
                  weight="bold"
                  color="semantic.label.normal"
                >
                  {route.label}
                </Typography>

                {route.pages.map((page, i) => (
                  <WithInteraction key={page.slug + i}>
                    <FlexBox
                      as={Link}
                      href={page.slug}
                      gap="8px"
                      alignItems="center"
                      data-active={activeSlug === page.slug}
                      sx={menuLinkStyle}
                    >
                      <Typography
                        variant="body2"
                        weight={activeSlug === page.slug ? 'medium' : 'regular'}
                        color={
                          activeSlug === page.slug
                            ? 'semantic.primary.normal'
                            : 'semantic.label.normal'
                        }
                      >
                        {page.title}
                      </Typography>

                      {page.stable && (
                        <ContentBadge
                          color="accent"
                          accentColor="semantic.status.positive"
                        >
                          Stable
                        </ContentBadge>
                      )}

                      {page.deprecated && (
                        <ContentBadge
                          color="accent"
                          accentColor="semantic.status.negative"
                        >
                          Deprecated
                        </ContentBadge>
                      )}

                      {page.alpha && (
                        <ContentBadge
                          color="accent"
                          accentColor="semantic.accent.foreground.redOrange"
                        >
                          Alpha
                        </ContentBadge>
                      )}
                    </FlexBox>
                  </WithInteraction>
                ))}
              </FlexBox>
            ))}
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default MobileMenu;
