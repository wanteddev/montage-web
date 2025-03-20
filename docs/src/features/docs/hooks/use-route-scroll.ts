import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import type { SlugParams } from '../components/lnb/types';

const useRouteScroll = (cb: () => void) => {
  const params = useParams<SlugParams>();
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
  }, [params.slug.toString()]);

  return {
    handleRouteChange,
  };
};

export default useRouteScroll;
