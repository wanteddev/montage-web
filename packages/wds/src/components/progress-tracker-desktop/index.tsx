'use client';
import { forwardRef, useCallback, useMemo } from 'react';
import {
  IconCheckThick,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import Typography from '../typography';
import FlexBox from '../flex-box';
import { findComponentInChildren } from '../../utils/children';

import {
  progressChevronStyle,
  progressCircleStyle,
  progressTrackerDesktopWrapperStyle,
  progressTrackerLabelStyle,
} from './style';
import {
  PROGRESS_TRACKER_DESKTOP_ITEM_NAME,
  PROGRESS_TRACKER_DESKTOP_NAME,
} from './constants';
import {
  ProgressTrackerDesktopProvider,
  useProgressTrackerDesktopContext,
} from './contexts';

import type {
  DefaultComponentProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type {
  ProgressTrackerDesktopItemProps,
  ProgressTrackerDesktopProps,
} from './types';

const ProgressTrackerDesktop = forwardRef<
  HTMLOListElement,
  DefaultComponentProps<ProgressTrackerDesktopProps, 'ol'>
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

    const steps = useMemo(() => {
      return findComponentInChildren<ProgressTrackerDesktopItemProps>(
        children,
        'isProgressTrackerDesktopItem',
      );
    }, [children]);

    return (
      <ProgressTrackerDesktopProvider
        value={value}
        onValueChange={setValue}
        steps={steps}
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
          wds-component="progress-tracker-desktop"
          aria-label="progress"
          ref={ref}
          {...props}
          as="ol"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          sx={[progressTrackerDesktopWrapperStyle, props.sx]}
        >
          {children}
        </FlexBox>
      </ProgressTrackerDesktopProvider>
    );
  },
);

ProgressTrackerDesktop.displayName = PROGRESS_TRACKER_DESKTOP_NAME;

const ProgressTrackerDesktopItem = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressTrackerDesktopItemProps, 'li'>
>(({ value, label, completedLabel, ...props }, ref) => {
  const {
    value: contextValue,
    getStepIndex,
    getActiveStepIndex,
  } = useProgressTrackerDesktopContext(PROGRESS_TRACKER_DESKTOP_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex > index;

  const isFirst = index === 0;

  return (
    <>
      {!isFirst && <IconChevronRightTightSmall sx={progressChevronStyle} />}

      <FlexBox
        as="li"
        ref={ref}
        wds-component="progress-tracker-desktop-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        alignItems="center"
        gap="8px"
        {...props}
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

        <ProgressTrackerDesktopItemLabel
          isActive={isActive}
          isCompleted={isCompleted}
          label={label}
          completedLabel={completedLabel}
        />
      </FlexBox>
    </>
  );
});

ProgressTrackerDesktopItem.displayName = PROGRESS_TRACKER_DESKTOP_ITEM_NAME;

// @ts-expect-error
ProgressTrackerDesktopItem.isProgressTrackerDesktopItem = true;

export { ProgressTrackerDesktop, ProgressTrackerDesktopItem };

const ProgressTrackerDesktopItemLabel = ({
  isCompleted,
  isActive,
  label,
  completedLabel,
}: Pick<ProgressTrackerDesktopItemProps, 'label' | 'completedLabel'> & {
  isCompleted: boolean;
  isActive: boolean;
}) => {
  const color: ThemeColorsToken = isActive
    ? 'palette.label.normal'
    : 'palette.label.alternative';

  if (isCompleted) {
    return Boolean(completedLabel) ? (
      <Typography
        sx={progressTrackerLabelStyle}
        data-role="progress-tracker-desktop-item-label"
        color={color}
        variant="label2"
        weight="bold"
      >
        {completedLabel}
      </Typography>
    ) : null;
  }

  return Boolean(label) ? (
    <Typography
      sx={progressTrackerLabelStyle}
      data-role="progress-tracker-desktop-item-label"
      color={color}
      variant="label2"
      weight="bold"
    >
      {label}
    </Typography>
  ) : null;
};
