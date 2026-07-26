import path from 'path';
import fs from 'fs';

import inquirer from 'inquirer';
import meow from 'meow';
import execa from 'execa';

import { MIGRATION_TRANSFORMS } from './constants';
import { renameWdsVariablesInString } from './transforms/v4/css-variable-map';
import { renameWdsDomIdentifiersInString } from './transforms/v4/dom-identifier-map';
import { renameSemanticTokensInString } from './transforms/v4/semantic-token-map';

/**
 * Transforms that also need to rewrite stylesheets, which jscodeshift cannot
 * parse. Keyed by transform name; the value is the text rename applied to
 * .css/.scss/.sass/.less files.
 */
const STYLE_TEXT_TRANSFORMS: Record<string, (source: string) => string> = {
  'css-variable-migration': renameWdsVariablesInString,
  'dom-identifier-migration': renameWdsDomIdentifiersInString,
  'semantic-token-migration': renameSemanticTokensInString,
};

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
      $ npx @montage-ui/codemod <transform> <path> <...options>
        transform    One of the choices from https://github.com/wanteddev/montage-web/tree/main/packages/codemod
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

const STYLE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];
const IGNORED_DIRECTORIES = new Set(['node_modules', '.next', 'dist']);

/**
 * jscodeshift only parses JS/TS, so stylesheets are handled with a plain text
 * pass that reuses the same rename rules. Walks files/directories passed on the
 * CLI and rewrites every `--wds-*` token it finds.
 */
const collectStyleFiles = (target: string): Array<string> => {
  let stat;

  try {
    stat = fs.statSync(target);
  } catch {
    return [];
  }

  if (stat.isFile()) {
    return STYLE_EXTENSIONS.includes(path.extname(target)) ? [target] : [];
  }

  if (!stat.isDirectory()) {
    return [];
  }

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return IGNORED_DIRECTORIES.has(entry.name)
        ? []
        : collectStyleFiles(path.join(target, entry.name));
    }

    return STYLE_EXTENSIONS.includes(path.extname(entry.name))
      ? [path.join(target, entry.name)]
      : [];
  });
};

const runStyleTextTransform = (
  files: string,
  rename: (source: string) => string,
) => {
  const targets = files.split(/\s+/).filter(Boolean).flatMap(collectStyleFiles);

  let changed = 0;

  for (const file of new Set(targets)) {
    const source = fs.readFileSync(file, 'utf8');
    const next = rename(source);

    if (next !== source) {
      fs.writeFileSync(file, next);
      changed += 1;
      console.log(`stylesheet updated: ${file}`);
    }
  }

  console.log(`\nStylesheets updated: ${changed}`);
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

  // Some transforms also rewrite stylesheets, which jscodeshift cannot parse —
  // run the matching text pass over .css/.scss/.sass/.less files.
  const styleRename = Object.entries(STYLE_TEXT_TRANSFORMS).find(([name]) =>
    transformer.endsWith(name),
  )?.[1];

  if (styleRename) {
    runStyleTextTransform(files, styleRename);
  }
};

run();
