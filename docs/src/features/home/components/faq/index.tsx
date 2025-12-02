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
  accordionSummaryContentStyle,
  accordionSummaryStyle,
} from './style';

const Faq = () => {
  return (
    <SectionWrapper
      flexDirection="column"
      gap="12px"
      md={{ gap: '16px' }}
      aria-label="FAQ Section"
    >
      <FadeInOut duration={600}>
        <SectionTitle>FAQ</SectionTitle>
      </FadeInOut>

      <FlexBox flexDirection="column">
        {FAQ_ITEMS.map((item, idx) => (
          <FadeInOut duration={600} key={item.question}>
            <Accordion divider={idx !== FAQ_ITEMS.length - 1}>
              <AccordionSummary
                disableInteraction
                sx={accordionSummaryStyle}
                alignItems="center"
                textProps={{
                  variant: 'headline2',
                  weight: 'bold',
                  color: 'semantic.label.normal',
                  md: {
                    variant: 'headline1',
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

              <AccordionDetails>
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
          </FadeInOut>
        ))}
      </FlexBox>
    </SectionWrapper>
  );
};

export default Faq;
