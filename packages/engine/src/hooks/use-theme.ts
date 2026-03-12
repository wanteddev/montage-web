import { useContext } from 'react';

import ThemeContext from '../context';

import type { Theme } from '@montage-ui/theme';

const useTheme = (): Theme => useContext(ThemeContext);

export default useTheme;
