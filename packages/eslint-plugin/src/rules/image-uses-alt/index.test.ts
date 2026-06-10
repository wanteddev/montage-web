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
        import { Avatar } from '@montage-ui/core';

        <Avatar alt="User avatar" />
      `,
    },
    {
      code: `
        import { Box } from '@montage-ui/core';

        <Box as="img" alt="thumbnail" />
      `,
    },
  ],
  invalid: [
    {
      code: `
        import * as montage from '@montage-ui/core';

        <montage.Avatar />
      `,
      errors: 1,
    },
    {
      code: `
        import { Avatar as Avatar2 } from '@montage-ui/core';

        <Avatar2 />
      `,
      errors: 1,
    },
    {
      code: `
        import { Avatar } from '@montage-ui/core';

        <Avatar />
      `,
      errors: 1,
    },
    {
      code: `
        import { Box } from '@montage-ui/core';

        <Box as="img" />
      `,
      errors: 1,
    },
    {
      code: `
        import { Thumbnail } from '@montage-ui/core';

        <Thumbnail />
      `,
      errors: 1,
    },
    {
      code: `
        import { CardThumbnail } from '@montage-ui/core';

        <CardThumbnail />
      `,
      errors: 1,
    },
  ],
});
