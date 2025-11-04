---
title: Action chip
description: 액션 칩 컴포넌트입니다.
---

```swift
@MainActor struct ActionChip
```

## Overview

텍스트와 이미지를 포함하는 칩 형태의 버튼입니다. 다양한 크기와 스타일을 지원하며, 탭 이벤트를 처리할 수 있습니다.

```swift
ActionChip(
    variant: .solid,
    size: .medium,
    text: "액션"
)
.backgroundColor(.semantic(.primaryNormal))
.fontColor(.semantic(.staticWhite))
.leadingImage(Image(systemName: "heart"))
```

>  **Note**
>
> 기본적으로 8pt의 패딩과 12pt의 모서리 반경을 가집니다.

## Topics

### Initializers

<details>

<summary>``init(variant: Variant, size: Size, text: String, handler: (() -> Void)?)``</summary>

액션 칩을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 칩의 외관 스타일, 기본값은 `.solid` |
  | `size` | 칩의 크기, 기본값은 `.medium` |
  | `text` | 칩에 표시할 텍스트 |
  | `handler` | 칩 클릭 시 실행할 핸들러, 기본값은 `nil` |
- **Return Value**

  구성된 액션 칩 인스턴스
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>
<details>

<summary>``let handler: (() -> Void)?``</summary>
</details>
<details>

<summary>``let size: Size``</summary>
</details>
<details>

<summary>``let text: String``</summary>
</details>
<details>

<summary>``let variant: Variant``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func active(Bool) -> ActionChip``</summary>

칩의 선택 상태를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `active` | 선택 상태 여부 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func activeColor(SwiftUI.Color) -> ActionChip``</summary>

칩의 활성화 상태 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 활성화 상태일 때의 색상 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func backgroundColor(SwiftUI.Color) -> ActionChip``</summary>

칩의 배경색을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 배경색 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func disabled(Bool) -> ActionChip``</summary>

칩의 비활성화 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func fontColor(SwiftUI.Color) -> ActionChip``</summary>

칩의 텍스트 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 텍스트 색상 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func imageColor(SwiftUI.Color) -> ActionChip``</summary>

이미지의 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 이미지에 적용할 색상 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func leadingImage(Image) -> ActionChip``</summary>

칩의 좌측에 이미지를 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `image` | 표시할 이미지 |
- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func trailingImage(Image) -> ActionChip``</summary>

칩의 우측에 이미지를 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `image` | 표시할 이미지 |
- **Return Value**

  수정된 칩 인스턴스
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


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios-utilities/rawrepresentable-implementations)

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


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



