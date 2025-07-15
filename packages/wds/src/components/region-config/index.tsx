import { memo, useEffect, useMemo, useState } from 'react';

import { useRegionStore } from '../../stores/region-store';

import type { RegionConfigProps } from './types';

const RegionConfig = memo((props: RegionConfigProps) => {
  const config = useRegionStore((state) => state.config);
  const setConfig = useRegionStore((state) => state.setConfig);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedProps = useMemo(() => props, [JSON.stringify(props)]);
  const [prevConfig] = useState(config);

  useEffect(() => {
    if (Object.values(memoizedProps).length > 0) {
      setConfig(memoizedProps);

      return () => setConfig(prevConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedProps, setConfig]);

  return null;
});

RegionConfig.displayName = 'RegionConfig';

export { RegionConfig };

export type { RegionConfigProps };
