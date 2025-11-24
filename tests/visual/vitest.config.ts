import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: 'test',
    }),
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
    exclude: ['chromium-bidi', 'fsevents'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        process: JSON.stringify({
          env: {
            NODE_ENV: 'test',
          },
        }),
      },
    },
  },
  test: {
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
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.1,
            allowedMismatchedPixels: 0,
          },
          screenshotOptions: {
            scale: 'css',
          },
          resolveScreenshotPath: ({ arg, browserName, ext }) =>
            `./__screenshots__/${arg}-${browserName}${ext}`,
        },
      },
    },
  },
});
