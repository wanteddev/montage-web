---
title: Modal navigation
description: 모달 내에서 사용하는 내비게이션 바 컴포넌트입니다.
---

```swift
@MainActor struct ModalNavigation
```

## Overview

모달 상단에 제목, 뒤로가기 버튼, 추가 버튼 등을 포함하는 내비게이션 바를 제공합니다. 스크롤에 따라 배경 불투명도가 자동으로 조절되며 다양한 스타일을 지원합니다.

```swift
ModalNavigation(title: "제목")
    .variant(.normal)
    .leadingButton(.back {
        // 뒤로가기 동작
    })
    .trailingButtons([
        .icon(.close, action: {
            // 닫기 동작
        })
    ])
```

## Topics

### Initializers

<details>

<summary>``init(title: String, scrollOffset: Binding<CGFloat>)``</summary>

내비게이션 바를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `title` | 내비게이션 바에 표시할 제목 |
  | `scrollOffset` | 스크롤 오프셋에 대한 바인딩 (기본값: .constant(0)) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color) -> ModalNavigation``</summary>

내비게이션 바의 배경색을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `backgroundColor` | 배경색 |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>
<details>

<summary>``func leadingButton(TopNavigation.Resource.LeadingButtonInfo?) -> ModalNavigation``</summary>

내비게이션 바의 왼쪽 버튼을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `leadingButton` | 왼쪽 버튼 설정 |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>
<details>

<summary>``func needHandleArea(Bool) -> ModalNavigation``</summary>

바텀 시트의 핸들 영역 필요 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `needHandleArea` | 핸들 영역 필요 여부 |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>
<details>

<summary>``func scrollOffset(Binding<CGFloat>) -> ModalNavigation``</summary>

스크롤 오프셋을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `scrollOffset` | 스크롤 오프셋에 대한 바인딩 |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>
<details>

<summary>``func trailingButtons([TopNavigation.Resource.TrailingButtonInfo]) -> ModalNavigation``</summary>

내비게이션 바의 오른쪽 버튼들을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `actions` | 오른쪽 버튼 배열 (최대 3개까지 표시) |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>
<details>

<summary>``func variant(Variant) -> ModalNavigation``</summary>

내비게이션 바의 스타일을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 내비게이션 바 스타일 |
- **Return Value**

  수정된 내비게이션 바 뷰
</details>

___
### Enumerations

<details>

<summary>``enum Variant``</summary>

내비게이션 바의 외관을 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case emphasized``</summary>

강조된 큰 제목 스타일
</details>
<details>

<summary>``case extended``</summary>

제목이 별도 줄에 표시되는 확장된 스타일
</details>
<details>

<summary>``case floating(alternative: Bool, background: Bool)``</summary>

배경이 투명한 플로팅 스타일

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `alternative` | 대체 아이콘 사용 여부 (기본값: false) |
  | `background` | 배경 표시 여부 (기본값: true) |
</details>
<details>

<summary>``case normal``</summary>

기본 스타일의 내비게이션 바
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



