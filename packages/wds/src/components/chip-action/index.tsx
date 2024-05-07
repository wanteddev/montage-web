'use client';
import { forwardRef, useId } from 'react';
import {
  Box,
  type MergeWithCustomElementProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { actionStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { ChipActionProps } from './types';

type Props<E extends ElementType> = MergeWithCustomElementProps<
  E,
  ChipActionProps
>;

const ChipAction = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant = 'filled',
      disabled = false,
      disableInteraction = false,
      leftIcon,
      rightIcon,
      size = 'medium',
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
    const id = useId();

    const interactionColor: ThemeColorsToken = 'palette.label.normal';

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as ElementType}
          aria-labelledby={id}
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
          sx={[actionStyle({ variant, size, xs, sm, md, lg, xl }), props.sx]}
        >
          {Boolean(leftIcon) && leftIcon}
          <span id={id}>{children}</span>
          {Boolean(rightIcon) && rightIcon}
        </Box>
      </WithInteraction>
    );
  },
);

ChipAction.displayName = 'ChipAction';

export default ChipAction as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
