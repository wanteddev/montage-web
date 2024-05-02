'use client';
import { forwardRef } from 'react';
import { Box, type MergeWithCustomElementProps } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { floatingActionStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { FloatingActionProps } from './types';

type Props<T extends ElementType = 'button'> = MergeWithCustomElementProps<
  T,
  FloatingActionProps
>;

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
    }: Props<E>,
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
);

FloatingAction.displayName = 'FloatingAction';

export default FloatingAction as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
