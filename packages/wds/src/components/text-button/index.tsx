'use client';
import { forwardRef, useId } from 'react';

import WithInteraction from '../with-interaction';

import { textButtonStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type {
  MergeWithCustomElementProps,
  ThemeColorsToken,
} from '../../types';
import type { TextButtonProps } from './types';

type Props<T extends ElementType = 'button'> = MergeWithCustomElementProps<
  T,
  TextButtonProps
>;

const TextButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      variant = 'primary',
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
    const Comp = as || 'button';
    const id = useId();

    const interactionColor: ThemeColorsToken =
      variant === 'primary' ? 'palette.primary.normal' : 'palette.label.normal';

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
        variant={variant === 'primary' ? 'strong' : 'light'}
        scale
      >
        <Comp
          wds-component="text-button"
          aria-labelledby={id}
          ref={ref}
          css={textButtonStyle({
            size,
            variant,
            xs,
            sm,
            md,
            lg,
            xl,
          })}
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

TextButton.displayName = 'TextButton';

export default TextButton as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
