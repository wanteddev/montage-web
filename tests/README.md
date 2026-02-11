# Tests

You can find instructions on how to write tests in this document.

[English](./README.md) | [한국어](./README.ko.md)

There is no need to write commonjs tests or tree-shaking tests separately.
We recommend writing only unit tests and visual tests.

## Unit test

Unit tests should be written as `*/index.test.(ts|tsx)` inside `packages/*/src/`.

Use `testing-library/react` to write unit tests.

```tsx
import { cleanup } from '@testing-library/react';

describe('given situation', () => {
  afterEach(() => {
    cleanup();
  });

  it('expected result', () => {});
});
```

Write test cases with a given situation and an expected result.

Also, for design system components, it is recommended to include accessibility tests.

```tsx
import { axe } from 'vitest-axe';
import { cleanup, render, screen } from '@testing-library/react';

describe('...', () => {
  it('should pass accessibility tests', async () => {
    const { container } = render(<Test />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

You can run unit tests with `pnpm run test:unit` or `pnpm run test:unit:watch`.

## Visual test

Create a file named `ComponentName.tsx` in `tests/visual/src/fixtures`.

Then, write `export const ${TestCase}` as shown in the code below.

```tsx
// example
import { Test } from '@wanteddev/wds';

export const BasicTest = () => {
  return <Test />;
};
```

Visual test results may differ between the CI environment and the local environment.

Therefore, on local, just verify that the tests run successfully with `pnpm run test:visual --update`
and do not commit the changed `tests/visual/__screenshots__`.

You can update screenshots by running the `visual-test-update` Github Action.
