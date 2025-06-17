'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlexBox, ScrollArea, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import useThrottle from '@/hooks/use-throttle';

import { shouldNotSerializeMDX } from '../../helpers/overview';

import { sidebarContentStyle, sidebarStyle } from './style';
import { getHeadingLevel } from './helpers';

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
    const filteredHeadings = headings.filter(({ id }) => isSectionVisible(id));

    if (filteredHeadings.length === 0) {
      return;
    }

    if (
      Boolean(
        filteredHeadings.find(({ nodeName }) => getHeadingLevel(nodeName) < 4),
      )
    ) {
      setVisibleSectionId(
        filteredHeadings
          .filter(({ nodeName }) => getHeadingLevel(nodeName) < 4)
          .sort(
            (a, b) => getHeadingLevel(b.nodeName) - getHeadingLevel(a.nodeName),
          )[0]!.id,
      );
    } else {
      const h4Elements = filteredHeadings.filter(
        ({ nodeName }) => getHeadingLevel(nodeName) === 4,
      );

      if (h4Elements.length > 0 && h4Elements[0]) {
        const firstH4Id = h4Elements[0].id;
        const firstH4Index = headings.findIndex(({ id }) => id === firstH4Id);

        const closestH3 = headings
          .slice(0, firstH4Index)
          .reverse()
          .find(({ nodeName }) => getHeadingLevel(nodeName) === 4);

        if (closestH3) {
          setVisibleSectionId(closestH3.id);
        } else {
          const closestH2 = headings
            .slice(0, firstH4Index)
            .reverse()
            .find(({ nodeName }) => getHeadingLevel(nodeName) === 2);

          if (closestH2) {
            setVisibleSectionId(closestH2.id);
          }
        }
      }
    }
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

  if (shouldNotSerializeMDX(params.slug)) {
    return null;
  }

  return (
    <FlexBox data-algolia-exclude sx={sidebarStyle} flexShrink={0}>
      <aside>
        <ScrollArea>
          <FlexBox as="nav">
            <FlexBox flexDirection="column" gap="4px">
              <Typography
                as="h4"
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
                      aria-current={visibleSectionId === id}
                      sx={sidebarContentStyle}
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
