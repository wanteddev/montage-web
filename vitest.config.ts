import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['.vitest/setup-tests.ts'],
    environment: 'jsdom',
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
    exclude: ['tests/**', '**/node_modules/**'],
    globals: true,
    testTimeout: 10000,
    dangerouslyIgnoreUnhandledErrors: true,
  },
});
