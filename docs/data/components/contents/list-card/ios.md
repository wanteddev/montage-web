---
title: List card
description: 썸네일과 콘텐츠를 수평으로 배치한 리스트 형태의 카드 컴포넌트입니다.
---

```swift
@MainActor struct ListCard
```

## Overview

썸네일 이미지와 텍스트 콘텐츠를 수평 방향으로 배치한 카드로, 리스트 항목으로 사용하기 적합합니다. 스켈레톤 로딩 상태를 지원하고 다양한 콘텐츠를 배치할 수 있습니다.

```swift
@State private var isLoading = false

ListCard(
    thumbnail: { Thumbnail(.image(Image("sample")), variant: .square) },
    skeleton: $isLoading,
    title: "리스트 카드 제목"
)
.caption("부제목")
.trailingContent { IconButton(icon: .arrowForward) }
```

>  **Note**
>
> 리스트 형태의 UI에 적합하며, 선택적으로 앞뒤에 추가 콘텐츠를 배치할 수 있습니다.

## Topics

### Initializers

<details>

<summary>``init(thumbnail: () -> Thumbnail, skeleton: Binding<Bool>, title: String)``</summary>

List 카드를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `thumbnail` | 카드에 표시할 썸네일 이미지 |
  | `skeleton` | 스켈레톤 로딩 상태 바인딩 |
  | `title` | 카드 제목으로 표시할 뷰 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func bottomContent((() -> any View)?) -> ListCard``</summary>

카드 하단에 표시할 콘텐츠를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 하단에 표시할 콘텐츠 뷰를 반환하는 클로저 |
- **Return Value**

  수정된 카드 인스턴스
</details>
<details>

<summary>``func caption(String?) -> ListCard``</summary>

카드의 캡션(부제목)을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `caption` | 표시할 캡션 문자열 |
- **Return Value**

  수정된 카드 인스턴스
</details>
<details>

<summary>``func extraCaption(String?) -> ListCard``</summary>

카드의 추가 캡션을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `extraCaption` | 표시할 추가 캡션 문자열 |
- **Return Value**

  수정된 카드 인스턴스
</details>
<details>

<summary>``func leadingContent((() -> any View)?) -> ListCard``</summary>

카드 왼쪽(썸네일 앞)에 표시할 콘텐츠를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 왼쪽에 표시할 콘텐츠 뷰를 반환하는 클로저 |
- **Return Value**

  수정된 카드 인스턴스
</details>
<details>

<summary>``func topContent((() -> any View)?) -> ListCard``</summary>

카드 상단에 표시할 콘텐츠를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 상단에 표시할 콘텐츠 뷰를 반환하는 클로저 |
- **Return Value**

  수정된 카드 인스턴스
</details>
<details>

<summary>``func trailingContent((() -> any View)?) -> ListCard``</summary>

카드 오른쪽에 표시할 콘텐츠를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 오른쪽에 표시할 콘텐츠 뷰를 반환하는 클로저 |
- **Return Value**

  수정된 카드 인스턴스
</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



