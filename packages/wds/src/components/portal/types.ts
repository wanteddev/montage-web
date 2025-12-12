import type { PropsWithChildren } from 'react';

export type PortalProps = PropsWithChildren<{
  /** Specifies the container to be displayed by Portal. */
  container?: Element | DocumentFragment | null;
}>;
