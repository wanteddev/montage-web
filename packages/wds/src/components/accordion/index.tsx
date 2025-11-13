import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { IconChevronDownSmall } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { usePrevious } from '@radix-ui/react-use-previous';
import { useSize } from '@radix-ui/react-use-size';

import { ListCell, ListCellContent } from '../list';
import { Typography } from '../typography';
import { Divider } from '../divider';
import { FlexBox } from '../flex-box';
import { AnimationPresence } from '../animation-presence';

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
  CSSProperties,
  ComponentRef,
  ElementType,
  ForwardedRef,
} from 'react';
import type {
  AccordionContentProps,
  AccordionDescriptionProps,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryContentProps,
  AccordionSummaryProps,
} from './types';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

const Accordion = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AccordionProps, 'div'>
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
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpand] = useControllableState({
      prop: originExpanded,
      defaultProp: defaultExpanded ?? false,
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
        <Box
          ref={ref}
          as="div"
          {...props}
          sx={[accordionStyle({ disabled, expanded }), sx]}
        >
          {children}
          {divider && (
            <Divider
              data-role="accordion-divider"
              color="semantic.line.normal.alternative"
              sx={accordionDividerStyle({ disableAnimation })}
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
  DefaultComponentPropsInternal<AccordionSummaryProps, 'div'>
>(
  (
    {
      disabled: givenDisabled,
      children,
      leadingContent,
      trailingContent,
      textProps,
      verticalPadding = 'large',
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
        verticalPadding={verticalPadding}
        disabled={disabled}
        aria-disabled={disabled}
        disableInteraction={disabled}
        aria-expanded={expanded}
        aria-controls={detailsId}
        tabIndex={disabled ? -1 : 0}
        id={summaryId}
        leadingContent={leadingContent}
        trailingContent={
          trailingContent ? (
            trailingContent
          ) : (
            <AccordionSummaryContent
              variant="icon"
              rotate
              data-role="accordion-summary-expand-icon"
            >
              <IconChevronDownSmall
                sx={(theme) => ({
                  color: theme.semantic.label.normal,
                })}
              />
            </AccordionSummaryContent>
          )
        }
        textProps={{
          variant: 'body2',
          weight: 'bold',
          ...textProps,
          sx: [accordionSummaryTextStyle, textProps?.sx],
        }}
        {...props}
        sx={[accordionSummaryStyle({ disabled }), sx]}
        onClick={composeEventHandlers(props.onClick, (e) => {
          if (disabled) {
            return;
          }

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
  DefaultComponentPropsInternal<AccordionSummaryContentProps, 'div'>
>(({ sx, rotate = false, variant, ...props }, ref) => {
  const { expanded, disableAnimation } = useAccordionContext(
    ACCORDION_SUMMARY_CONTENT_NAME,
  );

  return (
    <ListCellContent
      ref={ref}
      {...props}
      variant={variant}
      sx={[
        accordionSummaryContentStyle({
          variant,
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

const AccordionDetails = forwardRef(
  <T extends ElementType = 'div'>(
    {
      sx,
      children,
      forceMount = false,
      wrapperSx,
      ...props
    }: PolymorphicPropsInternal<AccordionDetailsProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const { expanded, detailsId, summaryId, disableAnimation } =
      useAccordionContext(ACCORDION_DETAILS_NAME);

    const ref = useRef<ComponentRef<T>>(null);

    const composedRefs = useComposedRefs(forwardedRef, ref as ForwardedRef<T>);

    const [wrapperNode, setWrapperNode] = useState<HTMLDivElement | null>(null);
    const height = useSize(wrapperNode)?.height;

    const prevExpanded = usePrevious(expanded);

    useEffect(() => {
      if (ref.current) {
        const elements = (
          ref.current as unknown as HTMLDivElement
        ).querySelectorAll(
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
              elm.setAttribute(
                'data-prev-tabindex',
                currentTabIndex || 'unset',
              );
            }
            elm.setAttribute('tabindex', '-1');
          }
        });
      }
    }, [expanded]);

    return (
      <AnimationPresence present={expanded || forceMount}>
        <Box
          ref={composedRefs}
          wds-component="accordion-details"
          aria-labelledby={summaryId}
          aria-hidden={!expanded}
          id={detailsId}
          {...props}
          data-status={expanded ? 'open' : 'close'}
          sx={[
            accordionDetailsStyle({
              disableAnimation,
              shouldAnimate: prevExpanded !== expanded,
            }),
            wrapperSx,
          ]}
          style={
            {
              '--wds-accordion-height': `${height}px`,
              ...props.style,
            } as CSSProperties
          }
        >
          <FlexBox
            ref={setWrapperNode}
            data-role="accordion-details-wrapper"
            sx={[accordionDetailsWrapperStyle, sx]}
          >
            {children}
          </FlexBox>
        </Box>
      </AnimationPresence>
    );
  },
) as PolymorphicComponentInternal<AccordionDetailsProps, 'div'>;

AccordionDetails.displayName = ACCORDION_DETAILS_NAME;

const AccordionDescription = forwardRef<
  HTMLParagraphElement,
  DefaultComponentPropsInternal<AccordionDescriptionProps, 'p'>
>((props, ref) => {
  return (
    <Typography
      ref={ref}
      as="p"
      variant="label1"
      weight="regular"
      color="semantic.label.neutral"
      {...props}
    />
  );
});

AccordionDescription.displayName = ACCORDION_DESCRIPTION_NAME;

const AccordionContent = forwardRef(
  <T extends ElementType = 'div'>(
    { sx, ...props }: PolymorphicPropsInternal<AccordionContentProps, T>,
    ref: ForwardedRef<T>,
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
) as PolymorphicComponentInternal<AccordionContentProps, 'div'>;

AccordionContent.displayName = ACCORDION_CONTENT_NAME;

export {
  Accordion,
  AccordionSummary,
  AccordionSummaryContent,
  AccordionDetails,
  AccordionDescription,
  AccordionContent,
};

export type {
  AccordionProps,
  AccordionSummaryProps,
  AccordionSummaryContentProps,
  AccordionDetailsProps,
  AccordionDescriptionProps,
  AccordionContentProps,
};
