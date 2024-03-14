/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
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
  const { version } = await inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'Select Semver Increment (prepatch = bump alpha)',
    choices: SEMVER,
    loop: false,
  });

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
    https://api.github.com/repos/wanteddev/wds/actions/workflows/version.yml/dispatches \
    -d '{"ref":"main", "inputs": { "increment": "${version}" }}'`;

  shelljs.exec(command, { fatal: true }, (code, _stdout, stderr) => {
    if (code !== 0) {
      console.log('ERROR');
      console.log(stderr);
      return;
    }

    console.log('Deployment successfully triggered, view the output logs in');
    console.log(
      '\x1b[32m%s\x1b[0m',
      'https://github.com/wanteddev/wds/actions/workflows/version.yml',
    );
  });
};

main();
