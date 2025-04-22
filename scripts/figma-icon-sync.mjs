import fs from 'fs';
import { execSync } from 'child_process';

const platform = process.env.PLATFORM || 'web';

const WEB_IGNORE_ICONS = ['IconLogoInstagramColor', 'IconSymbol'];

const ignoreIcons =
  platform === 'web'
    ? WEB_IGNORE_ICONS
    : (process.env.IGNORE_ICONS || '').split(',');

const kebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const exec = (cmd) => execSync(cmd).toString();

const TOKEN = process.env.FIGMA_TOKEN;
const URL_BASE = 'https://api.figma.com/v1/files';
const URL_BASE_IMAGES = 'https://api.figma.com/v1/images';

const FILE_KEY = '7RHtWV3Pw6I98UEDjbx5V1';

// Icon/Assets/Normal
const ROOT_TRAVERSE_IDS = [
  // Components
  '26882:89366',
  // 0 Theme
  '10077:24937',
  // Icon
  '14852:37729',
  // '' Section
  '14854:45087',
  // Solid
  '14854:45155',
  // Content
  '26894:99058',
];

// Icon/Assets/Color
const ROOT_TRAVERSE_COLOR_IDS = [
  // Components
  '26882:89366',
  // 0 Theme
  '10077:24937',
  // Icon
  '14852:37729',
  // '' Section
  '14854:45087',
  // Color
  '14854:45156',
  // Content
  '26900:94433',
];

// Icon/Navigation
const ROOT_TRAVERSE_NAVIGATION_IDS = [
  // Components
  '26882:89366',
  // 0 Theme
  '10077:24937',
  // Icon
  '14852:37729',
  // '' Section
  '14854:45087',
  // Navigation
  '14854:45095',
  // Content
  '10077:25083',
];

const getIconComponents = async () => {
  try {
    const fileResponse = await fetch(
      `${URL_BASE}/${FILE_KEY}?ids=26882-89366`,
      {
        method: 'GET',
        headers: { 'X-FIGMA-TOKEN': TOKEN },
      },
    );
    const data = await fileResponse.json();

    return await fileRESTResponseToIconComponentsJSON(data);
  } catch (e) {
    throw e;
  }
};

const getSVGImages = async (nodeIds) => {
  try {
    const fileResponse = await fetch(
      `${URL_BASE_IMAGES}/${FILE_KEY}?format=svg&ids=${nodeIds.join(',')}`,
      {
        method: 'GET',
        headers: { 'X-FIGMA-TOKEN': TOKEN },
      },
    );
    return await fileResponse.json();
  } catch (e) {
    throw e;
  }
};

const fileRESTResponseToIconComponentsJSON = async (response) => {
  // ICON
  let parentNode = response.document;
  // ICON COLOR
  let colorParentNode = response.document;
  // ICON NAVIGATION
  let navigationParentNode = response.document;

  ROOT_TRAVERSE_IDS.forEach(
    (id) => (parentNode = parentNode.children.find((a) => a.id === id)),
  );

  ROOT_TRAVERSE_COLOR_IDS.forEach(
    (id) =>
      (colorParentNode = colorParentNode.children.find((a) => a.id === id)),
  );

  ROOT_TRAVERSE_NAVIGATION_IDS.forEach(
    (id) =>
      (navigationParentNode = navigationParentNode.children.find(
        (a) => a.id === id,
      )),
  );

  const idsToNameAndComponentSetId = {};

  const getIconNames = (nodes, type = '') => {
    if (nodes) {
      nodes.children.forEach((component) => {
        if (component.type === 'COMPONENT_SET') {
          const components = component.children.filter(
            (child) => child.type === 'COMPONENT',
          );

          if (components) {
            components.map((child) => {
              const name =
                'Icon' +
                child.name
                  .replace('Name=', '')
                  .replace('name=', '')
                  .replace(/, [\s\S]+/g, '')
                  .split(/[^a-zA-Z0-9]+/)
                  .map((a) => a.charAt(0).toUpperCase() + a.substring(1))
                  .join('') +
                type;

              idsToNameAndComponentSetId[child.id] = [name, component.id];
            });
          }
        }
      });
    }
  };

  getIconNames(parentNode);
  getIconNames(colorParentNode, 'Color');
  getIconNames(navigationParentNode);

  const nodeIds = Object.keys(idsToNameAndComponentSetId);
  const { images } = await getSVGImages(nodeIds);

  const processNodeId = async (nodeId) => {
    const fileResponse = await fetch(images[nodeId], { method: 'GET' });
    const svg = await fileResponse.text();
    const [name, componentSetId] = idsToNameAndComponentSetId[nodeId];

    const parsedName = name
      .replace('Icon', '')
      .replace('Color', '')
      .split(/[^a-zA-Z0-9]+/)
      .map((a, i) =>
        i === 0
          ? a.charAt(0).toLowerCase() + a.substring(1)
          : a.charAt(0).toUpperCase() + a.substring(1),
      )
      .join('');

    res.push({
      name,
      content: svg,
      id: componentSetId.replace(':', '-'),
      parsedName,
    });
  };

  console.log('Sleeping for ten seconds to wait for images to exist...');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log('Proceeding....');

  /**
   * @type {Array<{name: string, content: string, id: string, parsedName: string}>}
   */
  const res = [];
  const fails = [];
  await Promise.all(
    nodeIds.map(async (nodeId) => {
      try {
        await processNodeId(nodeId);
      } catch (e) {
        fails.push(nodeId);
        console.log('Failed once:', nodeId, e);
      }
    }),
  );
  console.log(`Retrying ${fails.length} failure(s)...`);
  await Promise.all(
    fails.map(async (nodeId) => {
      try {
        await processNodeId(nodeId);
      } catch (e) {
        console.error(e);
        console.log(
          'Failed again:',
          nodeId,
          images[nodeId],
          ...idsToNameAndComponentSetId[nodeId],
        );
      }
    }),
  );

  return res;
};

