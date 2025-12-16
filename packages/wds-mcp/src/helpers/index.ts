import * as icons from '@wanteddev/wds-icon';
import { theme } from '@wanteddev/wds-theme';
import { load } from 'cheerio';

import api from '../../../../docs/generated/api.json' assert { type: 'json' };

export const listComponents = () => {
  const components = api.map((component) => component.name).sort();

  const parsedComponents: Array<{
    name: string;
    subComponents: Array<string>;
  }> = [];

  for (const name of components) {
    if (['ListCell', 'FormField'].includes(name)) {
      parsedComponents.push({
        name,
        subComponents: [],
      });
      continue;
    }

    const parentComponentIdx = parsedComponents.findIndex(
      (component) =>
        name.startsWith(component.name) ||
        ([
          'FormControl',
          'FormLabel',
          'FormMessage',
          'FormErrorMessage',
        ].includes(name) &&
          component.name === 'FormField'),
    );

    if (parentComponentIdx === -1) {
      parsedComponents.push({
        name,
        subComponents: [],
      });
      continue;
    }

    const parentComponent = parsedComponents[parentComponentIdx]!;

    if (
      parentComponent.subComponents.includes(name) ||
      parentComponent.name === name
    ) {
      continue;
    }

    parentComponent.subComponents.push(name);
  }

  return parsedComponents;
};

export const listIcons = () => {
  const iconList = Object.keys(icons).sort();

  return iconList;
};

export const listTokens = () => {
  return Object.entries(theme.light).map((token) => {
    return `<token name="${token[0]}" value="${JSON.stringify(token[1])}" />`;
  });
};

export const getGuideUrls = async () => {
  const sitemap = await fetch('https://montage.wanted.co.kr/sitemap.xml');
  const sitemapXml = await sitemap.text();

  const $sitemap = load(sitemapXml);
  const urls = $sitemap('urlset url loc')
    .map((i, el) => $sitemap(el).text())
    .get();

  return urls.filter((url) => {
    if (url.includes('/docs/components') && url.endsWith('/web')) {
      return true;
    }

    if (url.includes('/docs/utilities/web-')) {
      return true;
    }

    return false;
  });
};
