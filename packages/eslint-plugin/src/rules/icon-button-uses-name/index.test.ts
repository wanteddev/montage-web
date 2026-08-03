import { run } from 'eslint-vitest-rule-tester';

import iconButtonUsesNameRule from '.';

run({
  name: 'icon-button-uses-name',
  rule: iconButtonUsesNameRule,

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  valid: [
    {
      code: `
        import { IconButton } from '@montage-ui/core';

        <IconButton aria-label="close" />
      `,
    },
    {
      code: `
        import { Button } from '@montage-ui/core';

        <Button iconOnly aria-label="close" />
      `,
    },
    {
      code: `
        import { Button } from '@montage-ui/core';

        <Button iconOnly={false} />
      `,
    },
    {
      code: `
        import { IconButton } from '@montage-ui/core';

        <IconButton aria-label="close" />
      `,
    },
    {
      code: `
        import { Chip } from '@montage-ui/core';

        <Chip iconOnly aria-label="close" />
      `,
    },
    {
      code: `
        import { Chip } from '@montage-ui/core';

        <Chip iconOnly={false} />
      `,
    },
    {
      code: `
        import { Chip } from '@montage-ui/core';

        <Chip />
      `,
    },
    {
      code: `
        import { TopNavigationButton } from '@montage-ui/core';

        <TopNavigationButton aria-label="close" />
      `,
    },
  ],
  invalid: [
    {
      code: `
        import * as montage from '@montage-ui/core';

        <montage.IconButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { IconButton } from '@montage-ui/core';

        <IconButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { Button } from '@montage-ui/core';

        <Button iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { ActionAreaButton } from '@montage-ui/core';

        <ActionAreaButton iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { FallbackViewActionAreaButton } from '@montage-ui/core';

        <FallbackViewActionAreaButton iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { ModalNavigationButton } from '@montage-ui/core';

        <ModalNavigationButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { TopNavigationButton } from '@montage-ui/core';

        <TopNavigationButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { Chip } from '@montage-ui/core';

        <Chip iconOnly />
      `,
      errors: 1,
    },
  ],
});
