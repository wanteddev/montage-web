import { forwardRef } from 'react';

import Checkbox from '../checkbox';

import { checkMarkStyle } from './style';

import type { CheckMarkProps } from './types';
import type { ElementRef } from 'react';

type Props = CheckMarkProps;

const CheckMark = forwardRef<ElementRef<typeof Checkbox>, Props>(
  ({ size = 'normal', bold = false, tight = false, ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
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

export default CheckMark;
