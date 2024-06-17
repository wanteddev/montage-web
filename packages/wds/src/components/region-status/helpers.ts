import type { RegionItem, RegionSnackbarItem } from '../../stores/region-store';

export const isSnackbar = (item: RegionItem): item is RegionSnackbarItem =>
  item.type === 'snackbar';
