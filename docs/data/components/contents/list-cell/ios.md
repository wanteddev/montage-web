---
title: List cell
description: 텍스트와 콘텐츠를 포함하는 리스트 아이템 컴포넌트입니다.
---

```swift
@MainActor struct ListCell
```

## Overview

`ListCell`은 앱 내에서 리스트 형태로 정보를 표시할 때 사용되는 기본 컴포넌트입니다. 타이틀, 부가 설명, 좌측 콘텐츠, 우측 콘텐츠 등을 포함할 수 있으며 다양한 스타일로 커스터마이징할 수 있습니다.

```swift
// 기본 셀
ListCell(title: "기본 셀")

// 추가 설명이 있는 셀
ListCell(title: "설명이 있는 셀")
    .caption("부가 설명 텍스트")

// 리딩 콘텐츠와 선택 상태의 셀
ListCell(title: "커스텀 셀", onTap: {
    print("셀이 탭되었습니다")
})
.leadingContent {
    Image.icon(.person)
        .frame(width: 24, height: 24)
}
.selected(true)
.chevron(true)
```

>  **Note**
>
> `ListCell`은 인터랙션 효과, 구분선, 강조 표시 등 다양한 시각적 요소를 지원합니다.

## Topics

### Initializers

<details>

<summary>``init(title: String, onTap: (() -> Void)?)``</summary>

셀 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `title` | 셀에 표시할 제목 텍스트 |
  | `onTap` | 셀을 탭했을 때 실행할 클로저 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func caption(String?) -> ListCell``</summary>

셀에 부가 설명(캡션)을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `caption` | 표시할 캡션 텍스트 (nil 설정 시 캡션 제거) |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  캡션은 타이틀 아래에 작은 글씨로 표시되는 부가 설명 텍스트입니다.
</details>
<details>

<summary>``func chevron(Bool) -> ListCell``</summary>

셀 우측에 화살표(chevron) 아이콘을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `chevron` | 화살표 표시 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  주로 탭했을 때 다른 화면으로 이동하는 셀에 사용됩니다.
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func disable(Bool) -> ListCell``</summary>

셀의 비활성화 상태를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  비활성화된 셀은 탭 이벤트를 받지 않으며, 시각적으로 흐리게 표시됩니다.
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func divider(Bool) -> ListCell``</summary>

셀 하단에 구분선을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `divider` | 구분선 표시 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func fillWidth(Bool) -> ListCell``</summary>

셀의 좌우 여백 사용 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `fillWidth` | 좌우 여백 적용 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  `true`로 설정하면 좌우 20포인트의 여백이 적용됩니다.
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func highlight(String) -> ListCell``</summary>

타이틀의 특정 텍스트를 강조 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `text` | 강조할 텍스트 문자열 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  지정한 문자열과 일치하는 부분을 굵은 글씨(bold)로 강조 표시합니다. 대소문자를 구분하지 않으며, 첫 번째로 일치하는 부분만 강조됩니다.
</details>
<details>

<summary>``func interactionPadding(CGFloat) -> ListCell``</summary>

셀의 인터랙션 효과 영역의 좌우 패딩을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `padding` | 적용할 패딩 값 (포인트 단위) |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 12입니다.

</details>
<details>

<summary>``func leadingContent<V>(() -> V) -> ListCell``</summary>

셀 좌측에 추가 콘텐츠를 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `contents` | 표시할 콘텐츠를 생성하는 클로저 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  아이콘, 이미지, 기타 커스텀 뷰 등을 셀 타이틀 앞에 배치할 수 있습니다.
</details>
<details>

<summary>``func selected(Bool) -> ListCell``</summary>

셀을 선택된 상태로 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `selected` | 선택 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  선택된 셀은 타이틀 텍스트의 색상이 `primaryNormal`로 변경되고, 텍스트 두께가 medium으로 설정됩니다. `trailingContent` 클로저의 파라미터로 선택된 상태 여부가 전달됩니다.
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func textEllipsis(Bool) -> ListCell``</summary>

타이틀 텍스트의 생략 처리 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `textEllipsis` | 텍스트 생략 처리 여부 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  `true`로 설정하면 타이틀 텍스트가 2줄로 제한되고, 초과 텍스트는 생략됩니다.
  >  **Note**
  >
  > 기본값은 `false`입니다. `false`인 경우 좌우 콘텐츠는 상단 정렬됩니다.

</details>
<details>

<summary>``func titleColor(Color.Semantic) -> ListCell``</summary>

타이틀 텍스트의    속성을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 텍스트 색상 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.labelNormal`입니다.

</details>
<details>

<summary>``func titleVariant(Typography.Variant) -> ListCell``</summary>

타이틀 텍스트의    속성을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 적용할 Typography 변형 스타일 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.body1`입니다.

</details>
<details>

<summary>``func titleWeight(Typography.Weight) -> ListCell``</summary>

타이틀 텍스트의    속성을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `weight` | 적용할 텍스트 두께 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.regular`입니다.

</details>
<details>

<summary>``func trailingContent<V>((Bool) -> V) -> ListCell``</summary>

셀 우측에 추가 콘텐츠를 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `contents` | 표시할 콘텐츠를 생성하는 클로저 (선택된 상태를 파라미터로 받음) |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  배지, 스위치, 토글 등 추가 UI 요소를 셀 타이틀 뒤에 배치할 수 있습니다. 클로저 파라미터를 통해 셀의 선택된 상태를 전달받을 수 있습니다.
</details>
<details>

<summary>``func verticalAlign(VerticalAlignment) -> ListCell``</summary>

셀 내 콘텐츠의 수직 정렬을 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `verticalAlignment` | 적용할 수직 정렬 방식 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.top`입니다.

</details>
<details>

<summary>``func verticalPadding(VerticalPadding) -> ListCell``</summary>

상하 여백의 크기를 조정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `verticalPadding` | 적용할 상하 여백 크기 |
- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.medium` 입니다.

</details>

___
### Enumerations

<details>

<summary>``enum VerticalPadding``</summary>

상하 여백을 나타내는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 여백 (16pt)
</details>
<details>

<summary>``case medium``</summary>

중간 여백 (12pt)
</details>
<details>

<summary>``case none``</summary>

여백 없음 (0pt)
</details>
<details>

<summary>``case small``</summary>

작은 여백 (8pt)
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



