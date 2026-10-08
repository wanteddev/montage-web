import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { Portal } from '../portal';
import { SlotDefaultsBoundary } from '../../hooks/internal/use-slot-defaults';

import type { ForwardedRef } from 'react';
import type { PortalOrFragmentProps } from './types';

const PortalOrFragment = forwardRef<HTMLElement, PortalOrFragmentProps>(
  ({ disablePortal, container, children, ...props }, ref) => {
    // An overlay is its own surface: slot defaults of wherever it was opened
    // from must not leak into it (see `SlotDefaultsBoundary`). The boundary
    // wraps the Slot/Portal instead of the children so `asChild` still merges
    // props into the overlay element itself.
    return (
      <SlotDefaultsBoundary>
        {disablePortal ? (
          <Slot {...props} ref={ref}>
            {children}
          </Slot>
        ) : (
          <Portal
            {...props}
            container={container}
            ref={ref as ForwardedRef<HTMLDivElement>}
          >
            {children}
          </Portal>
        )}
      </SlotDefaultsBoundary>
    );
  },
);

export { PortalOrFragment };

export type { PortalOrFragmentProps };
