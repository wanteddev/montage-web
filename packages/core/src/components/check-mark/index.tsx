import { forwardRef } from 'react';

import { Checkbox } from '../checkbox';

import { checkMarkStyle } from './style';

import type { CheckMarkProps } from './types';

const CheckMark = forwardRef<HTMLButtonElement, CheckMarkProps>(
  ({ size = 'medium', bold = false, tight = false, ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        wds-component="check-mark"
        tight={false}
        {...props}
        sx={[
          checkMarkStyle({
            ...props,
            size,
            tight,
            bold,
          }),
          props.sx,
        ]}
      />
    );
  },
);

CheckMark.displayName = 'CheckMark';

export { CheckMark };

export type { CheckMarkProps };
