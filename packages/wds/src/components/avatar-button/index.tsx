'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import PushBadge from '../push-badge';

import { avatarButtonStyle, pushBadgeStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { AvatarButtonProps } from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

const AvatarButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      children,
      pushBadge = false,
      disableInteraction = false,
      ...props
    }: PolymorphicProps<AvatarButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Box
        as={(as || 'button') as ElementType}
        ref={ref}
        type="button"
        {...props}
        sx={[avatarButtonStyle, props.sx]}
      >
        <WithInteraction
          width="calc(100% + 16px)"
          height="calc(100% + 16px)"
          disabled={props.disabled || disableInteraction}
        >
          {children}
        </WithInteraction>

        {pushBadge && <PushBadge sx={pushBadgeStyle} variant="dot" />}
      </Box>
    );
  },
) as PolymorphicComponent<AvatarButtonProps, 'button'>;

AvatarButton.displayName = 'AvatarButton';

export default AvatarButton;
