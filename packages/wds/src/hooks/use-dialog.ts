import { useDialogStore } from '../stores/dialog-store';

import type { DialogItem, DialogReturnType } from '../stores/dialog-store';

const useDialog = () => {
  const storeShow = useDialogStore((state) => state.show);

  const show = (item: Omit<DialogItem, 'id' | 'resolve'>) =>
    new Promise<DialogReturnType>((resolve) => {
      storeShow({ resolve, ...item });
    });

  return show;
};

export default useDialog;
