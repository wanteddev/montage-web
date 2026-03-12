import { createContext } from 'react';
import { type Theme, theme } from '@montage-ui/theme';

const ThemeContext = createContext<Theme>(theme.light);

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext';
}

export default ThemeContext;
