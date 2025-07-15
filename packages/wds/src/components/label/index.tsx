import { forwardRef } from 'react';

import { Typography } from '../typography';

import type { LabelProps } from './types';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

const Label = forwardRef<
  HTMLLabelElement,
  DefaultComponentPropsInternal<LabelProps, 'label'>
>(({ display = 'inline-block', required, children, ...props }, ref) => {
  return (
    <Typography
      variant="label1"
      weight="bold"
      color="semantic.label.neutral"
      as="label"
      ref={ref}
      display={display}
      {...props}
    >
      {children}
      {required && (
        <Typography
          variant="label1"
          weight="medium"
          display="inline-block"
          sx={{ marginLeft: '4px' }}
          color="semantic.status.negative"
        >
          *
        </Typography>
      )}
    </Typography>
  );
});

Label.displayName = 'Label';

export { Label };

export type { LabelProps };
