import { FORM_FIELD_ICON_BUTTON_SLOT_SIZE } from '../form-control/constants';

import type { FormFieldSlotSizeTable } from '../form-control/hooks';
import type { TextFieldContentProps } from './types';

/** Per content variant, the size of the components placed in it by text field size. */
export const TEXT_FIELD_SLOT_SIZE: Partial<
  Record<NonNullable<TextFieldContentProps['variant']>, FormFieldSlotSizeTable>
> = {
  badge: { ContentBadge: { size: { large: 'small', medium: 'xsmall' } } },
  'icon-button': FORM_FIELD_ICON_BUTTON_SLOT_SIZE,
};
