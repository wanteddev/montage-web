'use client';
import { forwardRef } from 'react';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import { dividerStyle } from './style';

import type { DividerProps } from './types';

type Props = MergeElementProps<'hr', DividerProps>;

const Divider = forwardRef<HTMLHRElement, Props>(
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
