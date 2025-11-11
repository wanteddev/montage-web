import { useCallback } from 'react';

import { useRouteContext } from '@/contexts';

const useRouteScroll = (cb: () => void) => {
  const { addListenerOnce } = useRouteContext();

  const handleRouteChange = useCallback(() => {
    addListenerOnce(() => {
      cb();
    });
  }, [addListenerOnce, cb]);

  return {
    handleRouteChange,
  };
};

export default useRouteScroll;
