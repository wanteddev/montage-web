---
title: Content badge
description: 텍스트와 아이콘을 포함할 수 있는 뱃지 컴포넌트입니다.
---

```swift
@MainActor struct ContentBadge
```

## Overview

다양한 크기와 스타일, 색상을 제공하며 텍스트 앞뒤로 아이콘을 추가할 수 있습니다. 솔리드와 아웃라인 스타일을 지원합니다.

```swift
// 기본 솔리드 뱃지
ContentBadge(text: "New")

// 아웃라인 스타일 뱃지
ContentBadge(variant: .outlined, text: "Updated")
    .size(.medium)
    .colorStyle(.accent(SwiftUI.Color.blue))
    .leadingIcon(.check)
```

## Topics

### Initializers

<details>

<summary>``init(variant: Variant, text: String)``</summary>

ContentBadge를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 뱃지의 스타일 (solid 또는 outlined) |
  | `text` | 뱃지에 표시할 텍스트 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func colorStyle(ColorStyle) -> ContentBadge``</summary>

뱃지의 색상 스타일을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `colorStyle` | 색상 스타일 |
- **Return Value**

  변경된 색상 스타일이 적용된 ContentBadge
</details>
<details>

<summary>``func leadingIcon(Icon) -> ContentBadge``</summary>

뱃지 텍스트 앞에 표시될 아이콘을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `leadingIcon` | 선행 아이콘 |
- **Return Value**

  선행 아이콘이 추가된 ContentBadge
</details>
<details>

<summary>``func size(Size) -> ContentBadge``</summary>

뱃지의 크기를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 뱃지 크기 |
- **Return Value**

  변경된 크기가 적용된 ContentBadge
</details>
<details>

<summary>``func trailingIcon(Icon) -> ContentBadge``</summary>

뱃지 텍스트 뒤에 표시될 아이콘을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `trailingIcon` | 후행 아이콘 |
- **Return Value**

  후행 아이콘이 추가된 ContentBadge
</details>

___
### Enumerations

<details>

<summary>``enum ColorStyle``</summary>

뱃지의 색상을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case accent(SwiftUI.Color, background: SwiftUI.Color?)``</summary>

강조 색상 뱃지

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `contentColor` | 콘텐츠 색상 |
  | `background` | 배경 색상 (nil일 경우 contentColor의 투명도를 조절하여 사용) |
</details>
<details>

<summary>``case neutral(SwiftUI.Color?)``</summary>

중립 색상 뱃지

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `contentColor` | 콘텐츠 색상 (nil일 경우 기본 색상 사용) |
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Size``</summary>

뱃지의 사이즈를 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case medium``</summary>
</details>
<details>

<summary>``case small``</summary>
</details>
<details>

<summary>``case xsmall``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Variant``</summary>

뱃지의 외관을 결정하는 열거형 타입입니다.
#### Enumeration Cases

<details>

<summary>``case outlined``</summary>

테두리만 있는 뱃지
</details>
<details>

<summary>``case solid``</summary>

색상이 채워진 배경을 가진 뱃지
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



