'use client';
import {
  Accordion,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryContent,
} from '@wanteddev/wds';
import { IconMinusThick, IconPlusThick } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import SectionWrapper from '../section/wrapper';
import SectionTitle from '../section/title';

import { FAQ_ITEMS } from './constants';
import {
  accordionDescriptionStyle,
  accordionDetailsStyle,
  accordionSummaryContentStyle,
  accordionSummaryStyle,
} from './style';

const Faq = () => {
  return (
    <SectionWrapper flexDirection="column" gap="12px" md={{ gap: '16px' }}>
      <SectionTitle>FAQ</SectionTitle>

      {FAQ_ITEMS.map((item, idx) => (
        <Accordion key={item.question} divider={idx !== FAQ_ITEMS.length - 1}>
          <AccordionSummary
            disableInteraction
            sx={accordionSummaryStyle}
            alignItems="center"
            textProps={{
              variant: 'headline1',
              weight: 'bold',
              color: 'semantic.label.normal',
              md: {
                variant: 'heading2',
              },
            }}
            trailingContent={
              <AccordionSummaryContent
                variant="icon"
                sx={accordionSummaryContentStyle}
              >
                <IconMinusThick aria-label="close" />
                <IconPlusThick aria-label="open" />
              </AccordionSummaryContent>
            }
          >
            {item.question}
          </AccordionSummary>

          <AccordionDetails sx={accordionDetailsStyle}>
            <AccordionDescription
              variant="body2-reading"
              weight="medium"
              color="semantic.label.neutral"
              sx={[accordionDescriptionStyle, breakWordStyle]}
              md={{
                variant: 'body2',
              }}
            >
              {item.answer}
            </AccordionDescription>
          </AccordionDetails>
        </Accordion>
      ))}
    </SectionWrapper>
  );
};

export default Faq;
