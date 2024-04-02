'use client';
import {
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
        <ModalContent padding paddingExtra>
          <ModalContentItem>
            {routes.map((route, idx) => (
              <FlexBox
                key={idx}
                flexDirection="column"
                gap="4px"
                css={{
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
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default MobileMenu;
