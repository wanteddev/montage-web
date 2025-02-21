import { forwardRef } from 'react';

import Checkbox from '../checkbox';

import { checkMarkStyle } from './style';

import type { CheckMarkProps } from './types';
import type { ElementRef } from 'react';

type Props = CheckMarkProps;

const CheckMark = forwardRef<ElementRef<typeof Checkbox>, Props>(
  ({ size = 'normal', ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        {...props}
        sx={[
          checkMarkStyle({
            ...props,
            size,
          }),
          props.sx,
        ]}
      />
    );
  },
);

CheckMark.displayName = 'CheckMark';

export default CheckMark;
