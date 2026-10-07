import type { SlotDefaults } from '../../hooks/internal/use-slot-defaults';

/** Defaults of the components placed in the heading / trailing content. */
export const SECTION_HEADER_SLOT_DEFAULTS: SlotDefaults = {
  IconButton: {
    normal: {
      size: 'xlarge',
      interactionOverflow: true,
      color: 'semantic.foreground.neutral.quaternary',
    },
  },
};
