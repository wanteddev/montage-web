---
title: Menu
description: 드롭다운이나 컨텍스트 메뉴로 사용할 수 있는 메뉴 컴포넌트입니다.
---

```swift
@MainActor struct Menu
```

## Overview

일반, 라디오 버튼, 체크박스 형태로 메뉴 항목을 표시할 수 있으며, 메뉴 하단에 추가 액션 영역을 포함할 수 있습니다.

```swift
// 기본 메뉴
@State private var items: [Menu.Item] = [
    .init(title: "항목 1"),
    .init(title: "항목 2"),
    .init(title: "항목 3")
]

Menu(
    variant: .normal,
    items: $items,
    onSelectCell: { item in
        print("선택된 항목: \(item.title)")
    }
)

// 라디오 메뉴 (단일 선택)
@State private var radioItems: [Menu.Item] = [
    .init(title: "옵션 1", isSelected: true),
    .init(title: "옵션 2"),
    .init(title: "옵션 3")
]

Menu(
    variant: .radio,
    items: $radioItems
)
```

## Topics

### Structures

<details>

<summary>``struct Item``</summary>

메뉴 항목의 데이터를 정의하는 구조체입니다.
#### Initializers

<details>

<summary>``init(title: String, isSelected: Bool)``</summary>

메뉴 항목을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `title` | 메뉴 항목에 표시될 텍스트 |
  | `isSelected` | 초기 선택 상태 (기본값: false) |
</details>

#### Instance Properties

<details>

<summary>``var isSelected: Bool``</summary>
</details>
<details>

<summary>``let title: String``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>

___
### Initializers

<details>

<summary>``init(variant: Variant, items: Binding<[Item]>, onSelectCell: ((Item) -> Void)?, cellModifier: (_ index: Int, _ cell: Cell) -> Cell)``</summary>

메뉴 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 메뉴의 표시 형태 (normal, radio, checkbox) |
  | `items` | 메뉴 항목 배열에 대한 바인딩 |
  | `onSelectCell` | 항목 선택 시 호출될 클로저 (선택 사항) |
  | `cellModifier` | 각 셀을 커스터마이징하기 위한 클로저 (기본값: 수정 없음) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func menuActionArea(leadingContent: () -> any View, trailingContent: () -> any View) -> Menu``</summary>

메뉴 하단에 액션 버튼 영역을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `leadingContent` | 왼쪽에 표시할 콘텐츠를 반환하는 클로저 |
  | `trailingContent` | 오른쪽에 표시할 콘텐츠를 반환하는 클로저 |
- **Return Value**

  액션 영역이 추가된 Menu
- **Discussion**

  왼쪽과 오른쪽에 버튼이나 다른 뷰를 배치할 수 있습니다.
</details>

___
### Enumerations

<details>

<summary>``enum Variant``</summary>

메뉴의 표시 형태를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case checkbox``</summary>

체크박스 형태, 다중 항목 선택 가능
</details>
<details>

<summary>``case normal``</summary>

기본 메뉴 형태, 선택 표시 없이 항목만 표시
</details>
<details>

<summary>``case radio``</summary>

라디오 버튼 형태, 단일 항목만 선택 가능
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



