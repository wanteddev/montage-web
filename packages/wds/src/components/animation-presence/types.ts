import type { Merge } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type AnimationOptions = Merge<
  GetAnimationsOptions,
  {
    filter?: (node: HTMLElement) => boolean;
  }
>;

export type AnimationPresenceProps = {
  /** Whether the animation presence is present. */
  present?: boolean;
  children?: ReactNode;
  /** The options for the animation presence. */
  options?: AnimationOptions;
};
