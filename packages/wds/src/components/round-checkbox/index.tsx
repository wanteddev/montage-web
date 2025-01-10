'use client';
import { forwardRef } from 'react';

import Checkbox from '../checkbox';

import { roundCheckboxStyle } from './style';

import type { RoundCheckboxProps } from './types';
import type { ElementRef } from 'react';

type Props = RoundCheckboxProps;

/**
 * @deprecated
 */
const RoundCheckbox = forwardRef<ElementRef<typeof Checkbox>, Props>(
  (props, ref) => {
    return (
      <Checkbox
        ref={ref}
        {...props}
        sx={[roundCheckboxStyle(props), props.sx]}
      />
    );
  },
);

RoundCheckbox.displayName = 'RoundCheckbox';

export default RoundCheckbox;
