---
title: Top navigation
description: 상단에 표시되는 내비게이션 바 컴포넌트입니다.
---

```swift
@MainActor struct TopNavigation
```

## Overview

제목, 뒤로가기 버튼, 추가 액션 버튼 등을 포함할 수 있으며, 다양한 외관 스타일을 지원합니다. 스크롤 시 배경색과 구분선의 불투명도가 자동으로 조절됩니다.

```swift
TopNavigation(
    variant: .normal,
    title: "제목",
    leadingButton: .back {
        // 뒤로가기 동작
    },
    trailingButtons: [
        .icon(.search) {
            // 검색 동작
        }
    ]
)
```

## Topics

### Initializers

<details>

<summary>``init(variant: Variant, title: String, scrollOffset: CGFloat, backgroundColorResolvable: ColorResolvable?, leadingButton: Resource.LeadingButtonInfo?, trailingButtons: [Resource.TrailingButtonInfo])``</summary>

TopNavigation을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 내비게이션 바의 외관 스타일 |
  | `title` | 표시할 제목 |
  | `scrollOffset` | 스크롤 오프셋 값 |
  | `backgroundColorResolvable` | 배경색 리졸버 |
  | `leadingButton` | 좌측에 표시할 버튼 |
  | `trailingButtons` | 우측에 표시할 버튼 배열 (최대 3개까지 표시) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Enumerations

<details>

<summary>``enum Resource``</summary>

TopNavigation의 좌/우에 표시될 Resource들의 Namespace입니다.
#### Enumerations

<details>

<summary>``enum LeadingButtonInfo``</summary>

TopNavigation의 좌측에 표시될 내용들의 열거형입니다.
##### Enumeration Cases

<details>

<summary>``case back(action: () -> Void)``</summary>

뒤로가기 버튼
- **Discussion**
</details>
<details>

<summary>``case icon(Icon, action: () -> Void)``</summary>

아이콘 버튼
- **Discussion**
</details>
<details>

<summary>``case text(String, action: () -> Void)``</summary>

텍스트 버튼
- **Discussion**
</details>

</details>
<details>

<summary>``enum TrailingButtonInfo``</summary>

TopNavigation의 우측에 표시될 내용들의 열거형입니다.
##### Operators

<details>

<summary>``static func == (TopNavigation.Resource.TrailingButtonInfo, TopNavigation.Resource.TrailingButtonInfo) -> Bool``</summary>
</details>

##### Enumeration Cases

<details>

<summary>``case icon(Icon, disable: Bool, showPushBadge: Bool, action: () -> Void)``</summary>

icon 형태의 Action입니다.
- **Discussion**
</details>
<details>

<summary>``case text(String, disable: Bool, action: () -> Void)``</summary>

text 형태의 Action입니다.
- **Discussion**
</details>

##### Instance Methods

<details>

<summary>``func hash(into: inout Hasher)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>

</details>
<details>

<summary>``enum Variant``</summary>

TopNavigation의 외관을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case extended``</summary>

확장된 내비게이션 바 스타일 (제목이 별도의 줄에 표시됨)
</details>
<details>

<summary>``case floating(alternative: Bool, background: Bool)``</summary>

플로팅 스타일의 내비게이션 바

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `alternative` | 대체 색상 사용 여부 |
  | `background` | 배경색 적용 여부 |
</details>
<details>

<summary>``case normal``</summary>

기본 내비게이션 바 스타일
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



