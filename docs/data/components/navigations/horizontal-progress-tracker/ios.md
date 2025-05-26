---
title: Horizontal progress tracker
description: 수평 방향으로 단계별 진행 상태를 표시하는 컴포넌트입니다.
---

```swift
@MainActor struct HorizontalProgressTracker
```

## Overview

`Horizontal`은 여러 단계로 구성된 프로세스의 진행 상태를 수평 레이아웃으로 표시합니다. 각 단계는 원형 아이콘과 선으로 연결되며, 완료된 단계는 체크 마크로 표시됩니다. 각 단계에 라벨을 추가하여 단계의 의미를 명확히 전달할 수 있습니다.

```swift
@State private var currentStep = 2

HorizontalProgressTracker(
    progress: $currentStep,
    labels: ["회원 정보", "배송지 정보", "결제 정보", "주문 완료"]
)
```

>  **Note**
>
> 현재 단계는 강조 표시되며, 이전 단계는 완료 상태로, 이후 단계는 비활성 상태로 표시됩니다.

## Topics

### Initializers

<details>

<summary>``init(progress: Binding<Int>, count: Int)``</summary>

라벨 없는 수평 진행 추적기를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `progress` | 현재 진행 중인 단계 (1부터 시작) |
  | `count` | 전체 단계 수 |
</details>
<details>

<summary>``init(progress: Binding<Int>, labels: [String])``</summary>

수평 진행 추적기를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `progress` | 현재 진행 중인 단계 (1부터 시작) |
  | `labels` | 각 단계의 라벨 텍스트 배열 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



