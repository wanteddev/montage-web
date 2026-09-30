import type { FormFieldSlotSizeTable } from '../form-control/hooks';
import type { TextAreaContentProps } from './types';

/** Per content variant, the size of the components placed in it by text area size. */
export const TEXT_AREA_SLOT_SIZE: Partial<
  Record<NonNullable<TextAreaContentProps['variant']>, FormFieldSlotSizeTable>
> = {
  'primary-icon-button': { Button: { large: 'small', medium: 'xsmall' } },
};
