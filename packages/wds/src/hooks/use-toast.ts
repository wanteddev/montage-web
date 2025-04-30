import { useRegionStore } from '../stores/region-store';

import type {
  RegionToastItem,
  UseRegionStoreAddDuration,
  WithUseRegionStoreAddDuration,
} from '../stores/region-store';

const useToast = () => {
  const storeAdd = useRegionStore((state) => state.add);

  const add = (
    item: WithUseRegionStoreAddDuration<
      Omit<RegionToastItem, 'type' | 'duration'>
    >,
  ) => {
    const getDuration = (duration?: UseRegionStoreAddDuration): number => {
      if (typeof duration === 'number') {
        return duration;
      }

      switch (duration) {
        case 'short':
          return 3000;
        case 'long':
          return 5000;
        default:
          return getDuration('short');
      }
    };

    storeAdd({
      type: 'toast',
      ...item,
      duration: getDuration(item.duration),
    });
  };

  return add;
};

export default useToast;
