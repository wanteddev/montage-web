'use client';
import { forwardRef } from 'react';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import { progressIndicatorStyle } from './style';

import type { CSSProperties } from 'react';
import type { ProgressIndicatorProps } from './types';

type Props = MergeElementProps<'div', ProgressIndicatorProps>;

const ProgressIndicator = forwardRef<HTMLDivElement, Props>(
  ({ percent = 0, ...props }, ref) => {
    return (
      <Box
        wds-component="progress-indicator"
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        aria-valuetext={percent + '%'}
        ref={ref}
        {...props}
        sx={[progressIndicatorStyle, props.sx]}
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
