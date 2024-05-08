'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { dividerStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { DividerProps } from './types';

const Divider = forwardRef<
  HTMLHRElement,
  DefaultComponentProps<DividerProps, 'hr'>
>(
  (
    {
      size = '100%',
      thickness = '1px',
      vertical = false,
      color = 'palette.line.normal.normal',
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

export default Divider;
