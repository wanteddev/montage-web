import type { SlotDefaults } from '../../hooks/internal/use-slot-defaults';
import type { FormFieldSlotSizeTable } from '../form-control/hooks';
import type { TextAreaContentProps } from './types';

/** Per content variant, the size of the components placed in it by text area size. */
export const TEXT_AREA_SLOT_SIZE: Partial<
  Record<NonNullable<TextAreaContentProps['variant']>, FormFieldSlotSizeTable>
> = {
  'primary-icon-button': { Button: { large: 'small', medium: 'xsmall' } },
};

/** Per content variant, the defaults of the components placed in it regardless of text area size. */
export const TEXT_AREA_SLOT_DEFAULTS: Partial<
  Record<NonNullable<TextAreaContentProps['variant']>, SlotDefaults>
> = {
  'content-badge': { ContentBadge: { size: 'small' } },
  button: { TextButton: { size: 'small' } },
  'segmented-control': { SegmentedControl: { size: 'small' } },
};
