import { useAlertStore } from '../stores/alert-store';

import type { AlertItem, AlertReturnType } from '../stores/alert-store';

const useAlert = () => {
  const storeShow = useAlertStore((state) => state.show);

  const show = (item: Omit<AlertItem, 'id' | 'resolve'>) =>
    new Promise<AlertReturnType>((resolve) => {
      storeShow({ resolve, ...item });
    });

  return show;
};

export default useAlert;
