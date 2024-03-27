import fs from 'node:fs';
import path from 'node:path';

import shelljs from 'shelljs';
import inquirer from 'inquirer';
import * as changeCase from 'change-case';
import { sync } from 'glob';

const ROOT = process.cwd();

const main = async () => {
  const paths = sync(path.join(ROOT, '**/*.svg'), {
    absolute: false,
  });

  try {
    fs.mkdirSync(path.join(ROOT, 'temp'));
  } catch (err) {
    //
  }

  const newPaths = [];

  for (const svg of paths) {
    const filename = svg.split(',')[0].split('=')[1].split('.svg')[0] + '.svg';

    fs.renameSync(svg, path.join(ROOT, 'temp/', filename));

    newPaths.push(filename);
  }

  const getComponentContent = (componentName, content) => {
    return `import type { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const Icon${componentName} = (props: Props) => {
	return (
		${content
      .replace(/width="(.*?)"/, '')
      .replace(/height="(.*?)"/, '')
      .replace(
        'xmlns="http://www.w3.org/2000/svg"',
        'xmlns="http://www.w3.org/2000/svg" {...props}',
      )
      .replaceAll('fill="#171719"', 'fill="currentColor"')
      .replaceAll('fill-rule', 'fillRule')
      .replaceAll('clip-rule', 'clipRule')}
	)
};

export default Icon${componentName};`;
  };

  const existFiles = [];

  const createdFiles = [];

  for (const svg of newPaths) {
    const filename = changeCase.kebabCase(svg.replace('.svg', ''));
    const componentName = changeCase.pascalCase(svg.replace('.svg', ''));

    if (fs.existsSync(path.join(ROOT, 'src', filename + '.tsx'))) {
      existFiles.push({ filename, componentName, svg });
    } else {
      fs.renameSync(
        path.join(ROOT, 'temp/', svg),
        path.join(ROOT, 'src', filename + '.tsx'),
      );

      const fileContent = fs.readFileSync(
        path.join(ROOT, 'src', filename + '.tsx'),
        'utf-8',
      );

      fs.writeFileSync(
        path.join(ROOT, 'src', filename + '.tsx'),
        getComponentContent(componentName, fileContent),
        'utf-8',
      );
      createdFiles.push(filename + '.tsx');
      console.info(`${componentName} - 완료`);
    }
  }

  if (existFiles.length > 0) {
    const { override } = await inquirer.prompt({
      type: 'confirm',
      name: 'override',
      message: `이미 존재하는 파일이 있습니다. 덮어씌우시겠습니까? \n${existFiles.map((v) => v.filename)}`,
    });

    if (override) {
      for (const { filename, componentName, svg } of existFiles) {
        fs.renameSync(
          path.join(ROOT, 'temp/', svg),
          path.join(ROOT, 'src', filename + '.tsx'),
        );

        const fileContent = fs.readFileSync(
          path.join(ROOT, 'src', filename + '.tsx'),
          'utf-8',
        );

        fs.writeFileSync(
          path.join(ROOT, 'src', filename + '.tsx'),
          getComponentContent(componentName, fileContent),
          'utf-8',
        );
        createdFiles.push(filename + '.tsx');
        console.info(`${componentName} - 완료`);
      }
    }
  }

  try {
    fs.rmdirSync(path.join(ROOT, 'temp'), {
      recursive: true,
    });
  } catch (err) {
    //
  }

  shelljs.exec(
    `pnpm -F wds-icon lint:fix -- ${createdFiles.map((v) => 'src/' + v).join(' ')}`,
  );
};

main();
