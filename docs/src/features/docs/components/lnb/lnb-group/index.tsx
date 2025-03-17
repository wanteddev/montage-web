import { capitalCase } from 'change-case';
import {
  Accordion,
  AccordionSummaryContent,
  FlexBox,
  List,
  ListCell,
} from '@wanteddev/wds';
import Link from 'next/link';
import { IconChevronDownThickSmall } from '@wanteddev/wds-icon';
import { useParams } from 'next/navigation';
import { AccordionSummary } from '@wanteddev/wds';
import { AccordionDetails } from '@wanteddev/wds';

import { lnbAccordionStyle, lnbGroupStyle, lnbItemStyle } from './style';
import { isFrontmatter } from './helpers';

import type { LNBFrontmatterType } from '../types';

type Props = {
  frontmatter: LNBFrontmatterType;
};

const LNBGroup = ({ frontmatter }: Props) => {
  const params = useParams();

  return (
    <List flexDirection="column" gap="8px" sx={lnbGroupStyle}>
      <Accordion
        divider={false}
        disableAnimation
        defaultExpanded={frontmatter.defaultOpen}
      >
        <AccordionSummary
          trailingContent={
            <AccordionSummaryContent variant="icon" rotate>
              <IconChevronDownThickSmall
                sx={(theme) => ({
                  color: theme.semantic.label.normal,
                })}
              />
            </AccordionSummaryContent>
          }
          textProps={{
            variant: 'headline2',
          }}
        >
          {capitalCase(frontmatter.key)}
        </AccordionSummary>

        <AccordionDetails sx={lnbAccordionStyle}>
          <FlexBox flexDirection="column" gap="4px">
            {frontmatter.children.map((item, idx) => {
              if (isFrontmatter(item)) {
                const title = capitalCase(item.slug[item.slug.length - 1]!);
                const href = `/docs/${item.slug.join('/')}`;
                const isActive =
                  params.slug?.toString() === item.slug.toString();

                return (
                  <ListCell
                    as={Link}
                    href={href}
                    key={item.title + idx}
                    sx={lnbItemStyle}
                    active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    textProps={{
                      variant: 'label1',
                      weight: 'regular',
                    }}
                  >
                    {title}
                  </ListCell>
                );
              }

              return (
                <FlexBox flexDirection="column" gap="4px" key={item.key + idx}>
                  <Accordion
                    disableAnimation
                    defaultExpanded={item.defaultOpen}
                  >
                    <AccordionSummary
                      trailingContent={
                        <AccordionSummaryContent variant="icon" rotate>
                          <IconChevronDownThickSmall
                            sx={(theme) => ({
                              color: theme.semantic.label.alternative,
                            })}
                          />
                        </AccordionSummaryContent>
                      }
                      textProps={{
                        color: 'semantic.label.alternative',
                        variant: 'label2',
                      }}
                    >
                      {capitalCase(item.key)}
                    </AccordionSummary>

                    <AccordionDetails sx={lnbAccordionStyle}>
                      {item.children.map((child, childIdx) => {
                        const title = capitalCase(
                          child.slug[child.slug.length - 1]!,
                        );
                        const href = `/docs/${child.slug.join('/')}`;
                        const isActive =
                          params.slug?.toString() === child.slug.toString();

                        return (
                          <ListCell
                            key={child.slug.toString() + childIdx}
                            as={Link}
                            href={href}
                            sx={lnbItemStyle}
                            active={isActive}
                            aria-current={isActive ? 'page' : undefined}
                            textProps={{
                              variant: 'label1',
                              weight: 'regular',
                            }}
                          >
                            {title}
                          </ListCell>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </FlexBox>
              );
            })}
          </FlexBox>
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default LNBGroup;
