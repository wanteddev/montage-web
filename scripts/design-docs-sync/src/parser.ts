import fs from 'node:fs';
import path from 'node:path';

import {
  cleanString,
  getCharacters,
  getComponentConfig,
  getComponentDirectory,
  getDescriptionOfFigure,
  getImageNames,
  getImageRatio,
  toKebabCase,
} from './helpers';
import { getPages } from './api';

import type { FigmaNode, Page } from './types';
import type { InstanceNode, TextNode } from '@figma/rest-api-spec';

export const parsePagesOfFile = async (fileKey: string) => {
  const response = await getPages(fileKey);

  const { document } = response;

  let currentGroup: string | null = null;

  const pages: Array<Page> = [];

  document.children
    .filter(({ name }) => !/GNB\(WEB\)|FOOTER\(WEB\)/i.test(name))
    .forEach(({ id, name }) => {
      if (name.startsWith('┗ ❖ ')) {
        pages.push({
          id,
          name: toKebabCase(cleanString(name)),
          group: toKebabCase(cleanString(currentGroup ?? '')),
        });
      } else {
        currentGroup = name;
      }
    });

  return pages;
};

export const parseComponentFrontmatter = (
  node: FigmaNode,
  pageName: string,
  group: string,
) => {
  const firstChild = node.children.at(0);

  const sectionTitle = firstChild!.children.find(
    ({ name }) => name === 'Section/Title',
  );

  const sectionHeader = sectionTitle!.children
    // Section/Thumbnail
    .at(0)!
    // Container
    .children.at(0)!
    // Section/Header
    .children.at(0)!;

  const [titleComponent, descriptionComponent] = sectionHeader.children as [
    InstanceNode,
    InstanceNode,
  ];

  const title = Object.entries(titleComponent.componentProperties!)
    .find(([key]) => key.includes('Text'))![1]
    .value.toString();

  const description = Object.entries(descriptionComponent.componentProperties!)
    .find(([key]) => key.includes('Text'))![1]
    .value.toString();

  let createdAt = new Date().toISOString().split('T')[0];
  const updatedAt = new Date().toISOString().split('T')[0];

  if (
    fs.existsSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
    )
  ) {
    const designFile = fs.readFileSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
      'utf8',
    );
    createdAt =
      designFile.match(/createdAt: (\d{4}-\d{2}-\d{2})/)?.[1] ?? createdAt;
  }

  return `---
title: ${title}
description: ${description.replace(/\n/g, '\\n')}
image: /components/${group}/${pageName}/design/Image.png
ogImage: /components/${group}/${pageName}/design/Thumbnails.png
createdAt: ${createdAt}
updatedAt: ${updatedAt}
---`;
};

export const parseComponentSections = async (
  node: FigmaNode,
  pageName: string,
  group: string,
) => {
  // Container -> Content
  const contents = node.children[1].children[0];

  let data = '';

  let hasAccessibility = false;

  for (const content of contents.children.filter(
    ({ visible }) => visible !== false,
  )) {
    const name = content.name.toLowerCase().trim();

    try {
      switch (name) {
        case 'section/anatomy':
          data += parseSectionAnatomy(content, pageName, group);
          break;
        case 'section/variants':
          data += await parseSectionVariants(pageName, group);
          break;
        case 'section/layout':
          data += parseSectionLayout(content, pageName, group);
          break;
        case 'section/states':
          data += parseSectionStates(content, pageName, group);
          break;
        case 'section/hierarchy':
        case 'section/hierachy':
          data += await parseSectionHierarchy(content, pageName, group);
          break;
        case 'section/how to use':
          data += parseSectionHowToUse(content, pageName, group);
          break;
        case 'section/customize':
          data += parseSectionCustomize(content);
          break;
        case 'section/accessibility':
          // 중복 처리 방지
          if (hasAccessibility) {
            break;
          }

          hasAccessibility = true;
          data += await parseSectionAccessibility(pageName, group);
          break;
        case 'section/size':
          data += parseSectionSize(content, pageName, group);
          break;
        default:
          console.error(`Unknown section: ${content.name}, ${pageName}`);
          break;
      }
    } catch (err) {
      console.error(
        `[${pageName}/${content.name}] Error processing content: ${err.message}`,
      );
    }
  }

  let imageIndex = 1;

  return data
    .replace(/\{imageName\}/g, () => getImageNames(imageIndex++))
    .replace(/\t/g, '  ');
};

