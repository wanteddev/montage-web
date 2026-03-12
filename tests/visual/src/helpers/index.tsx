import { render } from '@testing-library/react';
import { ThemeProvider } from '@montage-ui/core';

export const renderWithProvider = (component: React.ReactNode) => {
  return render(component, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });
};
