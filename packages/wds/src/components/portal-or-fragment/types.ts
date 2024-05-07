import type { Merge } from '@wanteddev/wds-engine';
import type Portal from '../portal';
import type { ComponentPropsWithoutRef } from 'react';

export type PortalOrFragmentProps = Merge<
  ComponentPropsWithoutRef<typeof Portal>,
  {
    disablePortal?: boolean;
  }
>;
