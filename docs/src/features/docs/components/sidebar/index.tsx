'use client';
import { useCallback, useEffect, useState } from 'react';
import { FlexBox, ScrollArea, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import useThrottle from '@/hooks/use-throttle';

import { sidebarActiveStyle, sidebarContentStyle, sidebarStyle } from './style';

const Sidebar = () => {
  const params = useParams<{ slug: Array<string> }>();
  const [headings, setHeadings] = useState<
    Array<{ nodeName: string; id: string; text: string }>
  >([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('[data-heading]'),
    ).map((el) => ({
      nodeName: el.nodeName,
      text: el.textContent!,
      id: el.id,
    }));

    setHeadings(headingElements);
  }, [params.slug]);

  const getLevel = (nodeName: string) => {
    return Number(nodeName.replace('H', ''));
  };

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
    const filteredHeadings = headings.filter(({ id }) => isSectionVisible(id));

    if (filteredHeadings.length === 0) {
      return setVisibleSectionId(null);
    }

    setVisibleSectionId(filteredHeadings[0]!.id);
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
    <FlexBox data-algolia-exclude sx={sidebarStyle}>
      <aside>
        <ScrollArea>
          <FlexBox
            as="nav"
            sx={(theme) => ({
              borderLeft: `1px solid ${theme.semantic.line.normal.neutral}`,
            })}
          >
            <FlexBox
              flexDirection="column"
              gap="4px"
              sx={{ marginLeft: '-1px' }}
            >
              <Typography
                as="h4"
                variant="caption1"
                weight="regular"
                color="semantic.label.neutral"
                sx={[{ padding: '8px 12px' }]}
              >
                On this page
              </Typography>
              <FlexBox flexDirection="column" as="ul">
                {headings.map(({ id, nodeName, text }) => {
                  return (
                    <Typography
                      variant="label2"
                      weight={visibleSectionId === id ? 'bold' : 'regular'}
                      color="semantic.label.neutral"
                      as="li"
                      key={id}
                      data-level={getLevel(nodeName)}
                      aria-current={visibleSectionId === id}
                      sx={[sidebarContentStyle, sidebarActiveStyle]}
                    >
                      <Link href={`#${id}`}>{text}</Link>
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
