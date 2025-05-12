import { useRegionStore } from '../stores/region-store';

import type {
  RegionSnackbarItem,
  UseRegionStoreAddDuration,
  WithUseRegionStoreAddDuration,
} from '../stores/region-store';

const useSnackbar = () => {
  const storeAdd = useRegionStore((state) => state.add);

  const add = (
    item: WithUseRegionStoreAddDuration<
      Omit<RegionSnackbarItem, 'type' | 'duration'>
    >,
  ) => {
    const getDuration = (duration?: UseRegionStoreAddDuration): number => {
      if (typeof duration === 'number') {
        return duration;
      }

      switch (duration) {
        case 'short':
          return 4000;
        case 'long':
          return 16000;
        default:
          return getDuration('short');
      }
    };

    storeAdd({
      type: 'snackbar',
      ...item,
      duration: getDuration(item.duration),
    });
  };

  return add;
};

export default useSnackbar;
