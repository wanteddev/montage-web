'use client';
import { forwardRef } from 'react';

import Typography from '../typography';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';

const Label = forwardRef<
  HTMLLabelElement,
  DefaultComponentProps<TypographyProps, 'label'>
>((props, ref) => {
  return (
    <Typography
      variant="label1_normal"
      weight="bold"
      color="palette.label.alternative"
      as="label"
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = 'Label';

export default Label;
