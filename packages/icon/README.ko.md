# `@montage-ui/icon`

[English](./README.md) | [한국어](./README.ko.md)

Montage 디자인 시스템의 아이콘 컴포넌트 패키지입니다.

## 설치

```sh
pnpm i @montage-ui/icon
```

> **주의:** `@montage-ui/icon`은 다른 `@montage-ui/*` 패키지(예: `@montage-ui/core`)와 **동일한 버전**으로 설치해야 합니다. 버전이 일치하지 않으면 theme context가 중복 생성되어 예기치 않은 스타일 문제가 발생할 수 있습니다.

## 사용법

```tsx
import { IconCheck, IconClose } from '@montage-ui/icon';

const Example = () => (
  <>
    <IconCheck size={24} />
    <IconClose size={24} />
  </>
);
```
