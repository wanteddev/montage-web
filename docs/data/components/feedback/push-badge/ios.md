---
title: Push badge
description: 푸시 알림이나 알림 표시를 위한 뱃지 컴포넌트입니다.
---

```swift
@MainActor struct PushBadge
```

## Overview

작은 점, ‘N’ 표시, 또는 숫자를 표시할 수 있으며 다양한 크기와 위치를 지원합니다. 주로 아이콘이나 버튼 주변에 새로운 알림이나 메시지가 있음을 나타내기 위해 사용됩니다.

```swift
// 기본 점 형태 뱃지
PushBadge(variant: .dot)

// 'N' 표시 뱃지
PushBadge(variant: .new)
    .size(.small)

// 숫자 표시 뱃지
PushBadge(variant: .number(5))
    .backgroundColor(.red)
```

## Topics

### Initializers

<details>

<summary>``init(variant: Variant)``</summary>

PushBadge를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 뱃지의 표시 형태 (dot, new, number) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color) -> PushBadge``</summary>

배경 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 배경 색상 |
- **Return Value**

  배경 색상이 변경된 PushBadge
</details>
<details>

<summary>``func fontColor(SwiftUI.Color) -> PushBadge``</summary>

텍스트 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 텍스트 색상 |
- **Return Value**

  텍스트 색상이 변경된 PushBadge
</details>
<details>

<summary>``func size(Size) -> PushBadge``</summary>

뱃지의 크기를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 뱃지 크기 |
- **Return Value**

  크기가 변경된 PushBadge
</details>

___
### Enumerations

<details>

<summary>``enum Position``</summary>

뱃지의 위치를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case bottom(HorizontalPosition)``</summary>

하단 위치

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `horizontalPosition` | 수평 위치 (기본값: center) |
</details>
<details>

<summary>``case center(HorizontalPosition)``</summary>

중앙 위치

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `horizontalPosition` | 수평 위치 (기본값: center) |
</details>
<details>

<summary>``case top(HorizontalPosition)``</summary>

상단 위치

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `horizontalPosition` | 수평 위치 (기본값: center) |
</details>

#### Enumerations

<details>

<summary>``enum HorizontalPosition``</summary>

수평 위치를 정의하는 열거형입니다.
##### Enumeration Cases

<details>

<summary>``case center``</summary>

중앙 정렬
</details>
<details>

<summary>``case leading``</summary>

좌측 정렬
</details>
<details>

<summary>``case trailing``</summary>

우측 정렬
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>

</details>
<details>

<summary>``enum Size``</summary>

뱃지의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case medium``</summary>

큰 크기
</details>
<details>

<summary>``case small``</summary>

중간 크기
</details>
<details>

<summary>``case xsmall``</summary>

가장 작은 크기
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Variant``</summary>

뱃지의 표시 형태를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case dot``</summary>

작은 점 형태의 뱃지
</details>
<details>

<summary>``case new``</summary>

‘N’ 문자를 표시하는 뱃지
</details>
<details>

<summary>``case number(Int)``</summary>

특정 숫자를 표시하는 뱃지
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



