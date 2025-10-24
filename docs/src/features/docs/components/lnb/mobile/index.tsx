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
import { IconArrowLeftThick, IconCloseThick } from '@wanteddev/wds-icon';
import { useParams } from 'next/navigation';
import { sentenceCase } from 'change-case';

import { useLnbContext } from '../contexts';
import { isFrontmatter } from '../helpers';
import LnbGroup from '../group';
import LnbGroupItem from '../group/item';

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

import type { SlugParams } from '../types';

const LnbMobile = () => {
  const params = useParams<SlugParams>();

  const { frontmatters, ...lnbMobile } = useLnbContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const [focusedCategory, setFocusedCategory] = useState<string | null>(
    params.slug?.at(0) ?? null,
  );
  const [previousFocusedCategory, setPreviousFocusedCategory] = useState<
    string | null
  >(focusedCategory);

  const [isScrolling, setIsScrolling] = useState(false);

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
    if (!lnbMobile.open || !containerRef.current) return;

    const scrollContainer = containerRef.current.querySelector<HTMLElement>(
      '[data-radix-scroll-area-viewport]',
    );

    if (!scrollContainer) return;

    const handleScroll = (e: Event) => {
      if ((e.target as HTMLElement).scrollTop > 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [lnbMobile.open]);

  useEffect(() => {
    if (!params.slug) {
      setFocusedCategory(null);
      setPreviousFocusedCategory(null);
      return;
    }

    setFocusedCategory(params.slug.at(0) ?? null);
    setPreviousFocusedCategory(params.slug.at(0) ?? null);
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
          variant="emphasized"
          sx={navigationStyle}
          leadingContent={
            <ModalNavigationButton
              aria-label="Back"
              sx={backButtonStyle}
              aria-hidden={focusedCategory === null}
              onClick={(e) => {
                e.preventDefault();
                setFocusedCategory(null);
              }}
            >
              <IconArrowLeftThick />
            </ModalNavigationButton>
          }
          trailingContent={
            <ModalClose>
              <IconCloseThick
                sx={{
                  fontSize: '16px',
                }}
              />
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
          sx={{ '--wds-modal-content-margin': '20px', paddingTop: 0 }}
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
                <FlexBox flexDirection="column" sx={frontmatterWrapperStyle}>
                  <LnbGroupItem
                    onClick={() => {
                      setFocusedCategory('getting-started');
                      setPreviousFocusedCategory('getting-started');
                    }}
                  >
                    Getting started
                  </LnbGroupItem>
                  <LnbGroupItem
                    onClick={() => {
                      setFocusedCategory('foundations');
                      setPreviousFocusedCategory('foundations');
                    }}
                  >
                    Foundations
                  </LnbGroupItem>
                  <LnbGroupItem
                    onClick={() => {
                      setFocusedCategory('components');
                      setPreviousFocusedCategory('components');
                    }}
                  >
                    Components
                  </LnbGroupItem>
                  <LnbGroupItem
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
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default memo(LnbMobile);
