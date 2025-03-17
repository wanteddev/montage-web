import { useRegionStore } from '../stores/region-store';

import type { RegionToastItem } from '../stores/region-store';

const useToast = () => {
  const storeAdd = useRegionStore((state) => state.add);

  const add = (item: Omit<RegionToastItem, 'type'>) =>
    storeAdd({
      type: 'toast',
      ...item,
      duration: item.duration ?? 3000,
    });

  return add;
};

export default useToast;
