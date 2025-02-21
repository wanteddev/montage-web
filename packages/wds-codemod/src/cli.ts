import path from 'path';

import inquirer from 'inquirer';
import meow from 'meow';
import execa from 'execa';

export const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');
export const transformerDirectory = path.join(__dirname, 'transforms');

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: 'Migration to v1',
    value: 'migration-v1',
  },
  { name: 'Migration Toast', value: 'migration-toast' },
  { name: 'Migration Forms Design', value: 'migration-forms' },
  { name: 'List Cell Migration', value: 'list-cell-migration' },
  { name: 'Filled Variant to Solid', value: 'filled-variant-to-solid' },
  {
    name: 'Typography Variant to kebab-case',
    value: 'typography-variant-cases',
  },
  { name: 'CheckMark Migration', value: 'check-mark-migration' },
  { name: 'Padding to Vertical Padding', value: 'padding-to-vertical-padding' },
  {
    name: 'Padding to Horizontal Padding',
    value: 'padding-to-horizontal-padding',
  },
  { name: 'PlayBadge Migration', value: 'play-badge-migration' },
];

const run = () => {
  const cli = meow({
    help: `
    Usage
      $ npx @wanteddev/wds-codemod <transform> <path> <...options>
        transform    One of the choices from https://github.com/wanteddev/wds/tree/main/packages/wds-codemod
        path         Files or directory to transform. Can be a glob like pages/**.js
    `,
    flags: {
      string: ['_'],
    },
  } as meow.Options<meow.AnyFlags>);

  if (
    cli.input[0] &&
    !TRANSFORMER_INQUIRER_CHOICES.find((x) => x.value === cli.input[0])
  ) {
    console.error('Invalid transform choice, pick one of:');
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map((x) => '- ' + x.value).join('\n'),
    );
    process.exit(1);
  }

  inquirer
    .prompt([
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
        name: 'transformer',
        message: '실행할 transformer를 선택하세요.',
        when: !cli.input[0],
        pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
        choices: TRANSFORMER_INQUIRER_CHOICES,
      },
    ])
    .then((answers) => {
      const { files, transformer } = answers;

      const filesBeforeExpansion = cli.input[1] || files;
      const selectedTransformer = cli.input[0] || transformer;

      return runTransform({
        files: filesBeforeExpansion,
        transformer: selectedTransformer,
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
