'use client';
import { forwardRef, useId } from 'react';

import WithInteraction from '../with-interaction';

import { actionStyle } from './style';

import type { MergeWithCustomElementProps, ThemeColorsToken } from '@/types';
import type { ElementRef, ElementType, ForwardedRef, ReactNode } from 'react';
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
      className,
      size = 'medium',
      children,
      xs,
      sm,
      md,
      lg,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const Comp = as || 'button';
    const id = useId();

    const interactionColor: ThemeColorsToken = 'palette.label.normal';

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
      >
        <Comp
          aria-labelledby={id}
          ref={ref}
          className={className}
          css={actionStyle({ variant, size, xs, sm, md, lg })}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
        >
          {Boolean(leftIcon) && leftIcon}
          <span id={id}>{children}</span>
          {Boolean(rightIcon) && rightIcon}
        </Comp>
      </WithInteraction>
    );
  },
);

ChipAction.displayName = 'ChipAction';

export default ChipAction as <E extends ElementType = 'button'>(
  props: Props<E>,
) => ReactNode;
