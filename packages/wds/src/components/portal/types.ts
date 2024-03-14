import type { PropsWithChildren } from 'react';

export type PortalProps = PropsWithChildren<{
  container?: Element | DocumentFragment | null;
}>;
