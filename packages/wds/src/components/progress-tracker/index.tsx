'use client';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';

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

import type { MergeElementProps } from '@/types';
import type { ReactElement } from 'react';
import type { ProgressTrackerItemProps, ProgressTrackerProps } from './types';

const ProgressTracker = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', ProgressTrackerProps>
>(({ activeStep, children, ...props }, ref) => {
  const childrenArray = Children.toArray(children).filter((v) =>
    isValidElement(v),
  );

  const steps = childrenArray.map((item, index) => {
    const step = item as ReactElement;
    return cloneElement(step, {
      index,
      isLast: index + 1 === childrenArray.length,
      ...step.props,
    });
  });

  return (
    <ProgressTrackerProvider activeStep={activeStep}>
      <div
        wds-component="progress-tracker"
        aria-label="progress"
        ref={ref}
        css={progressTrackerWrapperStyle}
        {...props}
      >
        <FlexBox as="ol" alignItems="center">
          {steps}
        </FlexBox>
      </div>
    </ProgressTrackerProvider>
  );
});

ProgressTracker.displayName = PROGRESS_TRACKER_NAME;

const ProgressTrackerItem = forwardRef<
  HTMLLIElement,
  MergeElementProps<'li', ProgressTrackerItemProps>
>(({ isLast, index, ...props }, ref) => {
  const { activeStep } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  const isActive = activeStep === index;
  const isCompleted = (activeStep ?? -1) > (index ?? 0);

  const isFirst = index === 0;

  return (
    <>
      {!isFirst && (
        <div css={progressConnectorStyle(isActive || isCompleted)} />
      )}

      <FlexBox
        as="li"
        ref={ref}
        wds-component="progress-tracker-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        css={progressTrackerItemStyle(isFirst, isLast)}
        flexDirection="column"
        alignItems="center"
        {...props}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          role="presentation"
          css={progressCircleWrapperStyle(isActive)}
        >
          <FlexBox
            css={progressCircleStyle(isActive, isCompleted)}
            alignItems="center"
            justifyContent="center"
          >
            {isCompleted ? (
              <IconCheckThick />
            ) : (
              <Typography variant="caption1" weight="bold" align="center">
                {(index ?? 0) + 1}
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
