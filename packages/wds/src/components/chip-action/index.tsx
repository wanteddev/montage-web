'use client';
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { actionStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ChipActionProps } from './types';

const ChipAction = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant = 'filled',
      disabled = false,
      disableInteraction = false,
      leftContent,
      rightContent,
      size = 'normal',
      active: givenActive,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ChipActionProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const id = useId();

    const active = givenActive ?? props['aria-pressed'];

    return (
      <WithInteraction
        color={
          active && variant === 'outlined'
            ? 'palette.primary.normal'
            : 'palette.label.normal'
        }
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as E}
          aria-labelledby={id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          aria-pressed={active}
          tabIndex={0}
          {...props}
          sx={[actionStyle({ variant, size, xs, sm, md, lg, xl }), props.sx]}
        >
          {Boolean(leftContent) && leftContent}
          <span id={id}>{children}</span>
          {Boolean(rightContent) && rightContent}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ChipActionProps, 'button'>;

ChipAction.displayName = 'ChipAction';

export default ChipAction;