const parseSectionAnatomy = (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  // Figure
  const ratio = getImageRatio(content.children[1]);

  const wrapper = content.children.find(({ name }) => name === 'Wrapper')!;

  const items = wrapper.children
    .map((node) => {
      if (node.visible === false) {
        return [];
      }

      return node.children
        .map((n) =>
          n.type === 'TEXT' && n.visible !== false ? getCharacters(n) : null,
        )
        .filter(Boolean) as Array<string>;
    })
    .flat()
    .filter(Boolean);

  return `\n\n<SectionAnatomy
  src="/components/${group}/${pageName}/design/{imageName}"
	ratio="${ratio}"
	data={[
		${items.map((item) => `'${item}'`).join(',')}
	]}
/>
	`;
};

const parseSectionVariants = async (pageName: string, group: string) => {
  const config = await getComponentConfig(pageName, group);

  if (!config || !config.variants) {
    return '';
  }

  const { variants } = config;

  const components = variants.components || [];
  const icons = variants.icons || [];
  const internals = variants.internals || [];
  const render = variants.render;
  const states = variants.states;
  const variantsData = variants.variants || [];

  const formatValue = (val: unknown) => {
    if (val === null || val === undefined) {
      return val;
    }

    const valStr = val.toString();

    // function
    if (
      typeof val === 'function' ||
      /^\s*\([^)]*\)\s*=>/.test(valStr) ||
      /^\s*function\s*\(/.test(valStr)
    ) {
      return valStr;
    }

    // JSX
    if (
      /^<[^>]+>/.test(valStr) ||
      (valStr.includes('<') && valStr.includes('>'))
    ) {
      return `'${valStr.replace(/'/g, "\\'")}'`;
    }

    // 일반 문자열
    if (typeof val === 'string') {
      return `'${val.replace(/'/g, "\\'")}'`;
    }

    if (typeof val === 'object') {
      return JSON.stringify(val);
    }

    return val;
  };

  const variantsString = variantsData
    .map((variant) => {
      const options = variant.options
        .map((option) => {
          const valueKeys = Object.keys(option.value);
          const valueParts =
            valueKeys.length > 0
              ? valueKeys.map(
                  (key) => `${key}: ${formatValue(option.value[key])}`,
                )
              : [];

          const valueStr =
            valueParts.length > 0 ? `{ ${valueParts.join(', ')} }` : '{}';

          return `        { label: '${option.label.replace(/'/g, "\\'")}', value: ${valueStr} }`;
        })
        .join(',\n');

      const disabledPart = variant.disabled
        ? `\n      disabled: ${formatValue(variant.disabled)},`
        : '';
      const defaultValuePart = variant.defaultValue
        ? `\n      defaultValue: ${formatValue(variant.defaultValue)},`
        : '';

      return `    {
      key: '${variant.key.replace(/'/g, "\\'")}',${disabledPart}${defaultValuePart}
      options: [
${options}
      ]
    }`;
    })
    .join(',\n');

  const iconsPart =
    icons.length > 0
      ? `  icons={[${icons.map((i) => `'${i}'`).join(', ')}]}\n`
      : '  icons={[]}\n';

  const internalPart =
    internals.length > 0
      ? `  internals={[${internals.map((i) => `'${i}'`).join(', ')}]}\n`
      : '';

  const statesPart = states ? `  states={\`${states}\`}\n` : '';

  const renderPart = render ? `  render={${formatValue(render)}}\n` : '';

  return `\n\n<SectionVariants
  components={[${components.map((c) => `'${c}'`).join(', ')}]}
${iconsPart}${internalPart}${statesPart}${renderPart}  variants={[
${variantsString}
  ]}
/>
`;
};

