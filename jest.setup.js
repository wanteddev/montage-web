const { readFileSync } = require('fs');

const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { glob } = require('glob');

expect.extend({ toMatchImageSnapshot });

const getFixtures = async () => {
  let fixture = [];
  const files = await glob(process.cwd() + '/test/fixture/**/*.ts');

  await Promise.all(
    files.map(async (file) => {
      const source = await require(file);

      Object.values(source).map((v) => {
        fixture.push([v.name, source]);
      });
    }),
  );

  global.fixture = fixture;
};

module.exports = getFixtures;
