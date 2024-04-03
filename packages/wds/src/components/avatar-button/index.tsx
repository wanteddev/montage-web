'use client';
import { forwardRef } from 'react';

import WithInteraction from '../with-interaction';
import PushBadge from '../push-badge';

import { avatarButtonStyle, pushBadgeStyle } from './style';

import type { MergeWithCustomElementProps } from '../../types';
import type { AvatarButtonProps } from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  AvatarButtonProps
>;

const AvatarButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      children,
      pushBadge = false,
      disableInteraction = false,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const Component = as || 'button';

    return (
      <Component ref={ref} css={avatarButtonStyle} {...props}>
        <WithInteraction
          width="calc(100% + 8px)"
          height="calc(100% + 8px)"
          disabled={props.disabled || disableInteraction}
        >
          {children}
        </WithInteraction>

        {pushBadge && <PushBadge css={pushBadgeStyle} variant="dot" />}
      </Component>
    );
  },
);

AvatarButton.displayName = 'AvatarButton';

export default AvatarButton as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
