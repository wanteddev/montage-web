'use client';
import { forwardRef } from 'react';

import WithInteraction from '../with-interaction';

import { floatingActionStyle } from './style';

import type { MergeWithCustomElementProps } from '@/types';
import type { ElementRef, ElementType, ForwardedRef, ReactNode } from 'react';
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
    const Comp = as || 'button';

    return (
      <WithInteraction
        color="palette.label.normal"
        disabled={disableInteraction || disabled}
        variant="strong"
      >
        <Comp
          ref={ref}
          css={floatingActionStyle({ size, iconSize, xs, sm, md, lg, xl })}
          aria-disabled={disabled ? 'true' : undefined}
          disabled={disabled}
          {...props}
        >
          {children}
        </Comp>
      </WithInteraction>
    );
  },
);

FloatingAction.displayName = 'FloatingAction';

export default FloatingAction as <E extends ElementType = 'button'>(
  props: Props<E>,
) => ReactNode;
