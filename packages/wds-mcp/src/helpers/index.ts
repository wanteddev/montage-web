import { darkOriginTheme, lightOriginTheme, theme } from '@wanteddev/wds-theme';
import { load } from 'cheerio';
import { camelCase, kebabCase } from 'change-case';
import semver from 'semver';

import componentApi from '../../../../docs/generated/api.json';
import icons from '../../../../docs/generated/icons.json';
import readme from '../../../wds/README.md';
import { DOCS_BASE_URL } from '../constants';

const iconNames = icons.map(({ name }) => name);

export const getDocsBaseUrl = (version: string) => {
  const parsedVersion = semver.parse(version);

  if (!parsedVersion) {
    return DOCS_BASE_URL;
  }

  if (parsedVersion.compare('3.2.0') < 0) {
    return `${DOCS_BASE_URL}/3.2.x`;
  }

  return `${DOCS_BASE_URL}/${parsedVersion.major}.${parsedVersion.minor}.x`;
};

export const getGuideUrls = async (version: string) => {
  const sitemap = await fetch(`${getDocsBaseUrl(version)}/sitemap.xml`);
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
  function getComponentDir(filePath: string | undefined): string | undefined {
    if (!filePath) return undefined;
    return filePath.split('/components/')[1]?.split('/')[0];
  }

  const groups = new Map<string, Array<string>>();

  for (const component of componentApi) {
    const dir = getComponentDir(component.filePath);

    if (!dir) {
      groups.set(component.name, [component.name]);
      continue;
    }

    const existing = groups.get(dir);
    if (existing) {
      existing.push(component.name);
    } else {
      groups.set(dir, [component.name]);
    }
  }

  return Array.from(groups.entries()).map(([dir, names]) => {
    const dirPascalCase = dir
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
    const primaryIdx = names.findIndex((n) => n === dirPascalCase);
    const primary = primaryIdx !== -1 ? names[primaryIdx]! : names[0]!;
    const subComponents = names.filter((n) => n !== primary);

    return { name: primary, subComponents };
  });
};

export const listIcons = () => iconNames;

export const listTokens = () => {
  return Object.entries(theme.light).map(([name, value]) => {
    if (name === 'atomic') {
      return `<token name="${name}" value="${JSON.stringify(value)}" resolvedValue="${JSON.stringify(lightOriginTheme.atomic)}" />`;
    }

    if (name === 'semantic') {
      return `<token name="${name}" value="${JSON.stringify(value)}" lightResolvedValue="${JSON.stringify(lightOriginTheme.semantic)}" darkResolvedValue="${JSON.stringify(darkOriginTheme.semantic)}" />`;
    }

    return `<token name="${name}" value="${JSON.stringify(value)}" />`;
  });
};

export const listUtilityFunctions = async (version: string) => {
  const guideUrls = await getGuideUrls(version);

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

export const getComponentUrl = async (
  componentName: string,
  version: string,
) => {
  const componentSlug = kebabCase(componentName);
  const componentPathMap: Record<string, string> = {
    'date-range-picker': 'date-picker',
    list: 'list-cell',
    stepper: 'progress-tracker',
    'card-list': 'list-card',
    modal: 'popup',
  };
  const customComponentPath = componentPathMap[componentSlug];

  const guideUrls = await getGuideUrls(version);

  return (
    guideUrls.find((url) =>
      customComponentPath
        ? url.endsWith(`/${customComponentPath}/web`)
        : url.endsWith(`/${componentSlug}/web`),
    ) ??
    guideUrls.find((url) =>
      customComponentPath
        ? url.endsWith(`/${customComponentPath}`)
        : url.endsWith(`/${componentSlug}`),
    )
  );
};

export const getUtilityFunctionUrl = async (
  functionName: string,
  version: string,
) => {
  const utilityFunctionPathMap: Record<string, string> = {
    respondTo: 'media',
    respondDown: 'media',
    respondMore: 'media',
    respondUp: 'media',
    useMediaQuery: 'media',
  };
  const customUtilityFunctionPath = utilityFunctionPathMap[functionName];

  const guideUrls = await getGuideUrls(version);

  return guideUrls.find((url) =>
    url.endsWith(kebabCase(customUtilityFunctionPath ?? functionName)),
  );
};

export const getGettingStarted = () => {
  return readme;
};
