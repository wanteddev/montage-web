import { interpolationTheme } from '../utils';

import useTheme from './use-theme';

import type { SxProp } from '../types';

const useSxProps = () => {
  const theme = useTheme();

  const mergeSxProps = (sx: SxProp) => {
    return interpolationTheme(sx, theme);
  };

  return mergeSxProps;
};

export default useSxProps;
