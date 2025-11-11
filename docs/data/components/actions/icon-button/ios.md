---
title: Icon button
description: 다양한 스타일의 아이콘 버튼을 제공하는 컴포넌트입니다.
---

```swift
@MainActor struct IconButton
```

## Overview

아이콘만 표시하는 간결한 버튼으로, 여러 변형과 스타일을 지원합니다:

- 기본형(normal): 배경 없이 아이콘만 표시
- 배경형(background): 반투명 배경을 가진 아이콘
- 외곽선형(outlined): 테두리로 둘러싸인 아이콘
- 솔리드형(solid): 배경색이 채워진 아이콘

```swift
IconButton(
    variant: .default,
    icon: .arrowLeft,
    handler: { print("뒤로 가기 버튼 탭됨") }
)
```

## Topics

### Initializers

<details>

<summary>``init(variant: IconButton.Variant, icon: Icon, handler: (() -> Void)?)``</summary>


아이콘 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼의 외관 스타일, 기본값은 `.normal(size: 24)` |
  | `icon` | 표시할 아이콘 |
  | `handler` | 버튼 탭 시 실행할 핸들러 |
- **Return Value**

  구성된 아이콘 버튼 뷰
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

___
### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color) -> IconButton``</summary>


배경 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 설정할 색상 |
- **Return Value**

  수정된 IconButton 인스턴스
- **Discussion**
  >  **Note**
  >
  > Outlined, soild variant에서만 사용 가능합니다.

</details>
<details>

<summary>``func borderColor(SwiftUI.Color) -> IconButton``</summary>


테두리 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 설정할 색상 |
- **Return Value**

  수정된 IconButton 인스턴스
- **Discussion**
  >  **Note**
  >
  > Outlined 에서만 사용 가능합니다.

</details>
<details>

<summary>``func disable(Bool) -> IconButton``</summary>


버튼의 비활성화 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `value` | 비활성화 여부, true이면 버튼이 비활성화됩니다. |
- **Return Value**

  수정된 IconButton 인스턴스
</details>
<details>

<summary>``func iconColor(SwiftUI.Color) -> IconButton``</summary>


아이콘 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 설정할 색상 |
- **Return Value**

  수정된 IconButton 인스턴스
</details>
<details>

<summary>``func padding(CGFloat) -> IconButton``</summary>


버튼의 패딩을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `value` | 패딩 값 |
- **Return Value**

  수정된 IconButton 인스턴스
- **Discussion**
  >  **Note**
  >
  > Outlined, soild variant에서만 사용 가능합니다.

</details>
<details>

<summary>``func showPushBadge(Bool) -> IconButton``</summary>


푸시 뱃지 표시 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `value` | 푸시 뱃지 표시 여부 |
- **Return Value**

  수정된 IconButton 인스턴스
- **Discussion**
  >  **Note**
  >
  > Normal variant에서만 사용 가능합니다.

</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>


버튼 사이즈를 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case custom(size: Int)``</summary>


사용자 지정 크기

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 아이콘 크기 (픽셀) |
</details>
<details>

<summary>``case medium``</summary>


중간 크기
</details>
<details>

<summary>``case small``</summary>


작은 크기
</details>

</details>
<details>

<summary>``enum Variant``</summary>


버튼의 외관을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case background(size: Int, isAlternative: Bool)``</summary>


배경형 아이콘 버튼 - 반투명 배경을 가진 아이콘

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 아이콘 크기 (픽셀) |
  | `isAlternative` | 대체 스타일 사용 여부, 기본값은 `false` |
</details>
<details>

<summary>``case normal(size: Int)``</summary>


기본형 아이콘 버튼 - 배경 없이 아이콘만 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 아이콘 크기 (픽셀) |
</details>
<details>

<summary>``case outlined(size: Size)``</summary>


외곽선형 아이콘 버튼 - 테두리로 둘러싸인 아이콘

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 아이콘 크기 (Size 열거형) |
</details>
<details>

<summary>``case solid(size: Size)``</summary>


솔리드형 아이콘 버튼 - 배경색이 채워진 아이콘

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 아이콘 크기 (Size 열거형) |
</details>

</details>

___
## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



