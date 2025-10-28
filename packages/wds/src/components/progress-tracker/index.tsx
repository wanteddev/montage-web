import { forwardRef, useCallback, useMemo } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import { Typography } from '../typography';
import { FlexBox } from '../flex-box';
import { findComponentInChildren } from '../../utils/internal/children';

import {
  progressCircleStyle,
  progressTrackerItemContentStyle,
  progressTrackerItemDividerStyle,
  progressTrackerItemHorizontalStyle,
  progressTrackerItemHorizontalWrapperStyle,
  progressTrackerItemVerticalLabelWrapperStyle,
  progressTrackerItemVerticalStyle,
  progressTrackerWrapperStyle,
} from './style';
import { PROGRESS_TRACKER_ITEM_NAME, PROGRESS_TRACKER_NAME } from './constants';
import { ProgressTrackerProvider, useProgressTrackerContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type {
  ProgressTrackerItemProps,
  ProgressTrackerLabelContentProps,
  ProgressTrackerProps,
} from './types';

const ProgressTracker = forwardRef<
  HTMLOListElement,
  DefaultComponentPropsInternal<ProgressTrackerProps, 'ol'>
>(
  (
    {
      direction = 'horizontal',
      value: originValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue ?? '',
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
        direction={direction}
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
          sx={[progressTrackerWrapperStyle({ direction }), props.sx]}
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
  DefaultComponentPropsInternal<ProgressTrackerItemProps, 'li'>
>(({ labelContent, ...props }, ref) => {
  const { direction } = useProgressTrackerContext(PROGRESS_TRACKER_ITEM_NAME);

  if (direction === 'vertical') {
    return (
      <ProgressTrackerItemVertical
        labelContent={labelContent}
        {...props}
        ref={ref}
      />
    );
  }

  return <ProgressTrackerItemHorizontal {...props} ref={ref} />;
});

ProgressTrackerItem.displayName = PROGRESS_TRACKER_ITEM_NAME;

// @ts-expect-error
ProgressTrackerItem.isProgressTrackerItem = true;

const ProgressTrackerItemVertical = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<ProgressTrackerItemProps, 'li'>
>(({ value, label, completedLabel, children, labelContent, ...props }, ref) => {
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
      <FlexBox
        data-role="progress-tracker-item-step-wrapper"
        flex="1"
        gap="8px"
      >
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
              <Typography
                variant="caption1"
                weight="bold"
                align="center"
                data-role="progress-tracker-item-step"
              >
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

        <FlexBox flexDirection="column" flex="1">
          {(Boolean(label) ||
            Boolean(completedLabel) ||
            Boolean(labelContent)) && (
            <FlexBox
              data-role="progress-tracker-item-label-wrapper"
              sx={progressTrackerItemVerticalLabelWrapperStyle}
            >
              <ProgressTrackerItemLabel
                isCompleted={isCompleted}
                isActive={isActive}
                label={label}
                completedLabel={completedLabel}
              />

              <FlexBox
                data-role="progress-tracker-item-label-content-wrapper"
                flex="1"
              >
                {labelContent}
              </FlexBox>
            </FlexBox>
          )}

          {Boolean(children) ? (
            <FlexBox
              data-role="progress-tracker-item-content"
              sx={progressTrackerItemContentStyle}
            >
              {children}
            </FlexBox>
          ) : (
            <FlexBox
              data-role="progress-tracker-item-content"
              sx={{ width: 0, height: 0 }}
            >
              {children}
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
});

const ProgressTrackerItemHorizontal = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<ProgressTrackerItemProps, 'li'>
>(({ value, label, completedLabel, ...props }, ref) => {
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

  const isFirst = index === 0;
  const isLast = index === getTotalLength() - 1;

  const number = (index === -1 ? 0 : index) + 1;

  return (
    <FlexBox
      as="li"
      ref={ref}
      wds-component="progress-tracker-item"
      aria-current={isActive ? 'step' : undefined}
      aria-label={`Step ${index}`}
      flexDirection="column"
      alignItems="center"
      gap="8px"
      data-completed={isCompleted}
      data-active={isActive}
      {...props}
      sx={[progressTrackerItemHorizontalStyle, props.sx]}
    >
      <FlexBox
        data-role="progress-tracker-item-wrapper"
        flexDirection="row"
        alignItems="center"
        sx={progressTrackerItemHorizontalWrapperStyle}
      >
        <Box
          data-role="progress-tracker-item-divider"
          sx={[
            progressTrackerItemDividerStyle(
              isActive || isCompleted,
              'horizontal',
            ),
            isFirst && { backgroundColor: 'transparent' },
          ]}
        />

        <FlexBox flexDirection="column" alignItems="center">
          <FlexBox
            sx={progressCircleStyle(isActive, isCompleted)}
            alignItems="center"
            justifyContent="center"
          >
            {isCompleted ? (
              <IconCheckThick />
            ) : (
              <Typography
                variant="caption1"
                weight="bold"
                align="center"
                data-role="progress-tracker-item-step"
              >
                {number}
              </Typography>
            )}
          </FlexBox>
        </FlexBox>

        <Box
          data-role="progress-tracker-item-divider"
          sx={[
            progressTrackerItemDividerStyle(isCompleted, 'horizontal'),
            isLast && { backgroundColor: 'transparent' },
          ]}
        />
      </FlexBox>

      <ProgressTrackerItemLabel
        isCompleted={isCompleted}
        isActive={isActive}
        label={label}
        completedLabel={completedLabel}
      />
    </FlexBox>
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
        color={
          isActive ? 'semantic.label.normal' : 'semantic.label.alternative'
        }
        variant="label2"
        weight="bold"
        align="center"
      >
        {completedLabel}
      </Typography>
    ) : null;
  }

  return Boolean(label) ? (
    <Typography
      sx={{ padding: '1px 0px', height: 'fit-content' }}
      data-role="progress-tracker-item-label"
      color={isActive ? 'semantic.label.normal' : 'semantic.label.alternative'}
      variant="label2"
      weight="bold"
      align="center"
    >
      {label}
    </Typography>
  ) : null;
};

const ProgressTrackerLabelContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ProgressTrackerLabelContentProps, 'div'>
>(({ variant = 'custom', ...props }, ref) => {
  switch (variant) {
    case 'badge':
      return (
        <FlexBox
          wds-component="progress-tracker-label-content"
          ref={ref}
          alignItems="center"
          gap="4px"
          {...props}
          sx={[{ height: 20 }, props.sx]}
        />
      );
    case 'caption':
      return (
        <FlexBox
          wds-component="progress-tracker-label-content"
          ref={ref}
          alignItems="center"
          justifyContent="flex-end"
          gap="4px"
          flex="1"
          {...props}
          sx={[{ padding: '2px 0px', height: 20 }, props.sx]}
        >
          <Typography
            variant="caption1"
            weight="regular"
            color="semantic.label.alternative"
          >
            {props.children}
          </Typography>
        </FlexBox>
      );
    case 'custom':
      return (
        <FlexBox
          wds-component="progress-tracker-label-content"
          ref={ref}
          flex="1"
          {...props}
          sx={[{ height: 20 }, props.sx]}
        />
      );
  }
});

ProgressTrackerLabelContent.displayName = 'ProgressTrackerLabelContent';

export { ProgressTracker, ProgressTrackerItem, ProgressTrackerLabelContent };

export type {
  ProgressTrackerProps,
  ProgressTrackerItemProps,
  ProgressTrackerLabelContentProps,
};
