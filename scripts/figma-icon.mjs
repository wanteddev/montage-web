import {
  readFileSync,
  readdirSync,
  rmSync,
  writeFile,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

import shelljs from 'shelljs';

const outputDir = './output';

const ignoreSyncIcons = [
  {
    name: 'IconLogoInstagramColor',
    id: '40167-141755',
  },
];
const includeIndexIcons = ['IconSymbol'];

const kebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const pascalCase = (text) =>
  text.replace(/(^\w|-\w)/g, (v) => v.replace(/-/, '').toUpperCase());

const camelCase = (text) => {
  const camel = text
    .replace(/-([a-zA-Z])/g, (_, c) => c.toUpperCase())
    .replace(/^([A-Z])/, (v) => v.toLowerCase());
  return camel;
};

const makeIconComponentName = (name) => `Icon${pascalCase(name)}`;

const main = async () => {
  const outputs = readdirSync(outputDir);

  const result = JSON.parse(
    readFileSync(join(outputDir, 'result.json'), 'utf-8'),
  );

  const data = outputs
    .filter((filename) => filename.match(/\.svg$/))
    .filter(
      (filename) =>
        !ignoreSyncIcons.some(
          (icon) =>
            icon.name === `Icon${pascalCase(filename.replace(/\.svg$/, ''))}`,
        ),
    )
    .map((filename) => {
      const content = readFileSync(join(outputDir, filename), 'utf-8');

      const filenameWithoutExtension = filename.replace('.svg', '');

      const { id, description } = result.find(
        (r) => r.name === filenameWithoutExtension,
      );

      return {
        name: `Icon${pascalCase(filenameWithoutExtension)}`,
        content,
        id,
        description,
        parsedName: filenameWithoutExtension,
      };
    });

  /**
   * @type {Array<[string, string]>}
   */
  const files = [];

  /**
   * Code Connect batch entries, grouped by Figma node URL.
   * @type {Map<string, Array<{ name: string; component: string }>>}
   */
  const figmaConnectEntries = new Map();
  const addFigmaConnectEntry = (id, name, component) => {
    const url = `<FIGMA_ICONS_BASE>?node-id=${id}`;
    const variants = figmaConnectEntries.get(url) ?? [];
    variants.push({ name, component });
    figmaConnectEntries.set(url, variants);
  };

  data.forEach((icon) => {
    const { name, content, id, parsedName, description } = icon;
    const fileName = kebabCase(name);

    const comment = description
      ? `/**\n * ${description.split('\n').join('\n * ')}\n */`
      : '';

    const fileContent = `import { Box } from '@montage-ui/engine';
    import { forwardRef } from 'react';

    import type { SxProp } from '@montage-ui/engine';
    import type { ComponentPropsWithoutRef } from 'react';

    type Props = ComponentPropsWithoutRef<'svg'> & {
      sx?: SxProp;
    };

    ${comment}
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

    addFigmaConnectEntry(id, parsedName.replace(/Color$/, ''), name);
  });

  ignoreSyncIcons.forEach((icon) => {
    const iconName = camelCase(
      icon.name.replace(/^Icon/, '').replace(/Color$/, ''),
    );
    addFigmaConnectEntry(icon.id, iconName, icon.name);
  });

  const duplicatedInstances = result.filter(
    ({ id, name }) =>
      !data.find((v) => v.id === id) &&
      !ignoreSyncIcons.some(
        (icon) => icon.name === makeIconComponentName(name),
      ),
  );

  duplicatedInstances.forEach(({ id, name }) => {
    addFigmaConnectEntry(
      id,
      name.replace(/Color$/, ''),
      makeIconComponentName(name),
    );
  });

  writeFileSync(
    './figma/icons/icons.figma.batch.json',
    `${JSON.stringify(
      [
        {
          templateFile: './icons.figma.batch.ts',
          components: [...figmaConnectEntries].map(([url, variants]) => ({
            url,
            component: variants[0].component,
            variants,
          })),
        },
      ],
      null,
      2,
    )}\n`,
  );

  await Promise.all(
    files.map(
      ([fileName, fileContents]) =>
        new Promise((resolve, reject) => {
          writeFile(
            `./packages/icon/src/${fileName}.tsx`,
            fileContents,
            (err) => (err ? reject(err) : resolve()),
          );
        }),
    ),
  );

  writeFileSync(
    './packages/icon/src/index.ts',
    [
      ...data.map(
        ({ name }) =>
          `export { default as ${name} } from "./${kebabCase(name)}";`,
      ),
      ...[
        ...ignoreSyncIcons.map((icon) => icon.name),
        ...includeIndexIcons,
      ].map(
        (icon) => `export { default as ${icon} } from "./${kebabCase(icon)}";`,
      ),
    ]
      .sort()
      .join('\n'),
    'utf-8',
  );

  shelljs.exec(
    'pnpm jscodeshift ./packages/icon/src --extensions=tsx, --parasr=tsx --transform=./packages/codemod/src/transforms/svg-use-id.ts',
  );
  shelljs.exec('pnpm -F icon lint:fix src');

  rmSync(outputDir, { recursive: true, force: true });

  console.log('DONE!');
};

main();
