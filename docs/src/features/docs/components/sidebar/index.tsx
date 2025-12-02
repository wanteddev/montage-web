'use client';
import {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { FlexBox, ScrollArea, Typography } from '@wanteddev/wds';
import { usePathname } from 'next/navigation';

import useThrottle from '@/hooks/use-throttle';

import { sidebarContentStyle, sidebarStyle } from './style';
import { getHeadingLevel } from './helpers';

const Sidebar = () => {
  const descriptionId = useId();

  const pathname = usePathname();
  const [headings, setHeadings] = useState<
    Array<{ nodeName: string; id: string; text: string }>
  >([]);

  useEffect(() => {
    startTransition(() => {
      const headingElements = Array.from(
        document.querySelectorAll('[data-heading]'),
      ).map((el) => ({
        nodeName: el.nodeName,
        text: el.textContent,
        id: el.id,
      }));

      setHeadings(headingElements);
    });
  }, [pathname]);

  const headingElements = useMemo(() => {
    return headings.filter(
      ({ nodeName }) =>
        getHeadingLevel(nodeName) === 2 || getHeadingLevel(nodeName) === 3,
    );
  }, [headings]);

  const [visibleSectionId, setVisibleSectionId] = useState<string | null>(null);

  const isSectionVisible = useCallback((elementId: string) => {
    if (typeof window === 'undefined') {
      return false;
    }

    const section = document.getElementById(elementId);

    if (section) {
      const sectionPosition = section.getBoundingClientRect();

      const viewPort = {
        height: window.innerHeight,
        width: window.innerWidth,
      };

      return (
        sectionPosition.top >= 40 &&
        sectionPosition.left >= 0 &&
        sectionPosition.bottom <= viewPort.height &&
        sectionPosition.right <= viewPort.width
      );
    }

    return false;
  }, []);

  const throttledCheckVisibility = useThrottle(() => {
    const filteredHeadings = headings.filter(
      ({ id, nodeName }) =>
        isSectionVisible(id) && getHeadingLevel(nodeName) < 4,
    );

    if (filteredHeadings.length === 0) {
      return;
    }

    setVisibleSectionId(
      filteredHeadings.sort(
        (a, b) => getHeadingLevel(b.nodeName) - getHeadingLevel(a.nodeName),
      )[0]!.id,
    );
  }, 400);

  useEffect(() => {
    throttledCheckVisibility();

    window.addEventListener('scroll', throttledCheckVisibility);
    window.addEventListener('resize', throttledCheckVisibility);

    return () => {
      window.removeEventListener('scroll', throttledCheckVisibility);
      window.removeEventListener('resize', throttledCheckVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSectionVisible, headings]);

  return (
    <FlexBox data-algolia-exclude sx={sidebarStyle} flexShrink={0}>
      <aside aria-label="Table of Contents">
        <ScrollArea>
          <FlexBox as="nav" aria-labelledby={descriptionId}>
            <FlexBox flexDirection="column" gap="4px">
              <Typography
                id={descriptionId}
                as="p"
                variant="body2"
                weight="bold"
                color="semantic.label.normal"
                sx={[{ padding: '6px 0px' }]}
              >
                On this page
              </Typography>
              <FlexBox flexDirection="column" as="ul">
                {headingElements.map(({ id, nodeName, text }) => {
                  return (
                    <Typography
                      variant="label2"
                      weight="bold"
                      color="semantic.label.assistive"
                      as="li"
                      key={id}
                      data-level={getHeadingLevel(nodeName)}
                      data-is-active={visibleSectionId === id}
                      sx={sidebarContentStyle}
                    >
                      <a href={`#${id}`}>{text}</a>
                    </Typography>
                  );
                })}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </ScrollArea>
      </aside>
    </FlexBox>
  );
};

export default Sidebar;
