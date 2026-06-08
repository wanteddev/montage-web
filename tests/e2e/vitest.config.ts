import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Interaction (e2e) tests for overlay dismissal behavior. Unlike `tests/visual`,
// this package must NOT globally disable pointer-events — the whole point is to
// click real dimmers and verify the radix layer stack (`disableOutsidePointerEvents`)
// dismisses only the topmost layer, one at a time.
export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./src/setup-tests.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          headless: true,
        },
      }),
      instances: [
        {
          browser: 'chromium',
          viewport: {
            width: 1280,
            height: 720,
          },
        },
      ],
    },
  },
});
