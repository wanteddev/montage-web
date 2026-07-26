import { forwardRef } from 'react';
import { Box } from '@montage-ui/engine';

import { dividerStyle } from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { DividerProps } from './types';

const Divider = forwardRef<
  HTMLHRElement,
  DefaultComponentPropsInternal<DividerProps, 'hr'>
>(
  (
    {
      size = '100%',
      thickness = '1px',
      vertical = false,
      color = 'semantic.line.neutral.primary',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        as="hr"
        ref={ref}
        role="separator"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        {...props}
        sx={[
          dividerStyle({
            thickness,
            xs,
            sm,
            md,
            lg,
            xl,
            vertical,
            color,
            size,
          }),
          props.sx,
        ]}
      />
    );
  },
);

Divider.displayName = 'Divider';

export { Divider };

export type { DividerProps };
