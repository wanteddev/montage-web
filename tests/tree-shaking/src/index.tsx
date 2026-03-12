import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, ThemeProvider } from '@montage-ui/core';
import { IconBlank } from '@montage-ui/icon';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Button leadingContent={<IconBlank />}>Button</Button>
    </ThemeProvider>
  </StrictMode>,
);
