---
title: Accordion
description: 접을 수 있는 컨텐츠를 제공하는 아코디언 컴포넌트입니다.
---

```swift
@MainActor struct Accordion
```

## Overview

`Accordion`은 제목과 함께 접을 수 있는 컨텐츠를 제공하는 컴포넌트입니다. 제목을 탭하면 컨텐츠가 확장되거나 축소됩니다. 설명 텍스트와 커스텀 컨텐츠를 함께 표시할 수 있습니다.

아코디언은 제한된 공간에서 많은 정보를 효율적으로 표시하기 위한 UI 패턴입니다. 사용자는 관심 있는 항목만 확장하여 볼 수 있습니다.

```swift
// 기본 사용법
Accordion(
    title: "아코디언 제목",
    description: "아코디언 설명 텍스트입니다."
)

// 커스텀 컨텐츠 추가
Accordion(
    title: "커스텀 컨텐츠",
    description: "설명 텍스트"
) {
    VStack(alignment: .leading, spacing: 8) {
        Text("커스텀 컨텐츠 1")
        Text("커스텀 컨텐츠 2")
    }
}

// 스타일 커스터마이징
Accordion(title: "커스텀 스타일")
    .title(.headline, weight: .semibold, color: .red)
    .verticalPadding(.small)
    .leadingIcon(.info)
    .fillWidth()
```

>  **Note**
>
> 아코디언은 기본적으로 하단에 구분선을 갖고 있으며, `hideDivider()` 수정자를 통해 제거할 수 있습니다.

## Topics

### Initializers

<details>

<summary>``init(title: String, description: String?, content: (() -> any View)?)``</summary>

아코디언을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `title` | 아코디언의 제목 |
  | `description` | 확장 시 표시될 설명 텍스트 (선택 사항) |
  | `content` | 확장 시 표시될 커스텀 컨텐츠 뷰 (선택 사항) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func description(Typography.Variant, weight: Typography.Weight, color: SwiftUI.Color) -> Accordion``</summary>

설명 텍스트의 타이포그래피 속성을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 (기본값: .label1) |
  | `weight` | 텍스트 굵기 (기본값: .regular) |
  | `color` | 텍스트 색상 (기본값: .semantic(.labelNeutral)) |
- **Return Value**

  수정된 아코디언 인스턴스
</details>
<details>

<summary>``func fillWidth(Bool) -> Accordion``</summary>

아코디언이 부모 컨테이너의 너비를 채우도록 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `fillWidth` | 너비를 채울지 여부 |
- **Return Value**

  수정된 아코디언 인스턴스
- **Discussion**

  이 수정자를 적용하면 좌우 20pt의 여백이 추가됩니다.
</details>
<details>

<summary>``func hideDivider(Bool) -> Accordion``</summary>

아코디언 하단의 구분선을 숨깁니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `hideDivider` | 구분선을 숨길지 여부 (기본값: `true`) |
- **Return Value**

  수정된 아코디언 인스턴스
</details>
<details>

<summary>``func leadingIcon(Icon?, color: SwiftUI.Color?) -> Accordion``</summary>

아코디언 제목 앞에 아이콘을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `leadingIcon` | 표시할 아이콘 |
  | `color` | 아이콘 색상 (기본값: nil - 기본 색상 사용) |
- **Return Value**

  수정된 아코디언 인스턴스
</details>
<details>

<summary>``func title(Typography.Variant, weight: Typography.Weight, color: SwiftUI.Color) -> Accordion``</summary>

타이틀 텍스트의 타이포그래피 속성을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 (기본값: .body2) |
  | `weight` | 텍스트 굵기 (기본값: .bold) |
  | `color` | 텍스트 색상 (기본값: .semantic(.labelNormal)) |
- **Return Value**

  수정된 아코디언 인스턴스
</details>
<details>

<summary>``func trailingContent((() -> any View)?) -> Accordion``</summary>

아코디언 헤더 우측에 커스텀 컨텐츠를 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `trailingContent` | 표시할 커스텀 컨텐츠 뷰 |
- **Return Value**

  수정된 아코디언 인스턴스
- **Discussion**

  이 수정자를 사용하면 기본 화살표 아이콘이 대체됩니다.
</details>
<details>

<summary>``func verticalPadding(VerticalPadding) -> Accordion``</summary>

아코디언 헤더의 상하 여백 크기를 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `verticalPadding` | 상하 여백 크기 (기본값: .large) |
- **Return Value**

  수정된 아코디언 인스턴스
</details>

___
### Enumerations

<details>

<summary>``enum VerticalPadding``</summary>

아코디언의 상하 여백을 나타내는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>

넓은 여백
</details>
<details>

<summary>``case medium``</summary>

중간 여백
</details>
<details>

<summary>``case small``</summary>

좁은 여백
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



