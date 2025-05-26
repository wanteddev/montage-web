---
title: Text field
description: 단일 라인 텍스트 입력을 위한 컴포넌트입니다.
---

```swift
@MainActor struct TextField
```

## Overview

이 컴포넌트는 사용자가 텍스트를 입력할 수 있는 필드를 제공합니다. 제목, 아이콘, 자동완성, 상태 표시 등 다양한 기능을 지원합니다.

```swift
@State private var inputText = ""

// 기본 텍스트 필드
TextField(text: $inputText)
   .heading("이메일")
   .placeholder("이메일을 입력하세요")

// 아이콘이 있는 필수 입력 필드
TextField(text: $inputText)
   .heading("아이디")
   .requiredBadge(true)
   .icon(.person)
   .status(.negative(description: "올바른 아이디를 입력해주세요"))

// 오른쪽 버튼이 있는 텍스트 필드
TextField(text: $inputText)
   .trailingButton(
       .init(
           variant: .primary,
           title: "인증",
           handler: { verifyCode() }
       )
   )
```

## Topics

### Structures

<details>

<summary>``struct AutoCompletionDataSource``</summary>

텍스트 필드의 자동완성 기능을 위한 데이터 소스를 정의합니다.
#### Operators

<details>

<summary>``static func == (AutoCompletionDataSource, AutoCompletionDataSource) -> Bool``</summary>
</details>

#### Initializers

<details>

<summary>``init(numberOfSections: Int, sectionTitleAt: ((Int) -> String)?, numberOfItemsInSection: (Int) -> Int, cellForItemAt: (IndexPath) -> any View, headerView: (() -> any View)?, footerView: (() -> any View)?, maxHeight: CGFloat)``</summary>

자동완성 데이터 소스를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `numberOfSections` | 섹션 수, 기본값은 1 |
  | `sectionTitleAt` | 섹션 제목을 반환하는 클로저 |
  | `numberOfItemsInSection` | 각 섹션의 항목 수를 반환하는 클로저 |
  | `cellForItemAt` | 각 항목의 뷰를 반환하는 클로저 |
  | `headerView` | 헤더 뷰를 반환하는 클로저 |
  | `footerView` | 푸터 뷰를 반환하는 클로저 |
  | `maxHeight` | 자동완성 목록의 최대 높이, 기본값은 400 |
- **Return Value**

  구성된 자동완성 데이터 소스 인스턴스
</details>

#### Instance Properties

<details>

<summary>``var totalNumberOfItems: Int``</summary>

전체 항목 수를 반환합니다.
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``struct TrailingButtonInfo``</summary>

텍스트 필드의 오른쪽에 표시할 버튼의 속성을 정의합니다.
#### Initializers

<details>

<summary>``init(variant: Button.Outlined.Variant, title: String, handler: (() -> Void)?)``</summary>

트레일링 버튼을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형 스타일 |
  | `title` | 버튼에 표시할 텍스트 |
  | `handler` | 버튼 클릭 시 실행할 핸들러 |
- **Return Value**

  구성된 트레일링 버튼 인스턴스
</details>

</details>

___
### Initializers

<details>

<summary>``init(text: Binding<String>, autoCompletionDataSource: Binding<AutoCompletionDataSource?>)``</summary>

텍스트 필드를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `text` | 텍스트 필드의 값을 바인딩 |
  | `autoCompletionDataSource` | 자동완성 데이터 소스를 바인딩, 기본값은 nil |
- **Return Value**

  구성된 텍스트 필드 인스턴스
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color?) -> TextField``</summary>

텍스트 필드의 배경색을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 설정할 배경색 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func disable(Bool) -> TextField``</summary>

텍스트 필드의 활성화 상태를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부, `true`이면 비활성화 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func heading(String?) -> TextField``</summary>

텍스트 필드 위에 표시할 제목을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `heading` | 표시할 제목, nil이면 제목 표시 안함 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func icon(Icon?) -> TextField``</summary>

텍스트 필드 왼쪽에 표시할 아이콘을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func placeholder(String?) -> TextField``</summary>

텍스트 필드에 입력된 텍스트가 없을 때 표시할 플레이스홀더를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `placeholder` | 표시할 플레이스홀더 텍스트 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func requiredBadge(Bool) -> TextField``</summary>

제목 옆에 필수 입력을 나타내는 뱃지를 표시할지 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `requiredBadge` | 필수 입력 뱃지 표시 여부 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**
  >  **Note**
  >
  > 제목이 설정되지 않은 경우 뱃지가 표시되지 않습니다.

</details>
<details>

<summary>``func status(Status) -> TextField``</summary>

텍스트 필드의 상태를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `status` | 텍스트 필드의 상태 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func trailingButton(TrailingButtonInfo?) -> TextField``</summary>

텍스트 필드 오른쪽에 표시할 버튼을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `trailingButton` | 표시할 버튼의 속성 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**
  >  **Note**
  >
  > `trailingContent`와 함께 사용될 경우 `trailingButton`이 우선적으로 표시됩니다.

</details>
<details>

<summary>``func trailingContent((() -> any View)?) -> TextField``</summary>

텍스트 필드 오른쪽에 표시할 커스텀 콘텐츠를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `trailingContent` | 표시할 커스텀 콘텐츠를 생성하는 클로저 |
- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**
  >  **Note**
  >
  > `trailingButton`과 함께 사용하는 경우 `trailingContent`가 무시됩니다.

</details>

___
### Enumerations

<details>

<summary>``enum Status``</summary>

텍스트 필드의 상태를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case negative(description: String)``</summary>

오류 상태, 선택적으로 오류 설명 텍스트 포함 가능

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `description` | 오류 설명 텍스트, 기본값은 빈 문자열 |
</details>
<details>

<summary>``case normal(description: String)``</summary>

기본 상태, 선택적으로 설명 텍스트 포함 가능

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `description` | 설명 텍스트, 기본값은 빈 문자열 |
</details>
<details>

<summary>``case positive(description: String)``</summary>

유효한 입력 상태, 선택적으로 설명 텍스트 포함 가능

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `description` | 설명 텍스트, 기본값은 빈 문자열 |
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



