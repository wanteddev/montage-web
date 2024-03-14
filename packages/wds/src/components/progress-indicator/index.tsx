'use client';
import { forwardRef } from 'react';

import { progressIndicatorStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { CSSProperties } from 'react';
import type { ProgressIndicatorProps } from './types';

type Props = MergeElementProps<'div', ProgressIndicatorProps>;

const ProgressIndicator = forwardRef<HTMLDivElement, Props>(
  ({ percent = 0, ...props }, ref) => {
    return (
      <div
        wds-component="progress-indicator"
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        aria-valuetext={percent + '%'}
        ref={ref}
        css={progressIndicatorStyle}
        {...props}
        style={
          {
            ...props.style,
            '--wds-progress-indicator-transform': `translateX(${-100 + percent}%)`,
          } as CSSProperties
        }
      />
    );
  },
);

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
