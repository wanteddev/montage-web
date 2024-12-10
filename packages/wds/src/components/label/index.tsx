'use client';
import { forwardRef } from 'react';

import Typography from '../typography';

import type { LabelProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const Label = forwardRef<
  HTMLLabelElement,
  DefaultComponentProps<LabelProps, 'label'>
>(({ display = 'inline-block', required, children, ...props }, ref) => {
  return (
    <Typography
      variant="label1_normal"
      weight="bold"
      color="palette.label.neutral"
      as="label"
      ref={ref}
      display={display}
      {...props}
    >
      {children}
      {required && (
        <Typography
          variant="label1_normal"
          weight="medium"
          display="inline-block"
          sx={{ marginLeft: '4px' }}
          color="palette.status.negative"
        >
          *
        </Typography>
      )}
    </Typography>
  );
});

Label.displayName = 'Label';

export default Label;