const parseSectionLayout = (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  const title = getCharacters(
    content.children[0]!.children.find(({ name }) => name === 'Title')!,
  );

  const usageList = content.children.filter(
    (node) =>
      node.name !== 'Markdown' &&
      node.type === 'FRAME' &&
      node.visible !== false,
  );

  const isSingleSection = usageList.length === 1;

  if (isSingleSection) {
    const usage = usageList[0];
    const figure = usage.children.find(({ name }) => name.includes('Figure'))!
      .children[0];

    const subtitleNode = usage.children.find(({ name }) =>
      name.includes('Markdown'),
    );
    const ratio = getImageRatio(figure.children[0]);

    const subtitle =
      subtitleNode && subtitleNode.visible !== false
        ? getCharacters(subtitleNode.children[1])
        : null;
    const description = getDescriptionOfFigure(figure);

    if (subtitle) {
      return `\n\n<SectionLayout title="${title}">
    <SectionFigureGroup title="${subtitle}">
      <SectionFigure
        ratio="${ratio}"
        src="/components/${group}/${pageName}/design/{imageName}"
        description={\`${description}\`}
    />
  </SectionFigureGroup>
</SectionLayout>`;
    }

    return `\n\n<SectionLayout title="${title}">
  <SectionFigure
    ratio="${ratio}"
    src="/components/${group}/${pageName}/design/{imageName}"
    description={\`${description}\`}
  />
</SectionLayout>`;
  }

  let result = `\n\n<SectionLayout title="${title}">`;

  usageList.forEach((usage) => {
    const subtitle = getCharacters(usage.children[0].children[1]);
    const figure = usage.children[1].children[0];
    const ratio = getImageRatio(figure.children[0]);

    result += `\n  <SectionFigureGroup title="${subtitle}">
    <SectionFigure
      ratio="${ratio}"
      src="/components/${group}/${pageName}/design/{imageName}"
      description={\`${getDescriptionOfFigure(figure)}\`}
    />
  </SectionFigureGroup>`;
  });

  result += `\n</SectionLayout>`;

  return result;
};

const parseSectionStates = (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  const data = content.children.filter(
    (node) =>
      node.name === 'List' &&
      node.visible !== false &&
      node.children.length > 0,
  );

  if (data.length > 1) {
    return `\n\n<SectionLayout title="States">${data
      .map((item) => {
        const figure = item.children[0];
        const title = getCharacters(figure.children[0].children[1]);
        const ratio = getImageRatio(figure.children[1]);

        return `\n  <SectionFigureGroup title="${title}">
    <SectionFigure
      ratio="${ratio}"
      src="/components/${group}/${pageName}/design/{imageName}"
    />
  </SectionFigureGroup>`;
      })
      .join('')}
</SectionLayout>`;
  }

  const ratio = getImageRatio(content.children[1]);

  const isWebOnly = content.children.find((node) =>
    node.name.includes('Content Badge'),
  );

  return `\n\n<SectionStates
  ratio="${ratio}"
  src="/components/${group}/${pageName}/design/{imageName}"${isWebOnly ? '\n  isWebOnly' : ''}
/>`;
};

const parseSectionCustomize = (content: FigmaNode) => {
  const data = content.children[1].children.filter(
    (node) => node.visible !== false && node.children.length > 0,
  );

  const result: Array<{ key: string; options: Array<string> }> = [];

  data.forEach((node) => {
    const key = getCharacters(node.children[0]);
    const options = node.children[1].children
      .map((option) =>
        option.visible !== false && option.children[1].visible !== false
          ? getCharacters(option.children[1])
          : null,
      )
      .filter(Boolean) as Array<string>;

    result.push({
      key,
      options,
    });
  });

  return `\n\n<SectionCustomize
  data={${JSON.stringify(result, null, 2)}}
/>`;
};

