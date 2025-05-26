---
title: Divider
description: 구획을 나누기 위해 사용되는 구분선 컴포넌트입니다.
---

```swift
@MainActor struct Divider
```

## Overview

이 컴포넌트는 UI 요소 간의 시각적 구분을 제공하기 위해 사용됩니다. 수직 또는 수평 방향으로 배치할 수 있으며, 두 가지 두께 변형을 지원합니다.

```swift
// 기본 수평 구분선
Divider(.horizontal)

// 두꺼운 수직 구분선
Divider(.vertical, variant: .thick)

// 스택 안에서 사용
VStack {
   Text("첫 번째 항목")
   Divider(.horizontal)
   Text("두 번째 항목")
}
```

## Topics

### Initializers

<details>

<summary>``init(Axis, variant: Variant)``</summary>

구분선 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `axis` | 구분선의 방향 (`.horizontal` 또는 `.vertical`) |
  | `variant` | 구분선의 두께 변형, 기본값은 `.normal` |
- **Return Value**

  구성된 구분선 인스턴스
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Enumerations

<details>

<summary>``enum Variant``</summary>

구분선의 두께 변형을 정의합니다.
#### Enumeration Cases

<details>

<summary>``case normal``</summary>

표준 두께
</details>
<details>

<summary>``case thick``</summary>

두꺼운 두께
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



