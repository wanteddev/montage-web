import { useEffect, useState } from 'react';

import { useRegionStore } from '@/stores/region-store';

import type { RegionConfigProps } from './types';

const RegionConfig = (props: RegionConfigProps) => {
  const { config, setConfig } = useRegionStore((state) => ({
    config: state.config,
    setConfig: state.setConfig,
  }));
  const [prevConfig] = useState(config);

  useEffect(() => {
    if (Object.values(props).length > 0) {
      setConfig(props);

      return () => setConfig(prevConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, setConfig]);

  return null;
};

export default RegionConfig;
