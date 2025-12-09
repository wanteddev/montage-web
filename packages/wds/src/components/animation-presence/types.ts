import type { Merge } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type AnimationOptions = Merge<
  GetAnimationsOptions,
  {
    filter?: (node: HTMLElement) => boolean;
  }
>;

export type AnimationPresenceProps = {
  present?: boolean;
  children?: ReactNode;
  options?: AnimationOptions;
};
