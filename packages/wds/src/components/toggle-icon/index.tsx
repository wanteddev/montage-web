'use client';
import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';

import WithInteraction from '../with-interaction';

import { toggleIconStyle } from './style';

import type { MergeWithCustomElementProps } from '../../types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { ToggleIconProps } from './types';

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  ToggleIconProps
>;

const ToggleIcon = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      active,
      defaultActive,
      onActiveChange,
      activeColor = 'palette.primary.normal',
      size = '24px',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const [pressed = false, setPressed] = useControllableState({
      prop: active,
      onChange: onActiveChange,
      defaultProp: defaultActive,
    });

    const Component = as || 'button';

    return (
      <WithInteraction
        width="calc(100% + 8px)"
        height="calc(100% + 8px)"
        disabled={props.disabled}
      >
        <Component
          type="button"
          aria-pressed={pressed}
          css={toggleIconStyle({
            size,
            active: pressed,
            activeColor,
            xs,
            sm,
            md,
            lg,
            xl,
          })}
          {...props}
          ref={ref}
          onClick={composeEventHandlers(props.onClick, () => {
            if (!props.disabled) {
              setPressed(!pressed);
            }
          })}
        />
      </WithInteraction>
    );
  },
);

ToggleIcon.displayName = 'ToggleIcon';

export default ToggleIcon as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
