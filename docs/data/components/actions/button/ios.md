---
title: Button
description: 사용자가 상호작용할 수 있는 버튼 컴포넌트입니다.
---

```swift
@MainActor struct Button
```

## Overview

세 가지 스타일로 제공됩니다:

- `solid`: 색상이 채워진 버튼
- `outlined`: 테두리만 있는 버튼
- `text`: 텍스트만 있는 버튼

```swift
// 기본 솔리드 버튼
Button.solid(text: "확인", handler: { print("버튼 클릭") })

// 아웃라인 버튼
Button.outlined(variant: .primary, size: .medium, text: "취소")

// 텍스트 버튼
Button.text(text: "더보기", trailingIcon: .chevronRight)

// 아이콘 버튼
Button.solid(icon: .bell, handler: { print("알림 보기") })

// 로딩 상태 설정
Button.solid(text: "저장")
    .loading(true)
```

>  **Note**
>
> 버튼은 다양한 수정자(modifier)를 사용하여 모양과 동작을 커스터마이즈할 수 있습니다.

## Topics

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color?) -> Button``</summary>

버튼 배경색을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `backgroundColor` | 설정할 배경색 |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  Solid 스타일 버튼에 가장 효과적으로 적용됩니다.
</details>
<details>

<summary>``func borderColor(SwiftUI.Color?) -> Button``</summary>

버튼 테두리 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `borderColor` | 설정할 테두리 색상 |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  Outlined 스타일 버튼에 가장 효과적으로 적용됩니다.
</details>
<details>

<summary>``func contentColor(SwiftUI.Color?) -> Button``</summary>

버튼 콘텐츠(텍스트와 아이콘)의 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `contentColor` | 설정할 색상 |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**
</details>
<details>

<summary>``func disable(Bool) -> Button``</summary>

버튼을 비활성화 상태로 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부, 기본값은 `true` |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  비활성화된 버튼은 시각적으로 흐리게 표시되며 사용자 상호작용에 반응하지 않습니다.
</details>
<details>

<summary>``func fill(horizontal: Bool, vertical: Bool) -> Button``</summary>

버튼이 수평 또는 수직 방향으로 공간을 채우도록 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `fillHorizontal` | 수평 방향 채우기 여부, 기본값은 `false` |
  | `fillVertical` | 수직 방향 채우기 여부, 기본값은 `false` |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  버튼의 크기를 조절하여 컨테이너 뷰의 공간을 효율적으로 활용할 때 사용합니다.
</details>
<details>

<summary>``func fontVariant(Typography.Variant?) -> Button``</summary>

버튼 텍스트의 폰트 변형을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `fontVariant` | 설정할 폰트 변형 |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  텍스트의 크기와 스타일을 변경할 때 사용합니다.
</details>
<details>

<summary>``func fontWeight(Typography.Weight?) -> Button``</summary>

버튼 텍스트의 폰트 두께를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `fontWeight` | 설정할 폰트 두께 |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  텍스트의 강조를 조절할 때 사용합니다.
</details>
<details>

<summary>``func loading(Bool) -> Button``</summary>

버튼을 로딩 상태로 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `loading` | 로딩 상태 여부, 기본값은 `true` |
- **Return Value**

  수정된 버튼 인스턴스
- **Discussion**

  로딩 상태인 버튼은 내부 콘텐츠 대신 로딩 인디케이터를 표시하며 사용자 상호작용에 반응하지 않습니다. 비동기 작업이 진행 중일 때 사용자에게 피드백을 제공하는 데 유용합니다.
</details>

___
### Type Methods

<details>

<summary>``static func outlined(variant: Outlined.Variant, size: Outlined.Size, icon: Icon, handler: (() -> Void)?) -> Button``</summary>

Outlined 스타일의 아이콘 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형, 기본값은 `.primary` |
  | `size` | 버튼의 크기, 기본값은 `.large` |
  | `icon` | 버튼에 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 버튼 인스턴스
- **Discussion**

  테두리만 있는 스타일의 아이콘 버튼으로, 공간이 제한적이거나 보조적인 아이콘 액션에 적합합니다.
</details>
<details>

<summary>``static func outlined(variant: Outlined.Variant, size: Outlined.Size, text: String, leadingIcon: Icon?, trailingIcon: Icon?, handler: (() -> Void)?) -> Button``</summary>

Outlined 스타일의 텍스트 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형, 기본값은 `.primary` |
  | `size` | 버튼의 크기, 기본값은 `.large` |
  | `text` | 버튼에 표시할 텍스트 |
  | `leadingIcon` | 텍스트 앞에 표시할 아이콘 |
  | `trailingIcon` | 텍스트 뒤에 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 버튼 인스턴스
- **Discussion**

  테두리만 있는 스타일의 버튼으로, 보조 액션이나 덜 강조된 액션에 적합합니다.
</details>
<details>

