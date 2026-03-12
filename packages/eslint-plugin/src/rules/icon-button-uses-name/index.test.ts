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

        <IconButton name="close" />
      `,
    },
    {
      code: `
        import { Button } from '@montage-ui/core';

        <Button iconOnly name="close" />
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
        import { TopNavigationButton } from '@montage-ui/core';

        <TopNavigationButton name="close" />
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
        import { Button } from '@montage-ui/core';

        <Button iconOnly aria-label="close" />
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
        import * as wds from '@montage-ui/core';

        <wds.IconButton />
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
        import { FallbackViewButton } from '@montage-ui/core';

        <FallbackViewButton iconOnly />
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
  ],
});
