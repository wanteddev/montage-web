import inquirer from 'inquirer';
import shelljs from 'shelljs';

const SEMVER = [
  'prerelease',
  'prepatch',
  'preminor',
  'premajor',
  'patch',
  'minor',
  'major',
];

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
    https://api.github.com/repos/wanteddev/montage-web/actions/workflows/version.yml/dispatches \
    -d '{"ref":"${branchName}", "inputs": { "increment": "${version}" }}'`;

  shelljs.exec(command, { fatal: true }, (code, _stdout, stderr) => {
    if (code !== 0) {
      console.log('ERROR');
      console.log(stderr);
      return;
    }

    console.log('Deployment successfully triggered, view the output logs in');
    console.log(
      '\x1b[32m%s\x1b[0m',
      'https://github.com/wanteddev/montage-web/actions/workflows/version.yml',
    );
  });
};

main();
