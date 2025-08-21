import { RuleTester } from 'eslint';

import iconButtonUsesNameRule from '.';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('icon-button-uses-name', iconButtonUsesNameRule, {
  valid: [
    {
      code: `
        import { IconButton } from '@wanteddev/wds';

        <IconButton name="close" />
      `,
    },
    {
      code: `
        import { Button } from '@wanteddev/wds';

        <Button iconOnly name="close" />
      `,
    },
    {
      code: `
        import { TopNavigationButton } from '@wanteddev/wds';

        <TopNavigationButton name="close" />
      `,
    },
    {
      code: `
        import { IconButton } from '@wanteddev/wds';

        <IconButton aria-label="close" />
      `,
    },
    {
      code: `
        import { Button } from '@wanteddev/wds';

        <Button iconOnly aria-label="close" />
      `,
    },
    {
      code: `
        import { TopNavigationButton } from '@wanteddev/wds';

        <TopNavigationButton aria-label="close" />
      `,
    },
  ],
  invalid: [
    {
      code: `
        import * as wds from '@wanteddev/wds';

        <wds.IconButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { IconButton } from '@wanteddev/wds';

        <IconButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { Button } from '@wanteddev/wds';

        <Button iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { ActionAreaButton } from '@wanteddev/wds';

        <ActionAreaButton iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { FallbackViewButton } from '@wanteddev/wds';

        <FallbackViewButton iconOnly />
      `,
      errors: 1,
    },
    {
      code: `
        import { ModalNavigationButton } from '@wanteddev/wds';

        <ModalNavigationButton />
      `,
      errors: 1,
    },
    {
      code: `
        import { TopNavigationButton } from '@wanteddev/wds';

        <TopNavigationButton />
      `,
      errors: 1,
    },
  ],
});
