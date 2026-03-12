import type { Merge } from '@montage-ui/engine';
import type { PortalProps } from '../portal/types';

export type PortalOrFragmentProps = Merge<
  PortalProps,
  {
    disablePortal?: boolean;
  }
>;
