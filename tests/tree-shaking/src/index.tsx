import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, ThemeProvider } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Button leadingContent={<IconBlank />}>Button</Button>
    </ThemeProvider>
  </StrictMode>,
);
