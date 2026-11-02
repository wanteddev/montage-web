import { Portal as RadixPortal } from '@radix-ui/react-portal';
import { forwardRef } from 'react';

import type { PortalProps } from './types';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';

const Portal = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PortalProps, 'div'>
>(
  (
    {
      // oxlint-disable-next-line @typescript-eslint/no-unnecessary-condition
      container = globalThis?.document?.body,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixPortal container={container} ref={ref} asChild {...props}>
        {children}
      </RadixPortal>
    );
  },
);

Portal.displayName = 'Portal';

export { Portal };

export type { PortalProps };
