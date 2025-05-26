---
title: Select
description:   컴포넌트는 사용자가 드롭다운 메뉴에서 하나 또는 여러 항목을 선택할 수 있는 UI 요소입니다.   단일 선택 또는 다중 선택 모드를 지원하며, 여러 시각적 변형과 맞춤 설정 옵션을 제공합니다.
---

```swift
@MainActor struct Select
```

## Overview

```swift
@State private var items = [
    .init(text: "Option 1"),
    .init(text: "Option 2"),
    .init(text: "Option 3")
]

Select(
    variant: .single(.checkmark, nil),
    placeholder: "선택하세요",
    items: $items
)
```

## Topics

### Structures

<details>

<summary>``struct Item``</summary>

Select 컴포넌트에서 사용하는 항목 모델을 정의합니다.
#### Initializers

<details>

<summary>``init(text: String, icon: Icon?, isNegative: Bool, isSelected: Bool)``</summary>

아이템 초기화

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `text` | 아이템 텍스트 |
  | `icon` | 아이템 아이콘 (기본값: nil) |
  | `isNegative` | 부정적 상태 여부 (기본값: false) |
  | `isSelected` | 선택 여부 (기본값: false) |
</details>

#### Instance Properties

<details>

<summary>``let icon: Icon?``</summary>

아이템의 아이콘 (선택 사항)
</details>
<details>

<summary>``let isNegative: Bool``</summary>

부정적 상태 여부 (오류나 경고를 나타낼 때 사용)
</details>
<details>

<summary>``var isSelected: Bool``</summary>

항목의 선택 여부
</details>
<details>

<summary>``let text: String``</summary>

아이템 텍스트 내용
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>

___
### Initializers

<details>

<summary>``init(menuPresented: Binding<Bool>?, variant: Variant, items: Binding<[Item]>, onTapItem: ((Select.Item) -> Void)?)``</summary>

Select 컴포넌트 초기화

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `menuPresented` | 메뉴 표시 상태 바인딩 (기본값: nil) |
  | `variant` | 컴포넌트의 시각적/기능적 변형 |
  | `items` | 선택 가능한 항목 배열 (바인딩) |
  | `onTapItem` | 항목 선택 시 호출되는 클로저 (기본값: nil) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func description(String) -> Select``</summary>

설명을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `description` | 표시할 설명 텍스트 |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func disable(Bool) -> Select``</summary>

활성화 여부를 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부 (기본값: true) |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func heading(String) -> Select``</summary>

제목을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `heading` | 표시할 제목 텍스트 |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func leadingContent(LeadingContent?) -> Select``</summary>

왼쪽 컨텐츠를 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 선행 콘텐츠 |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func menuResize(BottomSheetModal.Resize) -> Select``</summary>

메뉴의 높이 detent를 지정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `menuResize` | 메뉴 크기 조정 방식 |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func negative(Bool) -> Select``</summary>

negative 상태 여부를 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `negative` | 부정적 상태 여부 (기본값: true) |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func placeholder(String) -> Select``</summary>

선택된 항목들이 없는 경우 placeholder를 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `placeholder` | 표시할 플레이스홀더 텍스트 |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func requiredBadge(Bool) -> Select``</summary>

필수 표시 노출 여부를 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `requiredBadge` | 필수 표시 여부 (기본값: true) |
- **Return Value**

  수정된 Select 인스턴스
</details>
<details>

<summary>``func shadowBackgroundColor(SwiftUI.Color) -> Select``</summary>

shadow 배경색을 조정합니다. 기본값은 systemBackgroundColor 입니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `shadowBackgroundColor` | 설정할 배경색 |
- **Return Value**

  수정된 Select 인스턴스
</details>

___
### Enumerations

<details>

<summary>``enum LeadingContent``</summary>

왼쪽에 표시될 컨텐트 타입입니다.
#### Enumeration Cases

<details>

<summary>``case custom(() -> any View)``</summary>

사용자 정의 뷰 표시
</details>
<details>

<summary>``case icon(Icon)``</summary>

아이콘 표시
</details>
<details>

<summary>``case iconButton(IconButton)``</summary>

아이콘 버튼 표시
</details>

</details>
<details>

<summary>``enum Render``</summary>

variant가 multiple일 때 컴포넌트에 표시될 내용의 형태를 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case chip``</summary>

선택된 항목을 칩(chip) 형태로 표시
</details>
<details>

<summary>``case text``</summary>

선택된 항목 텍스트만 표시
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum SingleSelectionType``</summary>

variant가 single일 때 아이템 선택 창에 아이템이 표시되는 방식을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case checkmark``</summary>

체크마크로 선택 표시
</details>
<details>

<summary>``case radio``</summary>

라디오 버튼으로 선택 표시
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum Variant``</summary>

다중 선택 가능여부를 나타내는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case multiple(render: Render, overflow: Bool, menuPrimaryButtonTitle: String)``</summary>

다중 선택 모드

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `render` | 선택된 항목 표시 방식 (텍스트 또는 칩), 기본값은 .text |
  | `overflow` | 선택된 항목이 여러 줄로 표시되는지 여부, 기본값은 false |
  | `menuPrimaryButtonTitle` | 확인 버튼 제목 |
</details>
<details>

<summary>``case single(selectionType: SingleSelectionType, menuPrimaryButtonTitle: String?)``</summary>

단일 선택 모드

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `selectionType` | 선택 표시 방식 (체크마크 또는 라디오 버튼), 기본값은 .radio |
  | `menuPrimaryButtonTitle` | 확인 버튼 제목 (nil일 경우 버튼 표시 안 함) |
</details>

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