const main = async () => {
  const data = (await getIconComponents()).filter(
    ({ name }) => !ignoreIcons.includes(name),
  );

  switch (platform) {
    case 'web': {
      /**
       * @type {Array<[string, string]>}
       */
      const files = [];

      /**
       * @type {Array<string>}
       */
      const indexContents = [];

      /**
       * @type {Array<string>}
       */
      const figmaConnectContents = [];

      data.forEach((icon) => {
        const { name, content, id, parsedName } = icon;
        const fileName = kebabCase(name);
        const fileContent = `import { Box } from '@wanteddev/wds-engine';
  import { forwardRef } from 'react';
  
  import type { SxProp } from '@wanteddev/wds-engine';
  import type { ComponentPropsWithoutRef } from 'react';
  
  type Props = ComponentPropsWithoutRef<'svg'> & {
    sx?: SxProp;
  };
  
  const ${name} = forwardRef<SVGSVGElement, Props>((props, ref) => {
    return (
      ${content
        .replace(/width="(.*?)"/, '')
        .replace(/height="(.*?)"/, '')
        .replace(
          'xmlns="http://www.w3.org/2000/svg"',
          'xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}',
        )
        .replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '')
        .replace(
          content.includes('viewBox="0 0 12 24"') ? 'width="1em"' : '',
          '',
        )
        .replaceAll('fill="#171719"', 'fill="currentColor"')
        .replace(
          /(stroke|fill|line|clip)-(.)/g,
          (_, p1, p2) => p1 + p2.toUpperCase(),
        )
        .replace('<svg', '<Box as="svg"')
        .replace('</svg', '</Box')}
    )
  });
  
  export default ${name};`;

        files.push([fileName, fileContent]);

        indexContents.push(
          `export { default as ${name} } from "./${kebabCase(name)}";`,
        );

        // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_NULL_COMPONENT}", { variant: { Name: '${parsedName}' }, example: () => <${name} /> });
        // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_RESPONSIVE_COMPONENT}", { variant: { Name: '${parsedName}' }, props: { size: figma.enum('Size', { Small: '20px', Tiny: '16px', Normal: '24px', Medium: '28px', Large: '32px', }) }, example: ({ size }) => <${name} sx={{ fontSize: size }} /> });`,
        figmaConnectContents.push(
          `figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${id}", { variant: { Name: '${parsedName}' }, example: () => <${name} /> });`,
        );
      });

      fs.writeFileSync(
        './figma/icons/index.figma.tsx',
        `import figma from "@figma/code-connect";\nimport {${files.map(([name]) => name).join(', ')}} from "@wanteddev/wds-icon";
${figmaConnectContents.join('\n')}`,
      );

      await Promise.all(
        files.map(
          ([fileName, fileContents]) =>
            new Promise((resolve, reject) => {
              fs.writeFile(
                `./packages/wds-icon/src/${fileName}.tsx`,
                fileContents,
                (err) => (err ? reject(err) : resolve()),
              );
            }),
        ),
      );

      fs.writeFileSync(
        './packages/wds-icon/src/index.ts',
        [
          ...data.map(
            ({ name }) =>
              `export { default as ${name} } from "./${kebabCase(name)}";`,
          ),
          ...ignoreIcons.map(
            (icon) =>
              `export { default as ${icon} } from "./${kebabCase(icon)}";`,
          ),
        ]
          .sort()
          .join('\n'),
        'utf-8',
      );

      exec(
        'pnpm jscodeshift ./packages/wds-icon/src --extensions=tsx, --parasr=tsx --transform=./packages/wds-codemod/src/transforms/svg-use-id.ts',
      );
      exec('pnpm -F wds-icon lint:fix src');

      break;
    }
    case 'android':
      break;
    case 'ios':
      break;
  }

  console.log('DONE!');
};

main();
