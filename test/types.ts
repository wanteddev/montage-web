import type { Page } from 'puppeteer';

export type Fixture = {
  code: string;
  name: string;
  select: (page: Page) => Promise<void>;
};
