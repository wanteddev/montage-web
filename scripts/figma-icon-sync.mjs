import fs from 'fs';

import * as changeCase from 'change-case';
import shelljs from 'shelljs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = '7RHtWV3Pw6I98UEDjbx5V1';
const URL_BASE = 'https://api.figma.com/v1/files';
const URL_BASE_IMAGES = 'https://api.figma.com/v1/images';

const IGNORE_ICONS = ['IconLogoInstagramColor'];

const ICON_NULL_COMPONENT = '501-7411';
const ICON_RESPONSIVE_COMPONENT = '448-8266';

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

              if (!IGNORE_ICONS.includes(name)) {
                idsToNameAndComponentSetId[child.id] = [
                  name,
                  component.id,
                  child.id,
                ];
              }
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
    const [name, componentSetId, childId] = idsToNameAndComponentSetId[nodeId];
    const figmaString = [];
    res.imports.push(name);
    res.exports.push(
      `export { default as ${name} } from "./${changeCase.kebabCase(name)}";`,
    );
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
    // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_NULL_COMPONENT}", { variant: { Name: '${parsedName}' }, example: () => <${name} /> });
    // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_RESPONSIVE_COMPONENT}", { variant: { Name: '${parsedName}' }, props: { size: figma.enum('Size', { Small: '20px', Tiny: '16px', Normal: '24px', Medium: '28px', Large: '32px', }) }, example: ({ size }) => <${name} sx={{ fontSize: size }} /> });`,
    figmaString.push(
      `figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${componentSetId.replace(':', '-')}", { variant: { Name: '${parsedName}' }, example: () => <${name} /> });`,
    );
    res.files.push([
      `${changeCase.kebabCase(name)}.tsx`,
      `import { Box } from '@wanteddev/wds-engine';
  import { forwardRef } from 'react';
  
  import type { SxProp } from '@wanteddev/wds-engine';
  import type { ComponentPropsWithoutRef } from 'react';
  
  type Props = ComponentPropsWithoutRef<'svg'> & {
    sx?: SxProp;
  };
  
  const ${name} = forwardRef<SVGSVGElement, Props>((props, ref) => {
    return (
      ${svg
        .replace(/width="(.*?)"/, '')
        .replace(/height="(.*?)"/, '')
        .replace(
          'xmlns="http://www.w3.org/2000/svg"',
          'xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}',
        )
        .replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '')
        .replace(svg.includes('viewBox="0 0 12 24"') ? 'width="1em"' : '', '')
        .replaceAll('fill="#171719"', 'fill="currentColor"')
        .replace(
          /(stroke|fill|line|clip)-(.)/g,
          (_, p1, p2) => p1 + p2.toUpperCase(),
        )
        .replace('<svg', '<Box as="svg"')
        .replace('</svg', '</Box')}
    )
  });
  
  export default ${name};`,
      figmaString.join('\n'),
    ]);
  };

  console.log('Sleeping for ten seconds to wait for images to exist...');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log('Proceeding....');

  const res = { files: [], exports: [], imports: [] };
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
  const data = await getIconComponents();
  fs.writeFileSync(
    './Icons.figma.txt',
    `import figma from "@figma/code-connect";\nimport {${data.imports.sort().join(', ')}} from "@wanteddev/wds-icon";`,
  );
  fs.writeFileSync(
    './icons-index.txt',
    [...data.exports, 'export { default as IconSymbol } from "./icon-symbol";']
      .sort()
      .join('\n'),
  );
  fs.writeFileSync('./icons.json', JSON.stringify(data.files, null, 2));

  const json = JSON.parse(fs.readFileSync('./icons.json'));
  fs.copyFileSync('./icons-index.txt', './packages/wds-icon/src/index.ts');
  const figmaStarter = fs.readFileSync('./Icons.figma.txt');
  fs.writeFileSync(
    './figma/icons/index.figma.tsx',
    `${figmaStarter}\nfigma.connect("<FIGMA_ICONS_BASE>?node-id=${ICON_NULL_COMPONENT}", { props: { children: figma.instance('Icon') }, example: (props) => <>{props.children}</> });figma.connect("<FIGMA_ICONS_BASE>?node-id=${ICON_RESPONSIVE_COMPONENT}", { props: { children: figma.instance('Icon') }, example: (props) => <>{props.children}</> });\n${json.map((a) => a[2]).join('\n')}`,
  );
  await Promise.all(
    json.map(
      ([fileName, fileContents]) =>
        new Promise((resolve, reject) => {
          fs.writeFile(
            `./packages/wds-icon/src/${fileName}`,
            fileContents,
            (err) => (err ? reject(err) : resolve()),
          );
        }),
    ),
  );

  fs.rmSync('./Icons.figma.txt');
  fs.rmSync('./icons-index.txt');
  fs.rmSync('./icons.json');

  shelljs.exec(
    'pnpm jscodeshift ./packages/wds-icon/src --extensions=tsx, --parasr=tsx --transform=./packages/wds-codemod/src/transforms/svg-use-id.ts',
  );
  shelljs.exec('pnpm -F wds-icon lint:fix src');

  console.log('DONE!');
};

main();
