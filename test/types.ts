import type { JestPuppeteerGlobal } from 'jest-environment-puppeteer';

export type Fixture = {
  code: string;
  name: string;
  select: (page: JestPuppeteerGlobal['page']) => Promise<void>;
};
