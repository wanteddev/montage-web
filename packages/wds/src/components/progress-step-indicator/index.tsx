'use client';
import { forwardRef } from 'react';

import {
  progressListStyle,
  progressListWrapperStyle,
  progressStepWrapperStyle,
} from './style';

import type { MergeElementProps } from '../../types';
import type { CSSProperties } from 'react';
import type { ProgressStepIndicatorProps } from './types';

type Props = MergeElementProps<'div', ProgressStepIndicatorProps>;

const ProgressStepIndicator = forwardRef<HTMLDivElement, Props>(
  (
    {
      size = 'medium',
      divider = true,
      steps,
      activeStep,
      onStepClick,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const activeIndex = steps.findIndex((v) => v === activeStep);

    return (
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
        <ol css={progressListWrapperStyle}>
          {steps.map((step, i) => {
            return (
              <li
                key={`${step}-${i}`}
                aria-current={step === activeStep ? 'step' : undefined}
                css={progressListStyle(activeIndex > i)}
                aria-label={step.toString()}
                onClick={() => onStepClick?.(step)}
              />
            );
          })}
        </ol>
      </div>
    );
  },
);

ProgressStepIndicator.displayName = 'ProgressStepIndicator';

export default ProgressStepIndicator;
