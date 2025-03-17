import { useRegionStore } from '../stores/region-store';

import type { RegionSnackbarItem } from '../stores/region-store';

const useSnackbar = () => {
  const storeAdd = useRegionStore((state) => state.add);

  const add = (item: Omit<RegionSnackbarItem, 'type'>) =>
    storeAdd({
      type: 'snackbar',
      ...item,
      duration: item.duration ?? 5000,
    });

  return add;
};

export default useSnackbar;
