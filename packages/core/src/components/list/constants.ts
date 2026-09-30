import type { SlotDefaults } from '../../hooks/internal/use-slot-defaults';
import type {
  ListCellContentProps,
  ListCellExtraContentProps,
  ListCellLabelTrailingProps,
} from './types';

export const LIST_NAME = 'List';

export const LIST_CELL_NAME = 'ListCell';
export const LIST_CELL_CONTENT_NAME = 'ListCellContent';

export const LIST_CELL_LABEL_TRAILING_NAME = 'ListCellLabelTrailing';
export const LIST_CELL_EXTRA_CONTENT_NAME = 'ListCellExtraContent';

export const LIST_TEXT_NAME = 'ListText';
export const LIST_CELL_SELECTED_ICON_NAME = 'ListCellSelectedIcon';

/** Per content variant, the defaults of the components placed in it. */
export const LIST_CELL_CONTENT_SLOT_DEFAULTS: Partial<
  Record<NonNullable<ListCellContentProps['variant']>, SlotDefaults>
> = {
  'text-button': { TextButton: { size: 'small' } },
  button: { Button: { size: 'small' } },
  avatar: { Avatar: { size: 'medium' } },
  'content-badge': { ContentBadge: { size: 'small' } },
  'icon-button': {
    IconButton: {
      normal: {
        size: 'large',
        interactionOverflow: true,
        color: 'semantic.foreground.neutral.tertiary',
      },
    },
  },
};

/** Per label trailing variant, the defaults of the components placed in it. */
export const LIST_CELL_LABEL_TRAILING_SLOT_DEFAULTS: Partial<
  Record<NonNullable<ListCellLabelTrailingProps['variant']>, SlotDefaults>
> = {
  'content-badge': { ContentBadge: { size: 'small' } },
};

/** Per extra content variant, the defaults of the components placed in it. */
export const LIST_CELL_EXTRA_CONTENT_SLOT_DEFAULTS: Partial<
  Record<NonNullable<ListCellExtraContentProps['variant']>, SlotDefaults>
> = {
  'content-badge': { ContentBadge: { size: 'small' } },
};
