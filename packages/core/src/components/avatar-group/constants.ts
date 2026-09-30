import type { SlotDefaults } from '../../hooks/internal/use-slot-defaults';
import type { AvatarGroupContentProps } from './types';

/** Per content variant, the defaults of the components placed in it. */
export const AVATAR_GROUP_CONTENT_SLOT_DEFAULTS: Partial<
  Record<NonNullable<AvatarGroupContentProps['variant']>, SlotDefaults>
> = {
  'text-button': { TextButton: { size: 'small' } },
};
