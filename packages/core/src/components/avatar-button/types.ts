import type { WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';

export type AvatarButtonProps = WithSxProps<{
  /** Whether the avatar button is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** The content of the avatar button. Use `Avatar` component as the children. */
  children?: ReactNode;
}>;
