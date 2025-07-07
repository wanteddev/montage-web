'use client';
import {
  Accordion,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryContent,
  Box,
  FlexBox,
} from '@wanteddev/wds';
import { IconMinus, IconPlus } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

import { FAQ_ITEMS } from './constants';
import {
  accordionDescriptionStyle,
  accordionSummaryContentStyle,
  accordionSummaryStyle,
} from './style';

const Faq = () => {
  return (
    <FlexBox flexDirection="column" as="section" sx={{ width: '100%' }}>
      <Box as="h2" sx={[homeTitleStyle, breakWordStyle]}>
        FAQ
      </Box>

      {FAQ_ITEMS.map((item) => (
        <Accordion key={item.question}>
          <AccordionSummary
            sx={accordionSummaryStyle}
            alignItems="center"
            trailingContent={
              <AccordionSummaryContent
                variant="icon"
                sx={accordionSummaryContentStyle}
              >
                <IconMinus aria-label="close" />
                <IconPlus aria-label="open" />
              </AccordionSummaryContent>
            }
          >
            {item.question}
          </AccordionSummary>

          <AccordionDetails>
            <AccordionDescription
              sx={[accordionDescriptionStyle, breakWordStyle]}
            >
              {item.answer}
            </AccordionDescription>
          </AccordionDetails>
        </Accordion>
      ))}
    </FlexBox>
  );
};

export default Faq;
