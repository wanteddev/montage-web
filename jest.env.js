const { glob } = require('glob');

const getFixtures = async () => {
  let fixture = [];
  const files = await glob(process.cwd() + '/test/fixture/**/*.ts');

  await Promise.all(
    files.map(async (file) => {
      const source = await require(file);

      Object.values(source).map((v) => {
        fixture.push([v.name, v]);
      });
    }),
  );

  global.fixture = fixture;
};

module.exports = getFixtures;
