'use client';
import { forwardRef, useCallback, useMemo } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import Typography from '../typography';
import FlexBox from '../flex-box';
import { findComponentInChildren } from '../../utils/children';

import {
  progressCircleStyle,
  progressTrackerItemContentStyle,
  progressTrackerItemDividerStyle,
  progressTrackerItemHorizontalStyle,
  progressTrackerItemVerticalStyle,
  progressTrackerWrapperStyle,
} from './style';
import { PROGRESS_TRACKER_ITEM_NAME, PROGRESS_TRACKER_NAME } from './constants';
import { ProgressTrackerProvider, useProgressTrackerContext } from './contexts';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ProgressTrackerItemProps, ProgressTrackerProps } from './types';

const ProgressTracker = forwardRef<
  HTMLOListElement,
  DefaultComponentProps<ProgressTrackerProps, 'ol'>
>(
  (
    {
      orientation = 'horizontal',
      value: originValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [value = '', setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const steps = useMemo(() => {
      return findComponentInChildren<ProgressTrackerItemProps>(
        children,
        'isProgressTrackerItem',
      );
    }, [children]);

    return (
      <ProgressTrackerProvider
        orientation={orientation}
        value={value}
        onValueChange={setValue}
        steps={steps}
        getTotalLength={useCallback(() => steps.length, [steps])}
        getStepIndex={useCallback(
          (step: string) => steps.findIndex((cur) => cur.value === step),
          [steps],
        )}
        getActiveStepIndex={useCallback(
          () => steps.findIndex((cur) => cur.value === value),
          [steps, value],
        )}
      >
        <FlexBox
          wds-component="progress-tracker"
          aria-label="progress"
          as="ol"
          ref={ref}
          {...props}
          sx={[progressTrackerWrapperStyle({ orientation }), props.sx]}
        >
          {children}
        </FlexBox>
      </ProgressTrackerProvider>
    );
  },
);

ProgressTracker.displayName = PROGRESS_TRACKER_NAME;

const ProgressTrackerItem = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressTrackerItemProps, 'li'>
>((props, ref) => {
  const { orientation } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  if (orientation === 'vertical') {
    return <ProgressTrackerItemVertical {...props} ref={ref} />;
  }

  return <ProgressTrackerItemHorizontal {...props} ref={ref} />;
});

ProgressTrackerItem.displayName = PROGRESS_TRACKER_ITEM_NAME;

// @ts-expect-error
ProgressTrackerItem.isProgressTrackerItem = true;

const ProgressTrackerItemVertical = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressTrackerItemProps, 'li'>
>(({ value, label, completedLabel, children, ...props }, ref) => {
  const {
    value: contextValue,
    getStepIndex,
    getActiveStepIndex,
    getTotalLength,
  } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex > index;

  const isLast = index === getTotalLength() - 1;

  const number = (index === -1 ? 0 : index) + 1;

  return (
    <>
      <FlexBox
        as="li"
        ref={ref}
        wds-component="progress-tracker-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        gap="20px"
        data-completed={isCompleted}
        data-active={isActive}
        {...props}
        sx={[progressTrackerItemVerticalStyle, props.sx]}
      >
        <FlexBox data-role="progress-tracker-item-wrapper" gap="8px">
          <FlexBox
            data-role="progress-tracker-item-icon-wrapper"
            flexDirection="column"
            alignItems="center"
          >
            <FlexBox
              data-role="progress-tracker-item-stepper"
              sx={progressCircleStyle(isActive, isCompleted)}
              alignItems="center"
              justifyContent="center"
            >
              {isCompleted ? (
                <IconCheckThick />
              ) : (
                <Typography variant="caption1" weight="bold" align="center">
                  {number}
                </Typography>
              )}
            </FlexBox>

            {!isLast && (
              <Box
                data-role="progress-tracker-item-divider"
                sx={progressTrackerItemDividerStyle(isCompleted, 'vertical')}
              />
            )}
          </FlexBox>

          <ProgressTrackerItemLabel
            isCompleted={isCompleted}
            isActive={isActive}
            label={label}
            completedLabel={completedLabel}
          />
        </FlexBox>
      </FlexBox>

      {Boolean(children) && (
        <FlexBox
          data-role="progress-tracker-item-content"
          sx={progressTrackerItemContentStyle}
        >
          {children}
        </FlexBox>
      )}
    </>
  );
});

const ProgressTrackerItemHorizontal = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressTrackerItemProps, 'li'>
>(({ value, label, completedLabel, ...props }, ref) => {
  const {
    value: contextValue,
    getStepIndex,
    getActiveStepIndex,
  } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex > index;

  const isFirst = index === 0;

  const number = (index === -1 ? 0 : index) + 1;

  return (
    <>
      {!isFirst && (
        <Box
          data-role="progress-tracker-item-divider"
          sx={progressTrackerItemDividerStyle(
            isActive || isCompleted,
            'horizontal',
          )}
        />
      )}

      <FlexBox
        as="li"
        ref={ref}
        wds-component="progress-tracker-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        flexDirection="column"
        alignItems="center"
        data-completed={isCompleted}
        data-active={isActive}
        {...props}
        sx={[progressTrackerItemHorizontalStyle, props.sx]}
      >
        <FlexBox
          sx={progressCircleStyle(isActive, isCompleted)}
          alignItems="center"
          justifyContent="center"
        >
          {isCompleted ? (
            <IconCheckThick />
          ) : (
            <Typography variant="caption1" weight="bold" align="center">
              {number}
            </Typography>
          )}

          <ProgressTrackerItemLabel
            isCompleted={isCompleted}
            isActive={isActive}
            label={label}
            completedLabel={completedLabel}
          />
        </FlexBox>
      </FlexBox>
    </>
  );
});

const ProgressTrackerItemLabel = ({
  isCompleted,
  isActive,
  label,
  completedLabel,
}: Pick<ProgressTrackerItemProps, 'label' | 'completedLabel'> & {
  isCompleted: boolean;
  isActive: boolean;
}) => {
  if (isCompleted) {
    return Boolean(completedLabel) ? (
      <Typography
        sx={{ padding: '1px 0px', height: 'fit-content' }}
        data-role="progress-tracker-item-label"
        color={isActive ? 'palette.label.normal' : 'palette.label.alternative'}
        variant="label2"
        weight="bold"
      >
        {completedLabel}
      </Typography>
    ) : null;
  }

  return Boolean(label) ? (
    <Typography
      sx={{ padding: '1px 0px', height: 'fit-content' }}
      data-role="progress-tracker-item-label"
      color={isActive ? 'palette.label.normal' : 'palette.label.alternative'}
      variant="label2"
      weight="bold"
    >
      {label}
    </Typography>
  ) : null;
};

export { ProgressTracker, ProgressTrackerItem };
