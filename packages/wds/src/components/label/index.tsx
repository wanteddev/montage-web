'use client';
import { forwardRef } from 'react';

import Typography from '../typography';

import type { ComponentPropsWithRef } from 'react';

type Props = Omit<ComponentPropsWithRef<typeof Typography<'label'>>, 'as'>;

const Label = forwardRef<HTMLLabelElement, Props>((props, ref) => {
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
