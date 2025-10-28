import { forwardRef, useCallback, useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import { findComponentInChildren } from '../../utils/internal/children';

import {
  progressListStyle,
  progressListWrapperStyle,
  progressStepWrapperStyle,
} from './style';
import {
  ProgressStepIndicatorProvider,
  useProgressStepIndicatorContext,
} from './contexts';
import {
  PROGRESS_STEP_INDICATOR_ITEM_NAME,
  PROGRESS_STEP_INDICATOR_NAME,
} from './constants';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type {
  ProgressStepIndicatorItemProps,
  ProgressStepIndicatorProps,
} from './types';

/**
 * @deprecated
 */
const ProgressStepIndicator = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ProgressStepIndicatorProps, 'div'>
>(
  (
    {
      size = 'medium',
      divider = true,
      value: originValue,
      defaultValue,
      onValueChange,
      xs,
      sm,
      md,
      lg,
      xl,
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
      return findComponentInChildren<ProgressStepIndicatorItemProps>(
        children,
        'isProgressStepIndicatorItem',
      );
    }, [children]);

    return (
      <ProgressStepIndicatorProvider
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
        <Box
          wds-component="progress-step-indicator"
          aria-label="progress"
          ref={ref}
          {...props}
          sx={[
            progressStepWrapperStyle({ size, divider, xs, sm, md, lg, xl }),
            props.sx,
          ]}
        >
          <Box as="ol" sx={progressListWrapperStyle}>
            {children}
          </Box>
        </Box>
      </ProgressStepIndicatorProvider>
    );
  },
);

ProgressStepIndicator.displayName = PROGRESS_STEP_INDICATOR_NAME;

/**
 * @deprecated
 */
const ProgressStepIndicatorItem = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<ProgressStepIndicatorItemProps, 'li'>
>(({ value, ...props }, ref) => {
  const {
    value: contextValue,
    getStepIndex,
    getActiveStepIndex,
  } = useProgressStepIndicatorContext(PROGRESS_STEP_INDICATOR_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  const isCompleted = activeIndex !== -1 && activeIndex >= index;

  return (
    <Box
      as="li"
      ref={ref}
      wds-component="progress-step-indicator-item"
      aria-label={`Step ${index}`}
      {...props}
      data-is-completed={isCompleted}
      aria-current={isActive ? 'step' : undefined}
      sx={[progressListStyle, props.sx]}
    />
  );
});

ProgressStepIndicatorItem.displayName = PROGRESS_STEP_INDICATOR_ITEM_NAME;

// @ts-expect-error
ProgressStepIndicatorItem.isProgressStepIndicatorItem = true;

export { ProgressStepIndicator, ProgressStepIndicatorItem };

export type { ProgressStepIndicatorProps, ProgressStepIndicatorItemProps };
