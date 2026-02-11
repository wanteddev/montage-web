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
import { Test } from '@wanteddev/wds';

export const BasicTest = () => {
  return <Test />;
};
```

visual test의 경우 CI 단계에서 실행되는 결과와 로컬 환경에서 실행되는 결과가 다릅니다.

때문에 로컬에서는 `pnpm run test:visual --update` 로 테스트가 정상적으로 실행되는지만 확인하고
변경된 `tests/visual/__screenshots__` 는 커밋하지 않습니다.

`visual-test-update` Github Action을 실행하여 업데이트가 가능합니다.
