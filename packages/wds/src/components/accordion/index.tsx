import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import { ListCell, ListCellContent } from '../list';
import Typography from '../typography';
import { Divider, FlexBox, Slot, useComposedRefs, useSize } from '../..';

import {
  ACCORDION_CONTENT_NAME,
  ACCORDION_DESCRIPTION_NAME,
  ACCORDION_DETAILS_NAME,
  ACCORDION_NAME,
  ACCORDION_SUMMARY_CONTENT_NAME,
  ACCORDION_SUMMARY_NAME,
} from './constants';
import { AccordionProvider, useAccordionContext } from './contexts';
import {
  accordionContentStyle,
  accordionDetailsStyle,
  accordionDetailsWrapperStyle,
  accordionDividerStyle,
  accordionStyle,
  accordionSummaryContentStyle,
  accordionSummaryStyle,
  accordionSummaryTextStyle,
} from './style';

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
} from 'react';
import type { ListCellProps } from '../list/types';
import type { TypographyProps } from '../typography/types';
import type {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryContentProps,
} from './types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';

const Accordion = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AccordionProps, 'div'>
>(
  (
    {
      disableAnimation = false,
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

    const summaryId = useId();
    const detailsId = useId();

    return (
      <AccordionProvider
        expanded={expanded}
        disabled={disabled}
        onExpandedChange={setExpand}
        summaryId={summaryId}
        detailsId={detailsId}
        disableAnimation={disableAnimation}
      >
        <Box ref={ref} sx={[accordionStyle({ disabled }), sx]}>
          {children}
          {divider && (
            <Divider
              data-role="accordion-divider"
              color="palette.line.normal.alternative"
              sx={accordionDividerStyle({ expanded, disableAnimation })}
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
    {
      disabled: givenDisabled,
      children,
      leftContent,
      rightContent,
      textProps,
      sx,
      ...props
    },
    ref,
  ) => {
    const {
      expanded,
      disabled: accordionDisabled,
      onExpandedChange,
      detailsId,
      summaryId,
    } = useAccordionContext(ACCORDION_SUMMARY_NAME);

    const disabled = givenDisabled || accordionDisabled;

    return (
      <ListCell
        ref={ref}
        wds-component="accordion-summary"
        as="div"
        role="button"
        padding="16px"
        disabled={disabled}
        disableInteraction={disabled}
        aria-expanded={expanded}
        aria-controls={detailsId}
        id={summaryId}
        {...(Boolean(leftContent) && {
          leftContent: (
            <Slot data-role="accordion-summary-left-content">
              {leftContent}
            </Slot>
          ),
        })}
        rightContent={
          Boolean(rightContent) ? (
            <Slot data-role="accordion-summary-right-content">
              {rightContent}
            </Slot>
          ) : (
            <AccordionSummaryContent
              variant="icon"
              rotate
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
        sx={[accordionSummaryStyle({ disabled }), sx]}
        onClick={composeEventHandlers(props.onClick, (e) => {
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
>(({ sx, rotate = false, ...props }, ref) => {
  const { expanded, disableAnimation } = useAccordionContext(
    ACCORDION_SUMMARY_CONTENT_NAME,
  );

  return (
    <ListCellContent
      ref={ref}
      {...props}
      sx={[
        accordionSummaryContentStyle({
          expanded,
          disableAnimation,
          rotate,
        }),
        sx,
      ]}
    />
  );
});

AccordionSummaryContent.displayName = ACCORDION_SUMMARY_CONTENT_NAME;

const AccordionDetails = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AccordionDetailsProps, 'div'>
>(({ sx, children, ...props }, forwardedRef) => {
  const { expanded, detailsId, summaryId, disableAnimation } =
    useAccordionContext(ACCORDION_DETAILS_NAME);

  const ref = useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const [wrapperNode, setWrapperNode] = useState<HTMLDivElement | null>(null);
  const height = useSize(wrapperNode)?.height;

  const initialExpanded = useRef(expanded).current;

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(
        'a, button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), details, [tabindex]',
      );

      elements.forEach((elm) => {
        const currentTabIndex = elm.getAttribute('tabindex');
        const prevTabIndex = elm.getAttribute('data-prev-tabindex');

        const details = elm.closest('[wds-component="accordion-details"]');

        if (details !== ref.current) {
          return;
        }

        if (expanded) {
          if (prevTabIndex === 'unset') {
            elm.removeAttribute('tabindex');
          } else if (prevTabIndex !== null) {
            elm.setAttribute('tabindex', prevTabIndex);
          }
          elm.removeAttribute('data-prev-tabindex');
        } else {
          if (prevTabIndex === null) {
            elm.setAttribute('data-prev-tabindex', currentTabIndex || 'unset');
          }
          elm.setAttribute('tabindex', '-1');
        }
      });
    }
  }, [expanded]);

  useEffect(() => {
    if (!ref.current || !wrapperNode) return;

    const element = ref.current;

    if (expanded) {
      if (disableAnimation) {
        element.style.overflow = 'visible';
        element.style.height = 'initial';
      } else {
        element.style.overflow = 'hidden';
        element.style.height = `${height}px`;
      }
    } else {
      if (disableAnimation) {
        element.style.overflow = 'hidden';
        element.style.height = '0px';
      } else {
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';

        requestAnimationFrame(() => {
          element.style.height = '0px';
        });
      }
    }

    const handleTransitionEnd = () => {
      if (expanded) {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disableAnimation]);

  return (
    <Box
      ref={composedRefs}
      wds-component="accordion-details"
      aria-labelledby={summaryId}
      aria-hidden={!expanded}
      id={detailsId}
      {...props}
      sx={accordionDetailsStyle({
        initialExpanded,
        disableAnimation,
      })}
    >
      <FlexBox
        ref={setWrapperNode}
        data-role="accordion-details-wrapper"
        sx={[accordionDetailsWrapperStyle, sx]}
      >
        {children}
      </FlexBox>
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

const AccordionContent = forwardRef(
  <E extends ElementType = 'div'>(
    { sx, ...props }: PolymorphicProps<PropsWithChildren, E>,
    ref: ForwardedRef<E>,
  ) => {
    return (
      <Box
        wds-component="accordion-content"
        ref={ref}
        {...props}
        sx={[accordionContentStyle, sx]}
      />
    );
  },
) as PolymorphicComponent<ComponentPropsWithoutRef<typeof Box>, 'div'>;

AccordionContent.displayName = ACCORDION_CONTENT_NAME;

export {
  Accordion,
  AccordionSummary,
  AccordionSummaryContent,
  AccordionDetails,
  AccordionDescription,
  AccordionContent,
};
