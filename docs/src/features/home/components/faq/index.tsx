'use client';
import {
  Accordion,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryContent,
  FlexBox,
} from '@wanteddev/wds';
import { IconMinusThick, IconPlusThick } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';
import FadeInOut from '@/components/fade-in-out';

import SectionWrapper from '../section/wrapper';
import SectionTitle from '../section/title';

import { FAQ_ITEMS } from './constants';
import {
  accordionDescriptionStyle,
  accordionDetailsStyle,
  accordionSectionWrapperStyle,
  accordionSummaryContentStyle,
  accordionSummaryStyle,
} from './style';

const Faq = () => {
  return (
    <SectionWrapper flexDirection="column" gap="12px" md={{ gap: '16px' }}>
      <FadeInOut duration={600}>
        <SectionTitle>FAQ</SectionTitle>
      </FadeInOut>

      <FlexBox flexDirection="column" sx={accordionSectionWrapperStyle}>
        {FAQ_ITEMS.map((item, idx) => (
          <Accordion key={item.question} divider={idx !== FAQ_ITEMS.length - 1}>
            <FadeInOut duration={600}>
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
            </FadeInOut>

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
      </FlexBox>
    </SectionWrapper>
  );
};

export default Faq;
