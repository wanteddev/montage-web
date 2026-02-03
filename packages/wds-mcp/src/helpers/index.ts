import * as icons from '@wanteddev/wds-icon';
import { theme } from '@wanteddev/wds-theme';
import { load } from 'cheerio';
import { camelCase, kebabCase } from 'change-case';

import api from '../../../../docs/generated/api.json';
import readme from '../../../wds/README.md';
import { DOCS_BASE_URL } from '../constants';

const componentApi = api;

export const getGuideUrls = async () => {
  const sitemap = await fetch(`${DOCS_BASE_URL}/sitemap.xml`);
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

export const listComponents = () => {
  const components = componentApi.map((component) => component.name).sort();

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

export const listUtilityFunctions = async () => {
  const guideUrls = await getGuideUrls();

  const utilityUrls = guideUrls.filter(
    (url) =>
      url.includes('/web-utilities/') &&
      !url.endsWith('/navigation') &&
      !url.endsWith('/media'),
  );

  return [
    ...utilityUrls.map((value) => {
      const pathname = new URL(value).pathname;
      const slug = pathname.split('/').pop() ?? '';
      return camelCase(slug.replace(/^web-utilities-/, ''));
    }),
    'respondTo',
    'respondDown',
    'respondMore',
    'respondUp',
    'useMediaQuery',
  ];
};

export const getComponentUrl = async (componentName: string) => {
  const componentSlug = kebabCase(componentName);
  const componentPathMap: Record<string, string> = {
    list: 'list-cell',
    stepper: 'progress-tracker',
    'card-list': 'card',
    modal: 'popup',
  };
  const customComponentPath = componentPathMap[componentSlug];

  const guideUrls = await getGuideUrls();

  return (
    guideUrls.find((url) =>
      customComponentPath
        ? url.endsWith(`${customComponentPath}/web`)
        : url.endsWith(`${componentSlug}/web`),
    ) ??
    guideUrls.find((url) =>
      customComponentPath
        ? url.endsWith(`${customComponentPath}`)
        : url.endsWith(`${componentSlug}`),
    )
  );
};

export const getUtilityFunctionUrl = async (functionName: string) => {
  const utilityFunctionPathMap: Record<string, string> = {
    respondTo: 'media',
    respondDown: 'media',
    respondMore: 'media',
    respondUp: 'media',
    useMediaQuery: 'media',
  };
  const customUtilityFunctionPath = utilityFunctionPathMap[functionName];

  const guideUrls = await getGuideUrls();

  return guideUrls.find((url) =>
    url.endsWith(kebabCase(customUtilityFunctionPath ?? functionName)),
  );
};

export const getGettingStarted = () => {
  return readme;
};
