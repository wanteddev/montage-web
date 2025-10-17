import { forwardRef } from 'react';

import { Checkbox } from '../checkbox';

import { roundCheckboxStyle } from './style';

import type { RoundCheckboxProps } from './types';
import type { ComponentRef } from 'react';

/**
 * @deprecated
 */
const RoundCheckbox = forwardRef<
  ComponentRef<typeof Checkbox>,
  RoundCheckboxProps
>((props, ref) => {
  return (
    <Checkbox
      ref={ref}
      wds-component="round-checkbox"
      tight={false}
      {...props}
      sx={[roundCheckboxStyle(props), props.sx]}
    />
  );
});

RoundCheckbox.displayName = 'RoundCheckbox';

export { RoundCheckbox };

export type { RoundCheckboxProps };
