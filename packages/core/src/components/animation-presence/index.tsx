import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { useAnimationPresence } from './hooks';

import type { AnimationPresenceProps } from './types';
import type { Ref } from 'react';

const AnimationPresence = forwardRef<HTMLElement, AnimationPresenceProps>(
  ({ present = false, children, options }, forwardedRef) => {
    const { isPresent, ref } = useAnimationPresence(present, options);
    const composedRef = useComposedRefs(forwardedRef, ref as Ref<HTMLElement>);

    return isPresent ? <Slot ref={composedRef}>{children}</Slot> : null;
  },
);

AnimationPresence.displayName = 'AnimationPresence';

export { AnimationPresence, useAnimationPresence };

export type { AnimationPresenceProps };
