import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import { ListCell, ListCellContent } from '../list';
import Typography from '../typography';
import { Divider, FlexBox } from '../..';

import {
  ACCORDION_DESCRIPTION_NAME,
  ACCORDION_DETAILS_NAME,
  ACCORDION_NAME,
  ACCORDION_SUMMARY_CONTENT_NAME,
  ACCORDION_SUMMARY_NAME,
} from './constants';
import { AccordionProvider, useAccordionContext } from './contexts';
import {
  accordionDetailsBoxStyle,
  accordionDetailsStyle,
  accordionStyle,
  accordionSummaryContentStyle,
  accordionSummaryStyle,
  accordionSummaryTextStyle,
} from './style';

import type { ListCellProps } from '../list/types';
import type { TypographyProps } from '../typography/types';
import type { AccordionProps, AccordionSummaryContentProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const Accordion = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AccordionProps, 'div'>
>(
  (
    {
      defaultExpanded,
      expanded: originExpanded,
      onChange,
      disabled = false,
      divider = true,
      sx,
      children,
    },
    ref,
  ) => {
    const [expanded = false, setExpand] = useControllableState({
      prop: originExpanded,
      defaultProp: defaultExpanded,
      onChange,
    });

    return (
      <AccordionProvider
        expanded={expanded}
        disabled={disabled}
        onExpandedChange={setExpand}
      >
        <Box
          ref={ref}
          aria-expanded={expanded}
          sx={[accordionStyle({ disabled, expanded }), sx]}
        >
          {children}
          {divider && (
            <Divider
              data-role="accordion-divider"
              color="palette.line.normal.alternative"
            />
          )}
        </Box>
      </AccordionProvider>
    );
  },
);

Accordion.displayName = ACCORDION_NAME;

const AccordionSummary = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ListCellProps, 'div'>
>(
  (
    { disabled, children, rightContent, sx, onClick, textProps, ...props },
    ref,
  ) => {
    const {
      expanded,
      disabled: accordionDisabled,
      onExpandedChange,
    } = useAccordionContext(ACCORDION_SUMMARY_NAME);

    return (
      <ListCell
        ref={ref}
        wds-component="accordion-summary"
        as="div"
        padding="16px"
        disabled={accordionDisabled || disabled}
        disableInteraction={accordionDisabled || disabled}
        rightContent={
          rightContent ?? (
            <AccordionSummaryContent
              variant="icon"
              data-role="accordion-summary-expand-icon"
            >
              <IconChevronDown
                sx={(theme) => ({
                  color: theme.palette.label.normal,
                })}
              />
            </AccordionSummaryContent>
          )
        }
        textProps={{
          variant: 'body2_normal',
          weight: 'bold',
          ...textProps,
          sx: [accordionSummaryTextStyle, textProps?.sx],
        }}
        {...props}
        sx={[accordionSummaryStyle, sx]}
        onClick={composeEventHandlers(onClick, (e) => {
          onExpandedChange(!expanded);
          e.preventDefault();
        })}
      >
        {children}
      </ListCell>
    );
  },
);

AccordionSummary.displayName = ACCORDION_SUMMARY_NAME;

const AccordionSummaryContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AccordionSummaryContentProps, 'div'>
>(({ sx, disableExpandIconAnimation = false, ...props }, ref) => {
  const { expanded } = useAccordionContext(ACCORDION_SUMMARY_CONTENT_NAME);

  return (
    <ListCellContent
      ref={ref}
      {...props}
      sx={[
        accordionSummaryContentStyle({ expanded, disableExpandIconAnimation }),
        sx,
      ]}
    />
  );
});

AccordionSummaryContent.displayName = ACCORDION_SUMMARY_CONTENT_NAME;

const AccordionDetails = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TypographyProps, 'div'>
>(({ sx, children, ...props }, ref) => {
  const { expanded } = useAccordionContext(ACCORDION_DETAILS_NAME);

  return (
    <Box
      ref={ref}
      wds-component="accordion-details"
      {...props}
      sx={[accordionDetailsStyle({ expanded }), sx]}
      aria-hidden={!expanded}
    >
      <div>
        <FlexBox sx={accordionDetailsBoxStyle}>{children}</FlexBox>
      </div>
    </Box>
  );
});

AccordionDetails.displayName = ACCORDION_DETAILS_NAME;

const AccordionDescription = forwardRef<
  HTMLParagraphElement,
  DefaultComponentProps<TypographyProps, 'p'>
>((props, ref) => {
  return (
    <Typography
      ref={ref}
      as="p"
      variant="label1_normal"
      weight="regular"
      color="palette.label.neutral"
      {...props}
    />
  );
});

AccordionDescription.displayName = ACCORDION_DESCRIPTION_NAME;

export {
  Accordion,
  AccordionSummary,
  AccordionSummaryContent,
  AccordionDetails,
  AccordionDescription,
};
