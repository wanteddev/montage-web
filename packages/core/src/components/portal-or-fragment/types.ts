import type { PortalProps } from '../portal/types';
import type { Merge } from '@montage-ui/engine';

export type PortalOrFragmentProps = Merge<
  PortalProps,
  {
    disablePortal?: boolean;
  }
>;