const parseSectionHierarchy = async (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  const config = await getComponentConfig(pageName, group);

  if (!config || !config.hierarchy) {
    return '';
  }

  const { hierarchy } = config;

  const contentList = content.children[1].children.filter(
    (node) => node.visible !== false && node.children.length > 0,
  );

  let result = `\n\n<SectionHierarchy>`;

  hierarchy.forEach((item, i) => {
    const description = getCharacters(contentList[i].children[1]);

    result += `\n  <SectionHierarchyItem
    description={\`${description}\`}
    components={${JSON.stringify(item.components, null, 2)}}
    render={\`${item.render}\`}
  />`;
  });

  result += `\n</SectionHierarchy>`;

  return result;
};

const parseSectionAccessibility = async (pageName: string, group: string) => {
  const config = await getComponentConfig(pageName, group);

  if (!config || !config.accessibility) {
    return '';
  }

  const { accessibility } = config;

  const hasTitle = accessibility.some((item) => 'title' in item);

  if (hasTitle) {
    return `\n\n<SectionLayout title="Accessibility">
${accessibility
  .map(
    (item) => `\n  <SectionFigureGroup title="${item.title}">
    <SectionFigure
      description={(
        <SectionAccessibilityTable
          contents={${JSON.stringify(item.contents, null, 2)}}
        />
      )}
    />
  </SectionFigureGroup>`,
  )
  .join('')}
</SectionLayout>
    `;
  }

  return `\n\n<SectionAccessibility
  contents={${JSON.stringify(accessibility, null, 2)}}
/>`;
};

const parseSectionHowToUse = (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  const contents = content.children.filter((node) => node.visible !== false);

  let result = `\n\n<SectionLayout title="How to use">`;

  contents.forEach((node) => {
    const figureContent = node.children[1];
    const ratio = getImageRatio(
      figureContent.children[0].children[0].children[0],
    )!;

    const variant = getCharacters(
      figureContent.children[1].children[0].children[1],
    )
      .toLowerCase()
      .includes('don’t')
      ? 'negative'
      : 'positive';

    const description = getCharacters(figureContent.children[1].children[1]);

    result += `\n  <SectionFigureGroup>
    <SectionFigure
      ratio="${ratio}"
      src="/components/${group}/${pageName}/design/{imageName}"
      variant="${variant}"
      description={\`${description}\`}
    />
  </SectionFigureGroup>`;
  });

  result += `\n</SectionLayout>`;

  return result;
};

const parseSectionSize = (
  content: FigmaNode,
  pageName: string,
  group: string,
) => {
  const title = (
    content.children[0].children[1] as unknown as TextNode
  ).characters.trim();

  const titleDescription = getDescriptionOfFigure(content);

  const usageList = content.children.filter(
    (node) =>
      ![
        'Markdown',
        'Figure',
        'Figcaption',
        'Margin Top',
        'Margin Bottom',
      ].includes(node.name) &&
      node.type === 'FRAME' &&
      node.visible !== false,
  );

  const isSingleSection = usageList.length === 1;

  if (isSingleSection) {
    const figure = usageList[0];

    const ratio = getImageRatio(figure.children[1]);
    const description = getDescriptionOfFigure(figure);

    return `\n\n<SectionLayout title="${title}"${titleDescription ? ` description="${titleDescription}"` : ''}>
  <SectionFigure
    ratio="${ratio}"
    src="/components/${group}/${pageName}/design/{imageName}"
    description={\`${description}\`}
  />
</SectionLayout>`;
  }

  let result = `\n\n<SectionLayout title="${title}"${titleDescription ? ` description="${titleDescription}"` : ''}>`;

  usageList.forEach((usage) => {
    const subtitle = getCharacters(usage.children[0].children[1]);
    const ratio = getImageRatio(usage.children[1]);

    result += `\n  <SectionFigureGroup title="${subtitle}">
    <SectionFigure
      ratio="${ratio}"
      src="/components/${group}/${pageName}/design/{imageName}"
      description={\`${getDescriptionOfFigure(usage)}\`}
    />
</SectionFigureGroup>`;
  });

  result += `\n</SectionLayout>`;

  return result;
};
