import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type AvatarButtonProps = WithSxProps<{
  disabled?: boolean;
  disableInteraction?: boolean;
  children?: ReactNode;
}>;