<summary>``static func solid(variant: Solid.Variant, size: Solid.Size, icon: Icon, handler: (() -> Void)?) -> Button``</summary>

Solid 스타일의 아이콘 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형, 기본값은 `.primary` |
  | `size` | 버튼의 크기, 기본값은 `.large` |
  | `icon` | 버튼에 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 버튼 인스턴스
- **Discussion**

  배경색이 채워진 스타일의 아이콘 버튼으로, 공간이 제한적이거나 아이콘으로 충분히 의미가 전달될 때 사용합니다.
</details>
<details>

<summary>``static func solid(variant: Solid.Variant, size: Solid.Size, text: String, leadingIcon: Icon?, trailingIcon: Icon?, handler: (() -> Void)?) -> Button``</summary>

Solid 스타일의 텍스트 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형, 기본값은 `.primary` |
  | `size` | 버튼의 크기, 기본값은 `.large` |
  | `text` | 버튼에 표시할 텍스트 |
  | `leadingIcon` | 텍스트 앞에 표시할 아이콘 |
  | `trailingIcon` | 텍스트 뒤에 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 버튼 인스턴스
- **Discussion**

  배경색이 채워진 스타일의 버튼으로, 주요 액션이나 강조가 필요한 액션에 적합합니다.
</details>
<details>

<summary>``static func text(variant: Text.Variant, size: Text.Size, text: String, leadingIcon: Icon?, trailingIcon: Icon?, handler: (() -> Void)?) -> Button``</summary>

Text 스타일의 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 변형, 기본값은 `.primary` |
  | `size` | 버튼의 크기, 기본값은 `.medium` |
  | `text` | 버튼에 표시할 텍스트 |
  | `leadingIcon` | 텍스트 앞에 표시할 아이콘 |
  | `trailingIcon` | 텍스트 뒤에 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 버튼 인스턴스
- **Discussion**

  텍스트만 있는 스타일의 버튼으로, 가벼운 액션이나 링크 형태의 액션에 적합합니다.
</details>

___
### Enumerations

<details>

<summary>``enum Outlined``</summary>

Outlined 스타일 버튼과 관련된 타입을 정의합니다.
#### Enumerations

<details>

<summary>``enum Size``</summary>

Outlined 스타일 버튼의 크기를 정의합니다.
##### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 크기
</details>
<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>
<details>

<summary>``enum Variant``</summary>

Outlined 스타일 버튼의 변형을 정의합니다.
##### Enumeration Cases

<details>

<summary>``case assistive``</summary>

보조 스타일 - 중요도가 낮은 보조 액션에 사용
</details>
<details>

<summary>``case primary``</summary>

기본 강조 스타일 - 브랜드 컬러의 테두리를 사용
</details>
<details>

<summary>``case secondary``</summary>

보조 강조 스타일 - 브랜드 컬러보다 덜 강조된 스타일
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>

</details>
<details>

<summary>``enum Size``</summary>

버튼의 크기를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 크기
</details>
<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

#### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>
<details>

<summary>``enum Solid``</summary>

Solid 스타일 버튼과 관련된 타입을 정의합니다.
#### Enumerations

<details>

<summary>``enum Size``</summary>

Solid 스타일 버튼의 크기를 정의합니다.
##### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 크기
</details>
<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>
<details>

<summary>``enum Variant``</summary>

Solid 스타일 버튼의 변형을 정의합니다.
##### Enumeration Cases

<details>

<summary>``case assistive``</summary>

보조 스타일 - 중요도가 낮은 보조 액션에 사용
</details>
<details>

<summary>``case primary``</summary>

기본 강조 스타일 - 브랜드 컬러를 사용하는 가장 강조된 버튼
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>

</details>
<details>

<summary>``enum Text``</summary>

Text 스타일 버튼과 관련된 타입을 정의합니다.
#### Enumerations

<details>

<summary>``enum Size``</summary>

Text 스타일 버튼의 크기를 정의합니다.
##### Enumeration Cases

<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>
<details>

<summary>``enum Variant``</summary>

Text 스타일 버튼의 변형을 정의합니다.
##### Enumeration Cases

<details>

<summary>``case assistive``</summary>

보조 스타일 - 중요도가 낮은 텍스트 링크에 사용
</details>
<details>

<summary>``case primary``</summary>

기본 강조 스타일 - 브랜드 컬러를 텍스트에 사용
</details>

##### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

##### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>

</details>
<details>

<summary>``enum Variant``</summary>

버튼의 변형을 정의합니다.
#### Enumeration Cases

<details>

<summary>``case assistive``</summary>

보조 스타일 - 덜 중요한 액션에 사용
</details>
<details>

<summary>``case primary``</summary>

기본 강조 스타일 - 주요 액션에 사용
</details>
<details>

<summary>``case secondary``</summary>

보조 강조 스타일 - 보조 액션에 사용
</details>

#### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios/rawrepresentable-implementations)

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations)

[View Implementations](/docs/utilities/ios/view-implementations)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



