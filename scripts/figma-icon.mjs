import fs from 'fs';
import path from 'path';

import shelljs from 'shelljs';

const outputDir = './output';

const ignoreSyncIcons = ['IconLogoInstagramColor'];
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

const main = async () => {
  const outputs = fs.readdirSync(outputDir);

  const result = JSON.parse(
    fs.readFileSync(path.join(outputDir, 'result.json'), 'utf-8'),
  );

  const data = outputs
    .filter((filename) => filename.match(/\.svg$/))
    .filter(
      (filename) =>
        !ignoreSyncIcons.includes(
          `Icon${pascalCase(filename.replace(/\.svg$/, ''))}`,
        ),
    )
    .map((filename) => {
      const content = fs.readFileSync(path.join(outputDir, filename), 'utf-8');

      const filenameWithoutExtension = filename.replace('.svg', '');

      return {
        name: `Icon${pascalCase(filenameWithoutExtension)}`,
        content,
        id: result.find((r) => r.name === filenameWithoutExtension).id,
        parsedName: filenameWithoutExtension,
      };
    });

  /**
   * @type {Array<[string, string]>}
   */
  const files = [];

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

    // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_NULL_COMPONENT}", { variant: { Name: '${parsedName}' }, example: () => <${name} /> });
    // figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${ICON_RESPONSIVE_COMPONENT}", { variant: { Name: '${parsedName}' }, props: { size: figma.enum('Size', { Small: '20px', Tiny: '16px', Normal: '24px', Medium: '28px', Large: '32px', }) }, example: ({ size }) => <${name} sx={{ fontSize: size }} /> });`,
    figmaConnectContents.push(
      `figma.connect(${name}, "<FIGMA_ICONS_BASE>?node-id=${id}", { variant: { Name: '${parsedName.replace(/Color$/, '')}' }, example: () => <${name} /> });`,
    );
  });

  ignoreSyncIcons.forEach((icon) => {
    const iconName = camelCase(icon.replace(/^Icon/, '').replace(/Color$/, ''));
    figmaConnectContents.push(
      `figma.connect(${icon}, "<FIGMA_ICONS_BASE>?node-id=${result.find((r) => iconName === r.name).id}", { variant: { Name: '${iconName}' }, example: () => <${icon} /> });`,
    );
  });

  fs.writeFileSync(
    './figma/icons/index.figma.tsx',
    `import figma from "@figma/code-connect";\nimport {${files
      .map(([name]) => pascalCase(name))
      .join(
        ', ',
      )}, ${ignoreSyncIcons.join(', ')} } from "@wanteddev/wds-icon";\n${figmaConnectContents.join('\n')}`,
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
      ...[...ignoreSyncIcons, ...includeIndexIcons].map(
        (icon) => `export { default as ${icon} } from "./${kebabCase(icon)}";`,
      ),
    ]
      .sort()
      .join('\n'),
    'utf-8',
  );

  shelljs.exec(
    'pnpm jscodeshift ./packages/wds-icon/src --extensions=tsx, --parasr=tsx --transform=./packages/wds-codemod/src/transforms/svg-use-id.ts',
  );
  shelljs.exec('pnpm -F wds-icon lint:fix src');

  fs.rmSync(outputDir, { recursive: true, force: true });

  console.log('DONE!');
};

main();
