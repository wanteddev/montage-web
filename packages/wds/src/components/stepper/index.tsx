import { forwardRef, useCallback, useMemo } from 'react';
import {
  IconCheckThick,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { Typography } from '../typography';
import { FlexBox } from '../flex-box';
import { findComponentInChildren } from '../../utils/internal/children';

import {
  stepperChevronStyle,
  stepperCircleStyle,
  stepperLabelStyle,
  stepperWrapperStyle,
} from './style';
import { STEPPER_ITEM_NAME, STEPPER_NAME } from './constants';
import { StepperProvider, useStepperContext } from './contexts';

import type {
  DefaultComponentPropsInternal,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { StepperItemProps, StepperProps } from './types';

const Stepper = forwardRef<
  HTMLOListElement,
  DefaultComponentPropsInternal<StepperProps, 'ol'>
>(
  (
    { value: originValue, defaultValue, onValueChange, children, ...props },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue ?? '',
      onChange: onValueChange,
    });

    const steps = useMemo(() => {
      return findComponentInChildren<StepperItemProps>(
        children,
        'isStepperItem',
      );
    }, [children]);

    return (
      <StepperProvider
        value={value}
        onValueChange={setValue}
        steps={steps}
        getStepIndex={useCallback(
          (v: string) => steps.findIndex((cur) => cur.value === v),
          [steps],
        )}
        getActiveStepIndex={useCallback(
          () => steps.findIndex((cur) => cur.value === value),
          [steps, value],
        )}
      >
        <FlexBox
          wds-component="stepper"
          aria-label="progress"
          ref={ref}
          {...props}
          as="ol"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          sx={[stepperWrapperStyle, props.sx]}
        >
          {children}
        </FlexBox>
      </StepperProvider>
    );
  },
);

Stepper.displayName = STEPPER_NAME;

const StepperItem = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<StepperItemProps, 'li'>
>(({ value, label, completedLabel, ...props }, ref) => {
  const {
    value: contextValue,
    getStepIndex,
    getActiveStepIndex,
  } = useStepperContext(STEPPER_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex > index;

  const isFirst = index === 0;

  return (
    <>
      {!isFirst && <IconChevronRightTightSmall sx={stepperChevronStyle} />}

      <FlexBox
        as="li"
        ref={ref}
        wds-component="stepper-item"
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index}`}
        alignItems="center"
        gap="8px"
        {...props}
      >
        <FlexBox
          sx={stepperCircleStyle(isActive, isCompleted)}
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
              data-role="stepper-item-step"
            >
              {(index === -1 ? 0 : index) + 1}
            </Typography>
          )}
        </FlexBox>

        <StepperItemLabel
          isActive={isActive}
          isCompleted={isCompleted}
          label={label}
          completedLabel={completedLabel}
        />
      </FlexBox>
    </>
  );
});

StepperItem.displayName = STEPPER_ITEM_NAME;

// @ts-expect-error
StepperItem.isStepperItem = true;

export { Stepper, StepperItem };

export type { StepperProps, StepperItemProps };

const StepperItemLabel = ({
  isCompleted,
  isActive,
  label,
  completedLabel,
}: Pick<StepperItemProps, 'label' | 'completedLabel'> & {
  isCompleted: boolean;
  isActive: boolean;
}) => {
  const color: ThemeColorsToken = isActive
    ? 'semantic.label.normal'
    : 'semantic.label.alternative';

  if (isCompleted) {
    return Boolean(completedLabel) ? (
      <Typography
        sx={stepperLabelStyle}
        data-role="stepper-item-label"
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
      sx={stepperLabelStyle}
      data-role="stepper-item-label"
      color={color}
      variant="label2"
      weight="bold"
    >
      {label}
    </Typography>
  ) : null;
};
