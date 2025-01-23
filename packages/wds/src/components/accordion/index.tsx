import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import { ListCell, ListCellContent } from '../list';
import Typography from '../typography';
import { FlexBox, useComposedRefs } from '../..';

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
} from './style';

import type { ListCellContentProps } from '../list/types';
import type { TypographyProps } from '../typography/types';
import type { AccordionProps, AccordionSummaryProps } from './types';
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
          sx={[accordionStyle({ disabled, divider }), sx]}
        >
          {children}
        </Box>
      </AccordionProvider>
    );
  },
);

Accordion.displayName = ACCORDION_NAME;

const AccordionSummary = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AccordionSummaryProps, 'div'>
>(
  (
    {
      disabled,
      disableExpandIconAnimation = false,
      children,
      rightContent,
      sx,
      onClick,
      textProps,
      ...props
    },
    ref,
  ) => {
    const {
      expanded,
      disabled: accordionDisabled,
      onExpandedChange,
    } = useAccordionContext(ACCORDION_SUMMARY_NAME);

    const [item, setItem] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node));

    const rightContentItem = item?.querySelector(
      '[wds-component="list-item-content"]',
    );
    const disableListCellInteraction = Boolean(
      rightContentItem?.querySelector('button, [role="button"], a'),
    );

    return (
      <ListCell
        ref={composedRefs}
        as="div"
        padding="16px"
        disabled={accordionDisabled || disabled}
        disableInteraction={accordionDisabled || disabled}
        rightContent={
          rightContent ?? (
            <ListCellContent
              variant="icon"
              data-role="accordion-summary-expand-icon"
            >
              <IconChevronDown
                sx={(theme) => ({
                  color: theme.palette.label.normal,
                })}
              />
            </ListCellContent>
          )
        }
        textProps={{
          variant: 'body2_normal',
          weight: 'bold',
          ...textProps,
        }}
        {...props}
        sx={[
          accordionSummaryStyle({
            expanded,
            disableListCellInteraction,
            disableExpandIconAnimation,
          }),
          sx,
        ]}
        onClick={composeEventHandlers(onClick, () => {
          onExpandedChange(!expanded);
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
  DefaultComponentProps<ListCellContentProps, 'div'>
>(({ sx, ...props }, ref) => {
  return (
    <ListCellContent
      ref={ref}
      {...props}
      sx={[accordionSummaryContentStyle, sx]}
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
