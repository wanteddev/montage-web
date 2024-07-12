'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { floatingActionStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { FloatingActionProps } from './types';

const FloatingAction = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      size = '56px',
      iconSize = '24px',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<FloatingActionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <WithInteraction
        color="palette.label.normal"
        disabled={disableInteraction || disabled}
        variant="strong"
      >
        <Box
          as={(as || 'button') as ElementType}
          ref={ref}
          aria-disabled={disabled ? 'true' : undefined}
          disabled={disabled}
          type="button"
          {...props}
          sx={[
            floatingActionStyle({ size, iconSize, xs, sm, md, lg, xl }),
            props.sx,
          ]}
        >
          {children}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<FloatingActionProps, 'button'>;

FloatingAction.displayName = 'FloatingAction';

export default FloatingAction;
