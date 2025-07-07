import type { ReactNode } from 'react';

export type AnimationPresenceProps = {
  present?: boolean;
  children?: ReactNode;
  options?: GetAnimationsOptions;
};
