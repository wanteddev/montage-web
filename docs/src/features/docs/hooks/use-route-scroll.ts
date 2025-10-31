import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const useRouteScroll = (cb: () => void) => {
  const pathname = usePathname();
  const isTriggered = useRef(false);

  const handleRouteChange = useCallback(() => {
    isTriggered.current = true;
  }, []);

  useEffect(() => {
    if (isTriggered.current) {
      isTriggered.current = false;
      cb();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return {
    handleRouteChange,
  };
};

export default useRouteScroll;
