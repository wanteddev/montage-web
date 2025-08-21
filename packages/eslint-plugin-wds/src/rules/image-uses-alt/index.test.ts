import { RuleTester } from 'eslint';

import imageUsesAltRule from '.';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('image-uses-alt', imageUsesAltRule, {
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
