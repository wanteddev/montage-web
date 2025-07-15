import type { Merge } from '@wanteddev/wds-engine';
import type { PortalProps } from '../portal/types';

export type PortalOrFragmentProps = Merge<
  PortalProps,
  {
    disablePortal?: boolean;
  }
>;
