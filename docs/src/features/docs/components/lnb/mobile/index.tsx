import {
  Box,
  FlexBox,
  Modal,
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalNavigation,
  Typography,
} from '@wanteddev/wds';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconArrowLeftThick, IconCloseThick } from '@wanteddev/wds-icon';
import { useParams } from 'next/navigation';

import { getStartedFrontmatter } from '@/features/docs/constants';

import { useLnbContext } from '../contexts';
import { isFrontmatter } from '../helpers';
import LnbGroup from '../group';
import LnbGroupItem from '../group/item';

import {
  backButtonClickableStyle,
  backButtonStyle,
  containerStyle,
  focusedCategoryWrapperStyle,
  frontmatterWrapperStyle,
  wrapperStyle,
} from './style';

import type { LNBFrontmatterGroup, SlugParams } from '../types';

type Props = {
  frontmatters: LNBFrontmatterGroup;
};

const LnbMobile = ({ frontmatters }: Props) => {
  const params = useParams<SlugParams>();

  const lnbMobile = useLnbContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const [focusedCategory, setFocusedCategory] = useState<string | null>(
    params.slug?.join('/') === getStartedFrontmatter.slug.join('/')
      ? null
      : params.slug?.[0] ?? null,
  );

  useLayoutEffect(() => {
    if (lnbMobile.open) {
      const activeElement = containerRef.current?.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      const viewport = containerRef.current?.querySelector<HTMLElement>(
        '[data-radix-scroll-area-viewport]',
      );

      if (activeElement && viewport) {
        const offsetTop = activeElement.offsetTop - activeElement.clientHeight;

        viewport.scrollTo({
          top: offsetTop - 72,
        });
      }
    }
  }, [lnbMobile.open]);

  useEffect(() => {
    if (!params.slug) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusedCategory(
      params.slug.join('/') === getStartedFrontmatter.slug.join('/')
        ? null
        : params.slug.at(0) ?? null,
    );
  }, [params.slug]);

  return (
    <Modal open={lnbMobile.open} onOpenChange={lnbMobile.setOpen}>
      <ModalContainer
        variant="bottom"
        sx={containerStyle}
        ref={containerRef}
        wrapperProps={{ sx: wrapperStyle }}
      >
        <ModalNavigation
          variant="floating"
          sx={{
            '--top-navigation-padding-x': '20px',
          }}
          leadingContent={
            <FlexBox
              as="button"
              type="button"
              aria-label="Back"
              alignItems="center"
              gap="6px"
              aria-hidden={focusedCategory === null}
              sx={backButtonStyle}
              onClick={() => setFocusedCategory(null)}
            >
              <IconArrowLeftThick />

              <Typography variant="body2" weight="medium">
                Back
              </Typography>

              <Box sx={backButtonClickableStyle} />
            </FlexBox>
          }
          trailingContent={
            <ModalClose>
              <IconCloseThick sx={{ fontSize: '16px' }} />
            </ModalClose>
          }
        />
        <ModalContent sx={{ padding: '72px 20px 32px' }}>
          <FlexBox as="nav" flexDirection="column">
            {focusedCategory === null ? (
              <FlexBox flexDirection="column" sx={frontmatterWrapperStyle}>
                <LnbGroupItem
                  href="/docs/get-started"
                  isActive={params.slug?.join('/') === 'get-started'}
                >
                  Get started
                </LnbGroupItem>
                <LnbGroupItem onClick={() => setFocusedCategory('foundations')}>
                  Foundations
                </LnbGroupItem>
                <LnbGroupItem onClick={() => setFocusedCategory('components')}>
                  Components
                </LnbGroupItem>
                <LnbGroupItem onClick={() => setFocusedCategory('utilities')}>
                  Utilities
                </LnbGroupItem>
              </FlexBox>
            ) : (
              <FlexBox flexDirection="column" sx={focusedCategoryWrapperStyle}>
                {frontmatters
                  .filter(
                    (frontmatter) =>
                      frontmatter.key.replace(/ /g, '-').toLowerCase() ===
                      focusedCategory,
                  )
                  .map((frontmatter, i) => {
                    return (
                      <LnbGroup
                        key={
                          isFrontmatter(frontmatter)
                            ? frontmatter.slug.toString() + i
                            : frontmatter.key + i
                        }
                        frontmatter={frontmatter}
                      />
                    );
                  })}
              </FlexBox>
            )}
          </FlexBox>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default memo(LnbMobile);
