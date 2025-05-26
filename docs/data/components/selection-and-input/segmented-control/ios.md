---
title: Segmented control
description: 여러 옵션 중 하나를 선택할 수 있는 세그먼트 컨트롤 컴포넌트입니다.
---

```swift
@MainActor struct SegmentedControl
```

## Overview

제한된 옵션 세트 내에서 선택할 수 있도록 하는 가로로 정렬된 버튼 그룹입니다. 각 세그먼트는 이미지와 텍스트를 포함할 수 있으며, 선택된 세그먼트는 시각적으로 강조됩니다.

```swift
@State private var selectedIndex = 0

// 텍스트만 있는 세그먼트 컨트롤
SegmentedControl(
    selectedIndex: $selectedIndex,
    labels: ["첫 번째", "두 번째", "세 번째"]
)

// 이미지와 텍스트가 모두 있는 세그먼트 컨트롤
SegmentedControl(
    selectedIndex: $selectedIndex,
    items: [
        .init(image: .montage(.home), title: "홈"),
        .init(image: .montage(.person), title: "프로필"),
        .init(title: "설정")
    ]
)
.variant(.outlined)
.size(.medium)
```

>  **Note**
>
> 기본 변형(.solid)은 배경이 있는 형태로, .outlined 변형은 테두리만 있는 형태로 표시됩니다.

## Topics

### Structures

<details>

<summary>``struct Item``</summary>

세그먼트 컨트롤의 항목을 나타내는 구조체입니다.
#### Initializers

<details>

<summary>``init(image: Image?, title: String)``</summary>

세그먼트 항목을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `image` | 표시할 이미지 (선택 사항) |
  | `title` | 표시할 텍스트 |
</details>

</details>

___
### Initializers

<details>

<summary>``init(selectedIndex: Binding<Int>, items: [Item], onSelect: ((Int) -> Void)?)``</summary>

항목 배열을 이용해 세그먼트 컨트롤을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `selectedIndex` | 현재 선택된 항목의 인덱스 바인딩 |
  | `items` | 표시할 항목 배열 |
  | `onSelect` | 항목 선택 시 호출될 클로저 (기본값: nil) |
</details>
<details>

<summary>``init(selectedIndex: Binding<Int>, labels: [String], onSelect: ((Int) -> Void)?)``</summary>

텍스트 배열을 이용해 세그먼트 컨트롤을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `selectedIndex` | 현재 선택된 항목의 인덱스 바인딩 |
  | `labels` | 표시할 텍스트 배열 |
  | `onSelect` | 항목 선택 시 호출될 클로저 (기본값: nil) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func size(Size) -> SegmentedControl``</summary>

세그먼트 컨트롤의 크기를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 적용할 크기 (.large, .medium, 또는 .small) |
- **Return Value**

  수정된 세그먼트 컨트롤 인스턴스
</details>
<details>

<summary>``func variant(Variant) -> SegmentedControl``</summary>

세그먼트 컨트롤의 시각적 스타일을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 적용할 스타일 (.solid 또는 .outlined) |
- **Return Value**

  수정된 세그먼트 컨트롤 인스턴스
</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>

세그먼트 컨트롤의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 크기
</details>
<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum Variant``</summary>

세그먼트 컨트롤의 시각적 스타일을 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case outlined``</summary>

테두리만 있는 스타일
</details>
<details>

<summary>``case solid``</summary>

배경이 채워진 스타일
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



