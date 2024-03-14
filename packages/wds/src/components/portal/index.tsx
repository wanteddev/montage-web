import { createPortal } from 'react-dom';

import type { PortalProps } from './types';

type Props = PortalProps;

const Portal = ({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  container = globalThis?.document?.body,
  children,
}: Props) => {
  return container ? createPortal(children, container) : null;
};

Portal.displayName = 'Portal';

export default Portal;
