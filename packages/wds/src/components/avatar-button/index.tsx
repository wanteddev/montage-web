import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { avatarButtonStyle, pushBadgeStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { AvatarButtonProps } from './types';
import type { ElementType, ForwardedRef } from 'react';

const AvatarButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      children,
      pushBadge,
      disableInteraction = false,
      disabled,
      ...props
    }: PolymorphicProps<AvatarButtonProps, E>,
    ref: ForwardedRef<E>,
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

        {pushBadge && (
          <Box sx={pushBadgeStyle} data-role="avatar-button-push-badge">
            {pushBadge}
          </Box>
        )}
      </Box>
    );
  },
) as PolymorphicComponent<AvatarButtonProps, 'button'>;

AvatarButton.displayName = 'AvatarButton';

export default AvatarButton;
