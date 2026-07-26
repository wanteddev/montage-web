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
      color="semantic.foreground.neutral.secondary"
      as="label"
      ref={ref}
      display={display}
      {...props}
    >
      <span data-role="label-content">
        <span data-role="label-content-text">{children}</span>

        {required && (
          <Box
            as="span"
            data-role="label-required-mark"
            sx={(theme) => ({
              font: 'inherit',
              fontWeight: '500',
              whiteSpace: 'pre',
              color: theme.semantic.foreground.negative.primary,
            })}
          >
            {' *'}
          </Box>
        )}
      </span>
    </Typography>
  );
});

Label.displayName = 'Label';

export { Label };

export type { LabelProps };
