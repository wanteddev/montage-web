/**
 * @type {import('jest-environment-puppeteer').JestPuppeteerConfig}
 */
module.exports = {
  launch: {
    headless: true,
    defaultViewport: {
      width: 400,
      height: 900,
    },
  },
  server: {
    command: `pnpm -F docs run dev-test`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
};
