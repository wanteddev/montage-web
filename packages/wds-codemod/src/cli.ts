import path from 'path';

import inquirer from 'inquirer';
import meow from 'meow';
import execa from 'execa';

import { MIGRATION_TRANSFORMS } from './constants';

export const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');
export const transformerDirectory = path.join(__dirname, 'transforms');

const TRANSFORMER_INQUIRER_CHOICES = Object.entries(MIGRATION_TRANSFORMS)
  .map(([version, transformers]) => {
    return Object.entries(transformers).map(([value, name]) => {
      return { name, value: `${version}/${value}` };
    });
  })
  .flat();

const VERSIONS = Object.keys(MIGRATION_TRANSFORMS);

const run = () => {
  const cli = meow({
    help: `
    Usage
      $ npx @wanteddev/wds-codemod <transform> <path> <...options>
        transform    One of the choices from https://github.com/wanteddev/montage-web/tree/main/packages/wds-codemod
        path         Files or directory to transform. Can be a glob like pages/**.js
    `,
    flags: {
      string: ['_'],
    },
  } as meow.Options<meow.AnyFlags>);

  const matchedTransformer = TRANSFORMER_INQUIRER_CHOICES.find(
    (x) => x.value.replace(/v([0-9]+)\//, '') === cli.input[0],
  )?.value;

  if (cli.input[0] && !matchedTransformer) {
    console.error('Invalid transform choice, pick one of:');
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map(
        (x) => '- ' + x.value.replace(/v([0-9]+)\//, ''),
      ).join('\n'),
    );
    process.exit(1);
  }

  inquirer
    .prompt<{
      files?: string;
      version?: string;
    }>([
      {
        type: 'input',
        name: 'files',
        message: 'codemod를 적용할 디렉토리를 입력하세요.',
        when: !cli.input[1],
        default: 'src',
        filter: (files) => files.trim(),
      },
      {
        type: 'list',
        name: 'version',
        message: '마이그레이션 대상 버전을 선택하세요.',
        when: !cli.input[0],
        pageSize: 5,
        choices: VERSIONS,
      },
    ])
    .then(async (answers) => {
      const { version, files } = answers;

      const filesBeforeExpansion = cli.input[1] || files;
      let selectedTransformer = matchedTransformer;

      if (version) {
        const choices = TRANSFORMER_INQUIRER_CHOICES.filter((x) =>
          x.value.startsWith(version),
        );

        const { transformer } = await inquirer.prompt<{
          transformer?: string;
        }>([
          {
            type: 'list',
            name: 'transformer',
            message: '실행할 transformer를 선택하세요.',
            pageSize: 5,
            choices,
            loop: false,
          },
        ]);

        selectedTransformer = transformer;
      }

      return runTransform({
        files: filesBeforeExpansion!,
        transformer: selectedTransformer!,
      });
    });
};

const runTransform = ({
  files,
  transformer,
}: {
  files: string;
  transformer: string;
}) => {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`);

  let args: Array<string> = [];

  args.push('--verbose=2');

  args.push('--ignore-pattern=**/node_modules/**');
  args.push('--ignore-pattern=**/.next/**');
  args.push('--ignore-pattern=**/dist/**');

  args.push('--extensions=tsx,ts,jsx,js');

  args = args.concat(['--transform', transformerPath]);

  args = args.concat(files);

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
    stripFinalNewline: false,
  });

  if (result.failed) {
    throw new Error(`jscodeshift exited with code ${result.exitCode}`);
  }
};

run();
