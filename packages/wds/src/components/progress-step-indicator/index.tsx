'use client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

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

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { CSSProperties } from 'react';
import type {
  ProgressStepIndicatorItemProps,
  ProgressStepIndicatorProps,
} from './types';

const ProgressStepIndicator = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ProgressStepIndicatorProps, 'div'>
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
    const [value = '', setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [steps, setSteps] = useState<Array<string>>([]);

    return (
      <ProgressStepIndicatorProvider
        value={value}
        onValueChange={setValue}
        steps={steps}
        onStepAdd={useCallback(
          (step: string) => {
            setSteps((prev) => [...prev, step]);
          },
          [setSteps],
        )}
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
          wds-component="progress-step-indicator"
          aria-label="progress"
          ref={ref}
          {...props}
          sx={[
            progressStepWrapperStyle({ size, divider, xs, sm, md, lg, xl }),
            props.sx,
          ]}
          style={
            {
              ...props.style,
              '--wds-progress-step-indicator-width': `calc(100% / ${steps.length})`,
            } as CSSProperties
          }
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

const ProgressStepIndicatorItem = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<ProgressStepIndicatorItemProps, 'li'>
>(({ value, ...props }, ref) => {
  const {
    value: contextValue,
    onStepAdd,
    onStepRemove,
    getStepIndex,
    getActiveStepIndex,
  } = useProgressStepIndicatorContext(PROGRESS_STEP_INDICATOR_ITEM_NAME);

  const isActive = contextValue === value;
  const index = getStepIndex(value);
  const activeIndex = getActiveStepIndex();

  useEffect(() => {
    onStepAdd(value);

    return () => onStepRemove(value);
  }, [onStepAdd, onStepRemove, value]);

  return (
    <Box
      as="li"
      ref={ref}
      wds-component="progress-step-indicator-item"
      aria-current={isActive ? 'step' : undefined}
      {...props}
      sx={[progressListStyle, props.sx]}
      style={
        {
          ...props.style,
          ['--wds-progress-step-indicator-inset']:
            activeIndex >= index ? '0' : '0 0 0 -100%',
        } as CSSProperties
      }
    />
  );
});

ProgressStepIndicatorItem.displayName = PROGRESS_STEP_INDICATOR_ITEM_NAME;

export { ProgressStepIndicator, ProgressStepIndicatorItem };
