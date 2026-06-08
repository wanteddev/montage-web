# Tests

테스트 작성법은 본 문서에서 확인하실 수 있습니다.

[English](./README.md) | [한국어](./README.ko.md)

commonjs test와 tree-shaking test는 추가로 작성할 필요가 없습니다.
unit test와 visual test만 작성하는 것을 권장합니다.

## Unit test

unit test의 경우 `packages/*/src/` 에 `*/index.test.(ts|tsx)` 로 작성합니다.

`testing-library/react` 를 이용하여 유닛 테스트를 작성합니다.

```tsx
import { cleanup } from '@testing-library/react';

describe('주어진 상황', () => {
  afterEach(() => {
    cleanup();
  });

  it('원하는 결과', () => {});
});
```

주어진 상황과, 원하는 결과로 테스트 케이스를 작성합니다.

또한, 디자인시스템 컴포넌트의 경우 접근성 테스트를 하는 것이 좋습니다.

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

유닛 테스트를 실행할 때에는 `pnpm run test:unit` 혹은 `pnpm run test:unit:watch` 로 실행할 수 있습니다.

## Visual test

`tests/visual/src/fixtures` 에 `컴포넌트명.tsx` 로 파일을 생성합니다.

그 이후 아래 코드처럼 `export const ${테스트케이스}` 로 작성하면 됩니다.

```tsx
// example
import { Button } from '@montage-ui/core';

export const BasicButton = () => {
  return <Button />;
};
```

visual test의 경우 CI 단계에서 실행되는 결과와 로컬 환경에서 실행되는 결과가 다릅니다.

때문에 로컬에서는 `pnpm run test:visual --update` 로 테스트가 정상적으로 실행되는지만 확인하고
변경된 `tests/visual/__screenshots__` 는 커밋하지 않습니다.

`visual-test-update` Github Action을 실행하여 업데이트가 가능합니다.

## E2E (interaction) test

jsdom으로는 재현할 수 없는 **실제 브라우저** 동작(pointer-events 히트테스트, z-index
스태킹, 포털, 포커스 트랩)에 의존하는 경우 E2E 테스트를 사용합니다. 대표 용례는 오버레이
dismiss 동작입니다 — dimmer를 클릭했을 때 최상단 레이어(modal / alert / popover / menu /
select / date·time picker 등)만 닫히고, 스택이 **한 번에 하나씩 순차적으로** 닫히는지 검증합니다.

E2E 테스트는 Vitest Browser Mode를 통해 실제 Chromium에서 실행되므로, 브라우저 바이너리를
한 번 설치해야 합니다:

```bash
pnpm exec playwright install chromium
```

테스트는 `tests/e2e/src/dismiss/*.test.tsx` 로 작성합니다. globals가 켜져 있어
`describe` / `it` / `expect` 를 import할 필요가 없습니다. 공용 `renderWithProvider` 로
렌더하세요(`ThemeProvider` 를 감싸며, `AlertArea` / `RegionArea` 가 마운트되어 `useAlert`,
스낵바, 토스트가 동작합니다).

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

helper는 `tests/e2e/src/helpers.tsx` 에 있습니다:

- `openModalCount`, `openAlertCount`, `openTooltipCount` 등 열린 상태 카운터
  (`[role][data-status="open"]` / `[data-role][data-status="open"]` 를 셉니다).
- `clickTopDimmer(dataRole)` 는 최상단 dimmer의 노출된 모서리를 `{ force: true }` 로
  클릭합니다. `disableOutsidePointerEvents` 때문에 dimmer가 `pointer-events: none` 이 되어
  실제 클릭은 `<html>` 에 떨어지고 radix의 document 리스너가 최상단만 dismiss하므로 —
  실제 사용자 클릭과 동일합니다 — `force` 가 필수입니다. dimmer에 대한 일반
  `userEvent.click` 은 actionability 검사에서 실패합니다.

`pnpm run test:e2e` (또는 `pnpm -F @montage-ui/test-e2e test:watch`) 로 실행합니다.
