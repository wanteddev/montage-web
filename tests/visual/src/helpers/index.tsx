import { ThemeProvider } from '@montage-ui/core';
import { render } from '@testing-library/react';

export const renderWithProvider = (component: React.ReactNode) => {
  return render(component, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });
};
