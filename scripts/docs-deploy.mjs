import inquirer from 'inquirer';
import shelljs from 'shelljs';

const SERVER_TYPES = ['dev', 'www'];

const main = async () => {
  const branchName = shelljs
    .exec('git symbolic-ref --short -q HEAD', {
      silent: true,
    })
    .stdout.trim();

  const [localHash, remoteHash] = [
    'git rev-parse HEAD | cut -c1-8',
    `git rev-parse origin/${branchName} | cut -c1-8`,
  ].map((command) =>
    shelljs
      .exec(command, {
        silent: true,
      })
      .stdout.trim(),
  );

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

  const rawToken = shelljs.exec('cat ~/.npmrc', { silent: true }).stdout;
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

  const command = `curl \
    -X POST \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token ${token}" \
    https://api.github.com/repos/wanteddev/montage-web/actions/workflows/docs-deploy.yml/dispatches \
    -d '{"ref":"${branchName}",  "inputs": { "serverType": "${serverType}", "algolia": "${algolia}" }}'`;

  shelljs.exec(command, { fatal: true }, (code, _stdout, stderr) => {
    if (code !== 0) {
      console.log('ERROR');
      console.log(stderr);
      return;
    }

    console.log('Deployment successfully triggered, view the output logs in');
    console.log(
      '\x1b[32m%s\x1b[0m',
      'https://github.com/wanteddev/montage-web/actions/workflows/docs-deploy.yml',
    );
  });
};

main();
