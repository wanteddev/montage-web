/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import {
  FlexBox,
  Modal,
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  ModalNavigationButton,
  Typography,
} from '@wanteddev/wds';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconArrowLeft, IconClose } from '@wanteddev/wds-icon';
import { usePathname } from 'next/navigation';
import { sentenceCase } from 'change-case';

import { useMDXContext } from '@/features/docs/contexts';

import LnbGroup from '../group';
import LnbGroupItem from '../group/item';
import { useLnbContext } from '../contexts';

import {
  backButtonStyle,
  categoryTitleStyle,
  containerStyle,
  focusedCategoryWrapperStyle,
  frontmatterWrapperStyle,
  navigationStyle,
  navigationTitleStyle,
  wrapperStyle,
} from './style';

const LnbMobile = () => {
  const pathname = usePathname();

  const lnbMobile = useLnbContext();

  const { groupedPages } = useMDXContext();

  const currentSlug = pathname.split('/').filter(Boolean);

  const lastSlug = currentSlug.at(-1);

  const groupKey = lastSlug === 'release-note' ? null : currentSlug.at(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const [focusedCategory, setFocusedCategory] = useState<string | null>(
    groupKey ?? null,
  );
  const [previousFocusedCategory, setPreviousFocusedCategory] = useState<
    string | null
  >(focusedCategory);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
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

  useLayoutEffect(() => {
    if (!lnbMobile.open || !containerRef.current) return;

    const scrollContainer = containerRef.current.querySelector<HTMLElement>(
      '[data-radix-scroll-area-viewport]',
    );

    if (!scrollContainer) return;

    const handleScroll = (e: Event) => {
      if ((e.target as HTMLElement).scrollTop > 20) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    if (scrollContainer.scrollTop > 20) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [lnbMobile.open]);

  useEffect(() => {
    if (!groupKey) {
      setFocusedCategory(null);
      setPreviousFocusedCategory(null);
      return;
    }

    setFocusedCategory(groupKey);
    setPreviousFocusedCategory(groupKey);
  }, [groupKey]);

  return (
    <Modal open={lnbMobile.open} onOpenChange={lnbMobile.setOpen}>
      <ModalContainer
        variant="bottom"
        sx={containerStyle}
        ref={containerRef}
        wrapperProps={{ sx: wrapperStyle }}
      >
        <ModalNavigation
          variant="emphasized"
          sx={navigationStyle}
          leadingContent={
            <ModalNavigationButton
              aria-label="Back"
              size={22}
              sx={backButtonStyle}
              aria-hidden={focusedCategory === null}
              onClick={(e) => {
                e.preventDefault();
                setFocusedCategory(null);
              }}
            >
              <IconArrowLeft />
            </ModalNavigationButton>
          }
          trailingContent={
            <ModalClose size={22}>
              <IconClose />
            </ModalClose>
          }
        >
          <Typography
            variant="headline2"
            weight="bold"
            as="span"
            data-is-scrolling={isScrolling}
            data-is-visible={previousFocusedCategory === focusedCategory}
            sx={navigationTitleStyle}
          >
            {sentenceCase(previousFocusedCategory ?? '')}
          </Typography>
        </ModalNavigation>
        <ModalContent
          sx={{ '--wds-modal-content-margin': '24px', paddingTop: 0 }}
        >
          <ModalContentItem>
            {focusedCategory !== null && (
              <Typography
                variant="heading2"
                weight="bold"
                color="semantic.label.neutral"
                sx={[categoryTitleStyle, focusedCategoryWrapperStyle]}
                data-is-scrolling={isScrolling}
              >
                {sentenceCase(focusedCategory)}
              </Typography>
            )}

            <FlexBox as="nav" flexDirection="column">
              {focusedCategory === null ? (
                <FlexBox
                  flexDirection="column"
                  sx={frontmatterWrapperStyle}
                  gap="8px"
                >
                  <LnbGroupItem
                    depth="0"
                    onClick={() => {
                      setFocusedCategory('getting-started');
                      setPreviousFocusedCategory('getting-started');
                    }}
                  >
                    Getting started
                  </LnbGroupItem>
                  <LnbGroupItem
                    depth="0"
                    onClick={() => {
                      setFocusedCategory('foundations');
                      setPreviousFocusedCategory('foundations');
                    }}
                  >
                    Foundations
                  </LnbGroupItem>
                  <LnbGroupItem
                    depth="0"
                    onClick={() => {
                      setFocusedCategory('components');
                      setPreviousFocusedCategory('components');
                    }}
                  >
                    Components
                  </LnbGroupItem>
                  <LnbGroupItem
                    depth="0"
                    onClick={() => {
                      setFocusedCategory('utilities');
                      setPreviousFocusedCategory('utilities');
                    }}
                  >
                    Utilities
                  </LnbGroupItem>
                </FlexBox>
              ) : (
                <FlexBox
                  flexDirection="column"
                  sx={focusedCategoryWrapperStyle}
                >
                  <LnbGroup
                    frontmatters={
                      groupedPages[focusedCategory]
                        ? groupedPages[focusedCategory]
                        : []
                    }
                  />
                </FlexBox>
              )}
            </FlexBox>
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default memo(LnbMobile);
