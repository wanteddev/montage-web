import { useRegionStore } from '../stores/region-store';

import type { RegionSnackbarItem } from '../stores/region-store';

const useSnackbar = () => {
  const storeShow = useRegionStore((state) => state.show);

  const show = (item: Omit<RegionSnackbarItem, 'id' | 'type'>) =>
    storeShow({
      type: 'snackbar',
      showCloseIcon: true,
      ...item,
    });

  return show;
};

export default useSnackbar;
