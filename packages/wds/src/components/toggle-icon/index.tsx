import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';

import { toggleIconStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ToggleIconProps } from './types';

const ToggleIcon = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      active,
      defaultActive,
      onActiveChange,
      activeColor = 'semantic.primary.normal',
      size = '24px',
      disabled,
      disableInteraction,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<ToggleIconProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const [pressed, setPressed] = useControllableState({
      prop: active,
      onChange: onActiveChange,
      defaultProp: defaultActive ?? false,
    });

    return (
      <WithInteraction
        width="calc(100% + 8px)"
        height="calc(100% + 8px)"
        disabled={disableInteraction || disabled}
        scale
      >
        <Box
          as={as || 'button'}
          type="button"
          role="button"
          aria-pressed={pressed}
          aria-disabled={disabled}
          disabled={disabled}
          {...props}
          sx={[
            toggleIconStyle({
              size,
              active: pressed,
              activeColor,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
          ref={ref}
          onClick={composeEventHandlers(props.onClick, () => {
            if (!disabled) {
              setPressed(!pressed);
            }
          })}
        />
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<ToggleIconProps, 'button'>;

ToggleIcon.displayName = 'ToggleIcon';

export { ToggleIcon };

export type { ToggleIconProps };
