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
import { Button } from '@montage-ui/core';

export const BasicButton = () => {
  return <Button />;
};
```

Visual test results may differ between the CI environment and the local environment.

Therefore, on local, just verify that the tests run successfully with `pnpm run test:visual --update`
and do not commit the changed `tests/visual/__screenshots__`.

You can update screenshots by running the `visual-test-update` Github Action.

## E2E (interaction) test

Use E2E tests for behavior that depends on a **real browser** — pointer-events
hit-testing, z-index stacking, portals, and focus traps — which jsdom cannot
reproduce. The main use case is overlay dismissal: verifying that clicking a
dimmer closes only the topmost layer (modal / alert / popover / menu / select /
date·time picker, etc.) and that the stack closes one layer at a time.

E2E tests run in real Chromium via Vitest Browser Mode, so a browser binary is
required once:

```bash
pnpm exec playwright install chromium
```

Write tests as `tests/e2e/src/dismiss/*.test.tsx`. Globals are enabled, so there
is no need to import `describe` / `it` / `expect`. Render through the shared
`renderWithProvider` (it wraps `ThemeProvider`, which mounts `AlertArea` /
`RegionArea` so `useAlert`, snackbars and toasts work).

```tsx
import { cleanup } from '@testing-library/react';
import { Button, Modal, ModalContainer, ModalTrigger } from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

describe('modal', () => {
  it('closes on dimmer click', async () => {
    renderWithProvider(
      <Modal>
        <ModalTrigger>
          <Button data-testid="open">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="popup">{/* ... */}</ModalContainer>
      </Modal>,
    );

    await click(byTestId('open'));
    await expect.poll(openModalCount).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
```

Helpers live in `tests/e2e/src/helpers.tsx`:

- Open-state counters such as `openModalCount`, `openAlertCount`, `openTooltipCount`
  (they count `[role][data-status="open"]` / `[data-role][data-status="open"]`).
- `clickTopDimmer(dataRole)` clicks the exposed corner of the top-most dimmer
  with `{ force: true }`. `force` is required because `disableOutsidePointerEvents`
  makes the dimmer `pointer-events: none`; the real click lands on `<html>` and
  radix's document-level listener dismisses the top layer — exactly as for a
  real user. Plain `userEvent.click` on the dimmer would fail the actionability
  check.

Run with `pnpm run test:e2e` (or `pnpm -F @montage-ui/test-e2e test:watch`).
