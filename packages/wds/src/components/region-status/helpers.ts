import type { CSSProperties } from 'react';
import type {
  RegionItem,
  RegionItemWithSystem,
  RegionSnackbarItem,
} from '../../stores/region-store';

export const isSnackbar = (item: RegionItem): item is RegionSnackbarItem =>
  item.type === 'snackbar';

export const isNotPointerDevice = () =>
  window.matchMedia('(pointer: coarse)').matches;

export const makeTransitionStyle = ({
  status,
  height,
}: Pick<RegionItemWithSystem, 'status' | 'height'>): CSSProperties => {
  if (status === 'visible' && Boolean(height)) {
    return {
      height,
      marginTop: '10px',
      width: 'initial',
      position: 'relative',
      transition: 'all 0.2s ease',
      opacity: 1,
    };
  } else {
    return {
      height: 0,
      margin: 0,
      width: 'initial',
      position: 'relative',
      transition: 'all 0.2s ease',
      opacity: 0,
    };
  }
};
