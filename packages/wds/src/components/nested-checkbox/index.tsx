import { forwardRef } from 'react';

import Checkbox from '../checkbox';

import { nestedCheckboxStyle } from './style';

import type { NestedCheckboxProps } from './types';
import type { ElementRef } from 'react';

type Props = NestedCheckboxProps;

const NestedCheckbox = forwardRef<ElementRef<typeof Checkbox>, Props>(
  (props, ref) => {
    return (
      <Checkbox
        ref={ref}
        css={nestedCheckboxStyle({
          size: props.size || 'normal',
          xs: props.xs,
          sm: props.sm,
          md: props.md,
          lg: props.lg,
        })}
        {...props}
      />
    );
  },
);

NestedCheckbox.displayName = 'NestedCheckbox';

export default NestedCheckbox;
