'use client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

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

import type { MergeElementProps } from '../../types';
import type { CSSProperties } from 'react';
import type {
  ProgressStepIndicatorItemProps,
  ProgressStepIndicatorProps,
} from './types';

const ProgressStepIndicator = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', ProgressStepIndicatorProps>
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
        <div
          wds-component="progress-step-indicator"
          aria-label="progress"
          ref={ref}
          css={progressStepWrapperStyle({ size, divider, xs, sm, md, lg, xl })}
          {...props}
          style={
            {
              ...props.style,
              '--wds-progress-step-indicator-width': `calc(100% / ${steps.length})`,
            } as CSSProperties
          }
        >
          <ol css={progressListWrapperStyle}>{children}</ol>
        </div>
      </ProgressStepIndicatorProvider>
    );
  },
);

ProgressStepIndicator.displayName = PROGRESS_STEP_INDICATOR_NAME;

const ProgressStepIndicatorItem = forwardRef<
  HTMLLIElement,
  MergeElementProps<'li', ProgressStepIndicatorItemProps>
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
    <li
      ref={ref}
      wds-component="progress-step-indicator-item"
      aria-current={isActive ? 'step' : undefined}
      css={progressListStyle}
      {...props}
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
