'use client';
import { forwardRef } from 'react';

import Typography from '../typography';

import type { DefaultComponentProps, Merge } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';

const Label = forwardRef<
  HTMLLabelElement,
  Merge<{ required?: boolean }, DefaultComponentProps<TypographyProps, 'label'>>
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
