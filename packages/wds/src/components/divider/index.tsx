'use client';
import { forwardRef } from 'react';

import { dividerStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { DividerProps } from './types';

type Props = MergeElementProps<'hr', DividerProps>;

const Divider = forwardRef<HTMLHRElement, Props>(
  (
    {
      size = '100%',
      thickness = '1px',
      variant = 'normal',
      vertical = false,
      color = 'palette.line.normal.normal',
      xs,
      sm,
      md,
      lg,
      ...props
    },
    ref,
  ) => {
    return (
      <hr
        ref={ref}
        css={dividerStyle({
          variant,
          thickness,
          xs,
          sm,
          md,
          lg,
          vertical,
          color,
          size,
        })}
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';

export default Divider;
