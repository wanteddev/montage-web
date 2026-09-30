import type { FormFieldSlotSizeTable } from './hooks';

export const FORM_CONTROL_GROUP_NAME = 'FormControlGroup';
export const FORM_CONTROL_NAME = 'FormControl';
export const FORM_CONTROL_LABEL_NAME = 'FormControlLabel';
export const FORM_CONTROL_FIELD_NAME = 'FormControlField';
export const FORM_CONTROL_MESSAGE_NAME = 'FormControlMessage';
export const FORM_CONTROL_NEGATIVE_MESSAGE_NAME = 'FormControlNegativeMessage';
export const FORM_CONTROL_POSITIVE_MESSAGE_NAME = 'FormControlPositiveMessage';
export const FORM_CONTROL_MESSAGE_ACCESSORY_NAME =
  'FormControlMessageAccessory';

/** IconButton size inside a form field (TextField, TextArea, Select, ...), per field size. */
export const FORM_FIELD_ICON_BUTTON_SIZE = {
  large: 'large',
  medium: 'medium',
} as const;

/** Slot defaults of a form field's `icon-button` content. */
export const FORM_FIELD_ICON_BUTTON_SLOT_SIZE: FormFieldSlotSizeTable = {
  IconButton: {
    normal: {
      size: FORM_FIELD_ICON_BUTTON_SIZE,
      interactionOverflow: true,
      color: 'semantic.foreground.neutral.tertiary',
    },
  },
};
