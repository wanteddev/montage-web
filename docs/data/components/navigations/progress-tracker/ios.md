---
title: Vertical progress tracker
description: 수직 방향으로 단계별 진행 상태를 표시하는 컴포넌트입니다.
---

## Vertical progress tracker

수직 방향으로 단계별 진행 상태를 표시하는 컴포넌트입니다.

```swift
@MainActor struct VerticalProgressTracker
```

### Overview

`Vertical`은 여러 단계로 구성된 프로세스의 진행 상태를 수직 레이아웃으로 표시합니다. 각 단계는 원형 아이콘과 수직선으로 연결되며, 완료된 단계는 체크 마크로 표시됩니다. 각 단계에 라벨과 추가 콘텐츠를 표시할 수 있어 풍부한 정보 제공이 가능합니다.

```swift
@State private var currentStep = 2

VerticalProgressTracker(
    progress: $currentStep,
    stepContents: [
        VerticalProgressTracker.StepContent(label: "기본 정보"),
        VerticalProgressTracker.StepContent(
            label: "상세 정보",
            contentView: { Text("내용을 입력해주세요") }
        ),
        VerticalProgressTracker.StepContent(label: "완료")
    ]
)
```

>  **Note**
>
> 각 단계에는 라벨 외에도 추가 콘텐츠를 표시할 수 있어 복잡한 단계별 정보를 표현하는 데 적합합니다.

### Topics

#### Structures

<details>

<summary>``struct StepContent``</summary>

수직 진행 추적기의 각 단계에 표시되는 콘텐츠 컴포넌트입니다.
##### Initializers

<details>

<summary>``init(label: String, labelAccessoryView: (() -> any View)?, contentView: (() -> any View)?)``</summary>

단계 콘텐츠를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `label` | 단계의 제목 텍스트 |
  | `labelAccessoryView` | 라벨 옆에 표시할 보조 뷰를 생성하는 클로저 |
  | `contentView` | 라벨 아래에 표시할 추가 콘텐츠 뷰를 생성하는 클로저 |
</details>

##### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

##### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

</details>

___
#### Initializers

<details>

<summary>``init(progress: Binding<Int>, stepContents: [StepContent])``</summary>

수직 진행 추적기를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `progress` | 현재 진행 중인 단계 (1부터 시작) |
  | `stepContents` | 각 단계의 콘텐츠 배열 |
</details>

___
#### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
#### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

### Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



## Horizontal progress tracker

수평 방향으로 단계별 진행 상태를 표시하는 컴포넌트입니다.

```swift
@MainActor struct HorizontalProgressTracker
```

### Overview

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

### Topics

#### Initializers

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
#### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
#### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

### Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



