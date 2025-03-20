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
import { useMemo } from 'react';

import { getIsActive } from '../helpers';

import {
  accordionIconContentStyle,
  accordionIconStyle,
  accordionSummaryStyle,
  lnbAccordionStyle,
} from './style';
import { isFrontmatter } from './helpers';
import LnbGroupItem from './item';

import type { LNBFrontmatterType, SlugParams } from '../types';

type Props = {
  frontmatter: LNBFrontmatterType;
};

const LnbGroup = ({ frontmatter }: Props) => {
  const params = useParams<SlugParams>();

  const isActive = useMemo(() => {
    return frontmatter.children.some((root) =>
      isFrontmatter(root)
        ? getIsActive(params, root)
        : root.children.some((child) => getIsActive(params, child)),
    );
  }, [frontmatter, params]);

  return (
    <List>
      <Accordion
        divider={false}
        disableAnimation
        defaultExpanded={frontmatter.defaultOpen}
      >
        <AccordionSummary
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
          textProps={{
            variant: 'body1',
            weight: isActive ? 'bold' : 'regular',
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
                  disableAnimation
                  divider={false}
                  defaultExpanded={item.defaultOpen}
                >
                  <AccordionSummary
                    verticalPadding="12px"
                    data-depth="1"
                    sx={accordionSummaryStyle}
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
                      variant: 'body1',
                      weight: 'regular',
                    }}
                  >
                    {capitalCase(item.key)}
                  </AccordionSummary>

                  {/* <Divider color="semantic.line.normal.alternative" /> */}

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
