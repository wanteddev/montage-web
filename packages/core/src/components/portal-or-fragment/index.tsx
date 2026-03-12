import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { Portal } from '../portal';

import type { ForwardedRef } from 'react';
import type { PortalOrFragmentProps } from './types';

const PortalOrFragment = forwardRef<HTMLElement, PortalOrFragmentProps>(
  ({ disablePortal, container, children, ...props }, ref) => {
    return disablePortal ? (
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
    );
  },
);

export { PortalOrFragment };

export type { PortalOrFragmentProps };
