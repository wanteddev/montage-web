import { useRegionStore } from '../stores/region-store';

import type { RegionToastItem } from '../stores/region-store';

const useToast = () => {
  const storeShow = useRegionStore((state) => state.show);

  const show = (item: Omit<RegionToastItem, 'id' | 'type'>) =>
    storeShow({ type: 'toast', ...item });

  return show;
};

export default useToast;
