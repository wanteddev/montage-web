import { useRegionStore } from '../stores/region-store';

import type { RegionToastItem } from '../stores/region-store';

const useToast = () => {
  const storeAdd = useRegionStore((state) => state.add);

  const add = (item: Omit<RegionToastItem, 'type'>) =>
    storeAdd({
      type: 'toast',
      ...item,
    });

  return add;
};

export default useToast;
