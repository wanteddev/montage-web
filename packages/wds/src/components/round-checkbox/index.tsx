import { forwardRef } from 'react';

import { Checkbox } from '../checkbox';

import { roundCheckboxStyle } from './style';

import type { RoundCheckboxProps } from './types';
import type { ElementRef } from 'react';

/**
 * @deprecated
 */
const RoundCheckbox = forwardRef<
  ElementRef<typeof Checkbox>,
  RoundCheckboxProps
>((props, ref) => {
  return (
    <Checkbox ref={ref} {...props} sx={[roundCheckboxStyle(props), props.sx]} />
  );
});

RoundCheckbox.displayName = 'RoundCheckbox';

export { RoundCheckbox };

export type { RoundCheckboxProps };
