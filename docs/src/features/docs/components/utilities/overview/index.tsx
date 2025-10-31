'use client';
import { Fragment } from 'react';
import { sentenceCase } from 'change-case';
import { FlexBox, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowRightThick } from '@wanteddev/wds-icon';

import { Heading2 } from '../../mdx/section/layout';

import { useUtilitiesFrontmatter } from './hooks';
import { headingStyle, interactionArrowStyle, linkStyle } from './style';

type Props = {
  platform: 'web' | 'android' | 'ios';
};

export const UtilitiesOverview = ({ platform }: Props) => {
  const frontmatters = useUtilitiesFrontmatter({ platform });

  return (
    <>
      {frontmatters.map((v) => {
        const sortedChildren = v.children.toSorted((a, b) =>
          a.title.localeCompare(b.title),
        );

        const firstGrid = sortedChildren.toSpliced(
          Math.floor((v.children.length - 1) / 2) + 1,
          v.children.length,
        );

        const secondGrid = sortedChildren.toSpliced(
          0,
          Math.floor((v.children.length - 1) / 2) + 1,
        );

        return (
          <Fragment key={v.title}>
            <Heading2 content={sentenceCase(v.title)} sx={headingStyle} />

            <FlexBox
              flexDirection="column"
              gap="0px"
              sm={{ flexDirection: 'row', gap: '20px' }}
            >
              <FlexBox flexDirection="column" flex="1 0 0">
                {firstGrid.map((item) => (
                  <FlexBox
                    as={Link}
                    sx={linkStyle}
                    key={item.slug.toString()}
                    href={`/docs/${item.slug.join('/')}`}
                    alignItems="center"
                    gap="12px"
                  >
                    <Typography
                      variant="body2"
                      weight="bold"
                      color="semantic.label.normal"
                    >
                      {item.title}
                    </Typography>

                    <IconArrowRightThick
                      sx={interactionArrowStyle}
                      aria-hidden
                      data-role="interaction-arrow"
                    />
                  </FlexBox>
                ))}
              </FlexBox>

              <FlexBox flexDirection="column" flex="1 0 0">
                {secondGrid.map((item) => (
                  <FlexBox
                    as={Link}
                    sx={linkStyle}
                    key={item.slug.toString()}
                    href={`/docs/${item.slug.join('/')}`}
                    alignItems="center"
                    gap="12px"
                  >
                    <Typography
                      variant="body2"
                      weight="bold"
                      color="semantic.label.normal"
                    >
                      {item.title}
                    </Typography>

                    <IconArrowRightThick
                      sx={interactionArrowStyle}
                      aria-hidden
                      data-role="interaction-arrow"
                    />
                  </FlexBox>
                ))}
              </FlexBox>
            </FlexBox>
          </Fragment>
        );
      })}
    </>
  );
};

export default UtilitiesOverview;
