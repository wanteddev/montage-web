import path from 'path';

import inquirer from 'inquirer';
import meow from 'meow';
import execa from 'execa';

export const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');
export const transformerDirectory = path.join(__dirname, 'transforms');

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: 'Migration to v1',
    value: 'v1/migration-v1',
  },
  { name: 'Migration Forms Design', value: 'v1/migration-forms' },
  { name: 'List Cell Migration', value: 'v2/list-cell-migration' },
  { name: 'Filled Variant to Solid', value: 'v2/filled-variant-to-solid' },
  {
    name: 'Typography Variant to kebab-case',
    value: 'v2/typography-variant-cases',
  },
  { name: 'CheckMark Migration', value: 'v2/check-mark-migration' },
  {
    name: 'Padding to Vertical Padding',
    value: 'v2/padding-to-vertical-padding',
  },
  {
    name: 'Padding to Horizontal Padding',
    value: 'v2/padding-to-horizontal-padding',
  },
  { name: 'PlayBadge Migration', value: 'v2/play-badge-migration' },
  { name: 'Heading to Title', value: 'v2/heading-to-title' },
  { name: 'Input to Field', value: 'v2/input-to-field' },
  { name: 'ModalContainer Migration', value: 'v2/modal-migration' },
  { name: 'ActionArea Migration', value: 'v2/action-area-migration' },
  {
    name: 'IconCircleClose Migration',
    value: 'v2/icon-circle-close-migration',
  },
  { name: 'Avatar Migration', value: 'v2/avatar-migration' },
  { name: 'MenuBottom Migration', value: 'v2/menu-bottom-migration' },
  {
    name: 'Leading, Trailing Migration',
    value: 'v2/leading-trailing-migration',
  },
  {
    name: 'Palette to Atomic & Semantic',
    value: 'v2/palette-to-atomic-semantic',
  },
  { name: 'Size Migration', value: 'v2/size-migration' },
  { name: 'Toast Migration', value: 'v2/toast-migration' },
  {
    name: 'Typography Title1 to Display3',
    value: 'v3/typography-title1-to-display3',
  },
  {
    name: 'Empty State to Fallback View',
    value: 'v3/empty-state-to-fallback-view',
  },
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
