import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import inquirer from 'inquirer';

const SERVER_TYPES = ['dev', 'www'];

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

  const { serverType } = await inquirer.prompt({
    type: 'list',
    name: 'serverType',
    message: 'Select Server Type',
    choices: SERVER_TYPES,
    loop: false,
  });

  const { isConfirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'isConfirm',
    message: `정말로 ${serverType} 환경에 배포하시겠습니까?`,
    loop: false,
  });

  if (!isConfirm) {
    return;
  }

  let algolia = false;

  if (serverType === 'www') {
    const { algoliaCrawler } = await inquirer.prompt({
      type: 'confirm',
      name: 'algoliaCrawler',
      message: 'algolia crawler를 실행하시겠습니까?',
      default: false,
      loop: false,
    });

    algolia = algoliaCrawler;
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
    'https://api.github.com/repos/wanteddev/montage-web/actions/workflows/docs-deploy.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        ref: branchName,
        inputs: { serverType, algolia: `${algolia}` },
      }),
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
    'https://github.com/wanteddev/montage-web/actions/workflows/docs-deploy.yml',
  );
};

main();
