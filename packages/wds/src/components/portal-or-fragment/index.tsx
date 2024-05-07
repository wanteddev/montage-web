import { Fragment } from 'react';

import Portal from '../portal';

import type { PortalOrFragmentProps } from './types';

const PortalOrFragment = ({
  disablePortal,
  children,
  ...props
}: PortalOrFragmentProps) => {
  return disablePortal ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Portal {...props}>{children}</Portal>
  );
};

export default PortalOrFragment;
