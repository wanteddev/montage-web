import { capitalCase } from 'change-case';
import {
  Accordion,
  AccordionSummaryContent,
  FlexBox,
  List,
} from '@wanteddev/wds';
import { IconChevronDownThickSmall } from '@wanteddev/wds-icon';
import { AccordionSummary } from '@wanteddev/wds';
import { AccordionDetails } from '@wanteddev/wds';
import { useParams } from 'next/navigation';

import { getIsActive, isFrontmatter } from '../helpers';

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
        {capitalCase(frontmatter.title)}
      </LnbGroupItem>
    );
  }

  return (
    <List>
      <Accordion divider={false} defaultExpanded={frontmatter.defaultOpen}>
        <AccordionSummary
          sx={accordionSummaryStyle}
          verticalPadding="12px"
          trailingContent={
            <AccordionSummaryContent
              variant="icon"
              rotate
              sx={accordionIconContentStyle}
            >
              <IconChevronDownThickSmall sx={accordionIconStyle} />
            </AccordionSummaryContent>
          }
          data-active={getIsActive(params, frontmatter)}
          textProps={{
            variant: 'body1',
            weight: getIsActive(params, frontmatter) ? 'bold' : 'medium',
          }}
        >
          {capitalCase(frontmatter.key)}
        </AccordionSummary>

        <AccordionDetails sx={lnbAccordionStyle}>
          <FlexBox flexDirection="column" gap="4px">
            {frontmatter.children.map((item, idx) => {
              if (isFrontmatter(item)) {
                const title = capitalCase(item.slug[item.slug.length - 2]!);
                const href = `/docs/${item.slug.join('/')}`;

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
                <Accordion
                  key={item.key + idx}
                  divider={false}
                  defaultExpanded={item.defaultOpen}
                >
                  <AccordionSummary
                    verticalPadding="12px"
                    data-depth="1"
                    sx={accordionSummaryStyle}
                    data-active={getIsActive(params, item)}
                    trailingContent={
                      <AccordionSummaryContent
                        variant="icon"
                        rotate
                        sx={accordionIconContentStyle}
                      >
                        <IconChevronDownThickSmall sx={accordionIconStyle} />
                      </AccordionSummaryContent>
                    }
                    textProps={{
                      variant: 'label1',
                      weight: 'medium',
                    }}
                  >
                    {capitalCase(item.key)}
                  </AccordionSummary>

                  <AccordionDetails sx={lnbAccordionStyle}>
                    {item.children.map((child, childIdx) => {
                      const title = capitalCase(
                        child.slug[child.slug.length - 2]!,
                      );
                      const href = `/docs/${child.slug.join('/')}`;

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
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </FlexBox>
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default LnbGroup;
