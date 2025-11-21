import { run } from 'eslint-vitest-rule-tester';

import imageUsesAltRule from '.';

run({
  name: 'image-uses-alt',
  rule: imageUsesAltRule,
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  valid: [
    {
      code: `
        import { Avatar } from '@wanteddev/wds';

        <Avatar alt="User avatar" />
      `,
    },
    {
      code: `
        import { Box } from '@wanteddev/wds';

        <Box as="img" alt="thumbnail" />
      `,
    },
  ],
  invalid: [
    {
      code: `
        import * as wds from '@wanteddev/wds';

        <wds.Avatar />
      `,
      errors: 1,
    },
    {
      code: `
        import { Avatar as Avatar2 } from '@wanteddev/wds';

        <Avatar2 />
      `,
      errors: 1,
    },
    {
      code: `
        import { Avatar } from '@wanteddev/wds';

        <Avatar />
      `,
      errors: 1,
    },
    {
      code: `
        import { Box } from '@wanteddev/wds';

        <Box as="img" />
      `,
      errors: 1,
    },
    {
      code: `
        import { Thumbnail } from '@wanteddev/wds';

        <Thumbnail />
      `,
      errors: 1,
    },
    {
      code: `
        import { CardThumbnail } from '@wanteddev/wds';

        <CardThumbnail />
      `,
      errors: 1,
    },
  ],
});
