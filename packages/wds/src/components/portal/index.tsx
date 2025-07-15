import { forwardRef } from 'react';
import { Portal as RadixPortal } from '@radix-ui/react-portal';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { PortalProps } from './types';

const Portal = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PortalProps, 'div'>
>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
