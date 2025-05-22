import { sentenceCase } from 'change-case';
import {
  Accordion,
  AccordionSummaryContent,
  FlexBox,
  List,
  typographyStyle,
} from '@wanteddev/wds';
import { IconChevronDownThickSmall } from '@wanteddev/wds-icon';
import { AccordionSummary } from '@wanteddev/wds';
import { AccordionDetails } from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import { SectionHeader } from '@wanteddev/wds';
import { useCallback } from 'react';

import { getIsActive, isFrontmatter } from '../helpers';
import { PLATFORM_PATTERN } from '../constants';

import {
  accordionIconContentStyle,
  accordionIconStyle,
  accordionSummaryStyle,
  lnbAccordionStyle,
} from './style';
import LnbGroupItem from './item';

import type { Frontmatter } from '@/features/docs/types';
import type {
  LNBFrontmatterChild,
  LNBFrontmatterType,
  SlugParams,
} from '../types';

type Props = {
  frontmatter: LNBFrontmatterChild | LNBFrontmatterType;
};

const LnbGroup = ({ frontmatter }: Props) => {
  const params = useParams<SlugParams>();

  const getFrontmatterOption = useCallback((item: Frontmatter) => {
    const title = item.originSlug
      .at(item.originSlug.length - 1)
      ?.match(PLATFORM_PATTERN)
      ? sentenceCase(item.slug[item.slug.length - 2]!)
      : sentenceCase(item.slug[item.slug.length - 1]!);

    const href = `/docs/${item.slug.join('/')}`;

    return {
      title,
      href,
    };
  }, []);

  if (isFrontmatter(frontmatter)) {
    return (
      <LnbGroupItem
        href={`/docs/${frontmatter.slug.join('/')}`}
        isActive={getIsActive(params, frontmatter)}
        depth="0"
      >
        {sentenceCase(frontmatter.title)}
      </LnbGroupItem>
    );
  }

  return (
    <List>
      <Accordion divider={false} defaultExpanded>
        <AccordionSummary
          sx={accordionSummaryStyle}
          fillWidth
          trailingContent={
            <AccordionSummaryContent
              variant="icon"
              rotate
              sx={accordionIconContentStyle}
            >
              <IconChevronDownThickSmall sx={accordionIconStyle} />
            </AccordionSummaryContent>
          }
          disableInteraction
          data-active={getIsActive(params, frontmatter)}
          textProps={{
            variant: 'headline2',
            weight: 'bold',
          }}
        >
          {sentenceCase(frontmatter.key)}
        </AccordionSummary>

        <AccordionDetails sx={lnbAccordionStyle}>
          <FlexBox flexDirection="column" gap="4px">
            {frontmatter.children.map((item, idx) => {
              if (isFrontmatter(item)) {
                const { title, href } = getFrontmatterOption(item);

                return (
                  <LnbGroupItem
                    href={href}
                    key={item.title + idx}
                    isActive={getIsActive(params, item)}
                    depth="1"
                  >
                    {title}
                  </LnbGroupItem>
                );
              }

              return (
                <FlexBox
                  flexDirection="column"
                  key={item.key + idx}
                  gap="4px"
                  sx={{
                    [':not(:last-child)']: {
                      marginBottom: 16,
                    },
                  }}
                >
                  <SectionHeader
                    size="xsmall"
                    sx={[
                      { padding: '12px 20px 12px var(--lnb-padding-left)' },
                      typographyStyle('caption1', 'bold'),
                    ]}
                    color="semantic.label.assistive"
                  >
                    {sentenceCase(item.key)}
                  </SectionHeader>

                  {item.children.map((child, childIdx) => {
                    const { title, href } = getFrontmatterOption(child);

                    return (
                      <LnbGroupItem
                        href={href}
                        key={child.slug.toString() + childIdx}
                        isActive={getIsActive(params, child)}
                        depth="2"
                      >
                        {title}
                      </LnbGroupItem>
                    );
                  })}
                </FlexBox>
              );
            })}
          </FlexBox>
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default LnbGroup;
