'use client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import Typography from '../typography';
import FlexBox from '../flex-box';

import {
  progressCircleStyle,
  progressCircleWrapperStyle,
  progressConnectorStyle,
  progressTrackerItemStyle,
  progressTrackerWrapperStyle,
} from './style';
import { PROGRESS_TRACKER_ITEM_NAME, PROGRESS_TRACKER_NAME } from './constants';
import { ProgressTrackerProvider, useProgressTrackerContext } from './contexts';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ProgressTrackerItemProps, ProgressTrackerProps } from './types';

const ProgressTracker = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ProgressTrackerProps, 'div'>
>(
  (
    { value: originValue, defaultValue, onValueChange, children, ...props },
    ref,
  ) => {
    const [value = '', setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [steps, setSteps] = useState<Array<string>>([]);

    return (
      <ProgressTrackerProvider
        value={value}
        onValueChange={setValue}
        steps={steps}
        onStepAdd={useCallback(
          (step: string) => {
            setSteps((prev) => [...prev, step]);
          },
          [setSteps],
        )}
        getTotalLength={useCallback(() => steps.length, [steps])}
        onStepRemove={useCallback(
          (step: string) => {
            setSteps((prev) => prev.filter((cur) => cur !== step));
          },
          [setSteps],
        )}
        getStepIndex={useCallback(
          (step: string) => steps.findIndex((cur) => cur === step),
          [steps],
        )}
        getActiveStepIndex={useCallback(
          () => steps.findIndex((cur) => cur === value),
          [steps, value],
        )}
      >
        <Box
          wds-component="progress-tracker"
          aria-label="progress"
          ref={ref}
          {...props}
          sx={[progressTrackerWrapperStyle, props.sx]}
        >
          <FlexBox as="ol" alignItems="center">
            {children}
          </FlexBox>
        </Box>
      </ProgressTrackerProvider>
    );
  },
);

ProgressTracker.displayName = PROGRESS_TRACKER_NAME;

const ProgressTrackerItem = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressTrackerItemProps, 'li'>
>(({ value, ...props }, ref) => {
  const {
    value: contextValue,
    onStepAdd,
    onStepRemove,
    getStepIndex,
    getActiveStepIndex,
    getTotalLength,
  } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex > index;

  const isFirst = index === 0;
  const isLast = index === getTotalLength() - 1;

  useEffect(() => {
    onStepAdd(value);

    return () => onStepRemove(value);
  }, [onStepAdd, onStepRemove, value]);

  return (
    <>
      {!isFirst && <Box sx={progressConnectorStyle(isActive || isCompleted)} />}

      <FlexBox
        as="li"
        ref={ref}
        wds-component="progress-tracker-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        flexDirection="column"
        alignItems="center"
        {...props}
        sx={[progressTrackerItemStyle(isFirst, isLast), props.sx]}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          role="presentation"
          sx={progressCircleWrapperStyle(isActive)}
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
                {(index === -1 ? 0 : index) + 1}
              </Typography>
            )}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
});

ProgressTrackerItem.displayName = PROGRESS_TRACKER_ITEM_NAME;

export { ProgressTracker, ProgressTrackerItem };
