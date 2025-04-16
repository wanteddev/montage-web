'use client';
import { useEffect, useState } from 'react';
import { FlexBox, ScrollArea, Typography } from '@wanteddev/wds';
import Link from 'next/link';

import { sidebarContentStyle, sidebarStyle } from './style';

const Sidebar = () => {
  const [headings, setHeadings] = useState<
    Array<{ nodeName: string; id: string; text: string }>
  >([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('[data-heading]'),
    ).map((el) => ({
      nodeName: el.nodeName,
      text: el.textContent!,
      id: el.querySelector('a')!.id,
    }));

    setHeadings(headingElements);
  }, []);

  const getLevel = (nodeName: string) => {
    return Number(nodeName.replace('H', ''));
  };

  return (
    <FlexBox data-algolia-exclude sx={sidebarStyle}>
      <aside>
        <ScrollArea>
          <FlexBox as="nav" flexDirection="column" gap="4px">
            <Typography as="h4" variant="body2-reading" weight="bold">
              On this page
            </Typography>
            <FlexBox flexDirection="column" as="ul" gap="4px">
              {headings.map(({ id, nodeName, text }) => {
                return (
                  <Typography
                    variant="label2"
                    weight="medium"
                    color="semantic.label.neutral"
                    as="li"
                    key={id}
                    data-level={getLevel(nodeName)}
                    sx={sidebarContentStyle}
                  >
                    <Link href={`#${id}`}>{text}</Link>
                  </Typography>
                );
              })}
            </FlexBox>
          </FlexBox>
        </ScrollArea>
      </aside>
    </FlexBox>
  );
};

export default Sidebar;
