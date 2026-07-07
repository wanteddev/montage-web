import { forwardRef } from 'react';
import { Box } from '@montage-ui/engine';

import { Typography } from '../typography';

import type { LabelProps } from './types';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';

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
        <Box
          as="span"
          sx={(theme) => ({
            display: 'contents',
            font: 'inherit',
            fontWeight: '500',
            color: theme.semantic.status.negative,
          })}
        >
          *
        </Box>
      )}
    </Typography>
  );
});

Label.displayName = 'Label';

export { Label };

export type { LabelProps };
