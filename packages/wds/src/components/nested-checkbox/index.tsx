import { forwardRef } from 'react';

import Checkbox from '../checkbox';

import { nestedCheckboxStyle } from './style';

import type { NestedCheckboxProps } from './types';
import type { ElementRef } from 'react';

type Props = NestedCheckboxProps;

const NestedCheckbox = forwardRef<ElementRef<typeof Checkbox>, Props>(
  ({ size = 'normal', ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        {...props}
        sx={[
          nestedCheckboxStyle({
            ...props,
            size,
          }),
          props.sx,
        ]}
      />
    );
  },
);

NestedCheckbox.displayName = 'NestedCheckbox';

export default NestedCheckbox;
