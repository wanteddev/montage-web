import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';

import { avatarButtonStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { AvatarButtonProps } from './types';
import type { ElementType, ForwardedRef } from 'react';

const AvatarButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      children,
      disableInteraction = false,
      disabled,
      ...props
    }: PolymorphicPropsInternal<AvatarButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={(as || 'button') as ElementType}
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
        sx={[avatarButtonStyle, props.sx]}
      >
        <WithInteraction
          width="calc(100% + 16px)"
          height="calc(100% + 16px)"
          disabled={disabled || disableInteraction}
        >
          {children}
        </WithInteraction>
      </Box>
    );
  },
) as PolymorphicComponentInternal<AvatarButtonProps, 'button'>;

AvatarButton.displayName = 'AvatarButton';

export { AvatarButton };

export type { AvatarButtonProps };
