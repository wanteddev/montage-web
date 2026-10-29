import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import inquirer from 'inquirer';

const SEMVER = [
  'prerelease',
  'prepatch',
  'preminor',
  'premajor',
  'patch',
  'minor',
  'major',
];

const run = (command) =>
  spawnSync(command, { shell: true, encoding: 'utf-8' }).stdout.trim();

const main = async () => {
  const branchName = run('git symbolic-ref --short -q HEAD');

  const [localHash, remoteHash] = [
    'git rev-parse HEAD | cut -c1-8',
    `git rev-parse origin/${branchName} | cut -c1-8`,
  ].map(run);

  if (localHash !== remoteHash) {
    console.error('최신 코드 상태로 실행해주세요.');
    return;
  }

  const { version } = await inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'Select Semver Increment (prepatch = bump alpha)',
    choices: SEMVER,
    loop: false,
  });

  if (!version.includes('pre') && branchName !== 'main') {
    console.error('main 브랜치에서만 배포할 수 있습니다.');
    return;
  }

  const { isConfirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'isConfirm',
    message: `정말로 ${version} 버전으로 패키지들을 배포하시겠습니까?`,
    loop: false,
  });

  if (!isConfirm) {
    return;
  }

  const npmrcPath = join(homedir(), '.npmrc');
  const rawToken = existsSync(npmrcPath)
    ? readFileSync(npmrcPath, 'utf-8')
    : '';
  const match = new RegExp(
    /\/\/npm.pkg.github.com\/:_authToken=(?<token>.*)/,
  ).exec(rawToken);
  const { groups } = match || {};
  const token = groups.token;

  if (!token) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      'FAILED TO GET VALID TOKEN FROM ~/.npmrc FILE',
    );
    return;
  }

  const response = await fetch(
    'https://api.github.com/repos/wanteddev/montage-web/actions/workflows/version.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({ ref: branchName, inputs: { increment: version } }),
    },
  );

  if (!response.ok) {
    console.log('ERROR');
    console.log(await response.text());
    return;
  }

  console.log('Deployment successfully triggered, view the output logs in');
  console.log(
    '\x1b[32m%s\x1b[0m',
    'https://github.com/wanteddev/montage-web/actions/workflows/version.yml',
  );
};

main();
