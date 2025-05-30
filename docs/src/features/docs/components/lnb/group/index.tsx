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
import { Fragment } from 'react';

import {
  getFrontmatterLink,
  getFrontmatterTitle,
  getIsActive,
  isFrontmatter,
} from '../helpers';

import {
  accordionIconContentStyle,
  accordionIconStyle,
  accordionSummaryStyle,
  lnbAccordionStyle,
} from './style';
import LnbGroupItem from './item';

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

  if (isFrontmatter(frontmatter)) {
    return (
      <LnbGroupItem
        href={`/docs/${frontmatter.slug.join('/')}`}
        isActive={getIsActive(params, frontmatter)}
        depth="0"
      >
        {frontmatter.title}
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
          {frontmatter.key}
        </AccordionSummary>

        <AccordionDetails sx={lnbAccordionStyle}>
          <FlexBox flexDirection="column" gap="4px">
            {frontmatter.children.map((item, idx) => {
              if (isFrontmatter(item)) {
                return (
                  <LnbGroupItem
                    href={getFrontmatterLink(item)}
                    key={item.title + idx}
                    isActive={getIsActive(params, item)}
                    depth="1"
                  >
                    {item.title}
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
                    {item.key}
                  </SectionHeader>

                  {item.children.map((child, childIdx) => {
                    if (isFrontmatter(child)) {
                      return (
                        <LnbGroupItem
                          href={getFrontmatterLink(child)}
                          key={child.slug.toString() + childIdx}
                          isActive={getIsActive(params, child)}
                          depth="2"
                        >
                          {getFrontmatterTitle(child)}
                        </LnbGroupItem>
                      );
                    }

                    return (
                      <Fragment key={child.key + childIdx}>
                        {child.children.map((component, componentIdx) => {
                          if (isFrontmatter(component)) {
                            return (
                              <LnbGroupItem
                                href={getFrontmatterLink(component)}
                                key={component.title + componentIdx}
                                isActive={getIsActive(params, component)}
                                depth="3"
                              >
                                {component.title}
                              </LnbGroupItem>
                            );
                          }

                          return null;
                        })}
                      </Fragment>
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
