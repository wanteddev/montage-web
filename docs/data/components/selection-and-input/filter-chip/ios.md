---
title: Filter chip
description: 필터링 기능을 제공하는 칩 컴포넌트입니다.
---

```swift
@MainActor struct FilterChip
```

## Overview

이 컴포넌트는 사용자가 항목을 필터링하는 데 사용할 수 있는 탭 가능한 UI 요소입니다. 다양한 크기와 스타일을 지원하며, 활성/비활성 상태를 표시할 수 있습니다.

```swift
FilterChip(
    variant: .solid,
    size: .medium,
    text: "카테고리",
    state: $state
)
.backgroundColor(.semantic(.primary))
.fontColor(.semantic(.staticWhite))
.active(true)
.activeLabel("최신순")
```

## Topics

### Initializers

<details>

<summary>``init(variant: Variant, size: Size, text: String, state: Binding<State>, handler: (() -> Void)?)``</summary>

필터 칩을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 칩의 외관 스타일, 기본값은 `.solid` |
  | `size` | 칩의 크기, 기본값은 `.medium` |
  | `text` | 칩에 표시할 텍스트 |
  | `state` | 칩의 확장 상태 바인딩, 기본값은 `.constant(.normal)` |
  | `handler` | 칩 클릭 시 실행할 핸들러, 기본값은 `nil` |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func active(Bool, label: String?) -> FilterChip``</summary>

칩의 활성화 상태와 레이블을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `active` | 활성화 여부 |
  | `label` | 활성화 상태일 때 표시할 레이블 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func activeColor(SwiftUI.Color) -> FilterChip``</summary>

칩의 활성화 상태 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 활성화 상태일 때의 색상 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func backgroundColor(SwiftUI.Color) -> FilterChip``</summary>

칩의 배경색을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 배경색 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func disabled(Bool) -> FilterChip``</summary>

칩의 비활성화 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func fontColor(SwiftUI.Color) -> FilterChip``</summary>

칩의 텍스트 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 텍스트 색상 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func iconColor(SwiftUI.Color) -> FilterChip``</summary>

아이콘의 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 아이콘에 적용할 색상 |
- **Return Value**

  수정된 칩 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.semantic(.labelAlternative)`입니다.

</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>

칩의 크기를 정의합니다.
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
<details>

<summary>``case xsmall``</summary>

가장 작은 크기
</details>

#### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations.md)

</details>
<details>

<summary>``enum State``</summary>

칩의 확장 상태를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case expand``</summary>

확장된 상태 (드롭다운 표시)
</details>
<details>

<summary>``case normal``</summary>

기본 상태
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum Variant``</summary>

칩의 외관을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case outlined``</summary>

테두리만 있는 아웃라인 스타일
</details>
<details>

<summary>``case solid``</summary>

배경색이 있는 실선 스타일
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



