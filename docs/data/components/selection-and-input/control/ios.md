---
title: Control
description: 체크박스, 체크마크, 라디오 버튼과 같은 선택 컨트롤을 제공하는 컴포넌트입니다.
---

```swift
@MainActor struct Control
```

## Overview

다양한 유형의 선택 컨트롤을 통일된 인터페이스로 제공합니다. 선택 상태 변경 시 콜백을 받을 수 있으며, 크기와 스타일을 조정할 수 있습니다.

```swift
// 체크박스
Control.checkbox(checked: true) { isChecked in
    print("체크박스 선택 상태: \(isChecked)")
}

// 라디오 버튼
Control.radio(checked: false)
    .tight()
    .size(.small)

// 바인딩 사용
@State private var isChecked = false
Control.checkmark($isChecked)
```

>  **Note**
>
> 모든 컨트롤은 상태에 따라 적절한 시각적 피드백을 제공합니다.

## Topics

### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func disable(Bool) -> Control``</summary>

컨트롤을 비활성화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부 (기본값: true) |
- **Return Value**

  수정된 컨트롤 인스턴스
- **Discussion**

  비활성화된 컨트롤은 사용자 상호작용이 불가능하며, 시각적으로도 흐리게 표시됩니다.
</details>
<details>

<summary>``func tight(Bool) -> Control``</summary>

컨트롤을 더 조밀한 레이아웃으로 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `tight` | 조밀한 레이아웃 적용 여부 (기본값: true) |
- **Return Value**

  수정된 컨트롤 인스턴스
- **Discussion**

  이 수정자를 적용하면 컨트롤의 가로 너비가 줄어듭니다.
</details>

___
### Type Methods

<details>

<summary>``static func checkbox(Binding<Bool>, size: Size) -> Control``</summary>

불리언 바인딩을 이용해 체크박스를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 체크박스 선택 상태와 연결된 바인딩 |
  | `size` | 체크박스 크기 (기본값: .medium) |
- **Return Value**

  구성된 체크박스 컨트롤
</details>
<details>

<summary>``static func checkbox(Binding<State>, size: Size) -> Control``</summary>

상태 바인딩을 이용해 체크박스를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `state` | 체크박스 상태와 연결된 바인딩 |
  | `size` | 체크박스 크기 (기본값: .medium) |
- **Return Value**

  구성된 체크박스 컨트롤
</details>
<details>

<summary>``static func checkbox(checked: Bool, size: Size, onSelect: ((Bool) -> Void)?) -> Control``</summary>

불리언 값을 이용해 체크박스를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 체크박스의 초기 선택 상태 |
  | `size` | 체크박스 크기 (기본값: .medium) |
  | `onSelect` | 선택 상태 변경 시 호출되는 클로저 |
- **Return Value**

  구성된 체크박스 컨트롤
</details>
<details>

<summary>``static func checkbox(state: State, size: Size, onSelect: ((State) -> Void)?) -> Control``</summary>

상태 값을 이용해 체크박스를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `state` | 체크박스의 초기 상태 |
  | `size` | 체크박스 크기 (기본값: .medium) |
  | `onSelect` | 선택 상태 변경 시 호출되는 클로저 |
- **Return Value**

  구성된 체크박스 컨트롤
</details>
<details>

<summary>``static func checkmark(Binding<Bool>, size: Size) -> Control``</summary>

불리언 바인딩을 이용해 체크마크를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 체크마크 선택 상태와 연결된 바인딩 |
  | `size` | 체크마크 크기 (기본값: .medium) |
- **Return Value**

  구성된 체크마크 컨트롤
</details>
<details>

<summary>``static func checkmark(checked: Bool, size: Size, onSelect: ((Bool) -> Void)?) -> Control``</summary>

불리언 값을 이용해 체크마크를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 체크마크의 초기 선택 상태 |
  | `size` | 체크마크 크기 (기본값: .medium) |
  | `onSelect` | 선택 상태 변경 시 호출되는 클로저 |
- **Return Value**

  구성된 체크마크 컨트롤
</details>
<details>

<summary>``static func radio(Binding<Bool>, size: Size) -> Control``</summary>

불리언 바인딩을 이용해 라디오 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 라디오 버튼 선택 상태와 연결된 바인딩 |
  | `size` | 라디오 버튼 크기 (기본값: .medium) |
- **Return Value**

  구성된 라디오 버튼 컨트롤
</details>
<details>

<summary>``static func radio(checked: Bool, size: Size, onSelect: ((Bool) -> Void)?) -> Control``</summary>

불리언 값을 이용해 라디오 버튼을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `checked` | 라디오 버튼의 초기 선택 상태 |
  | `size` | 라디오 버튼 크기 (기본값: .medium) |
  | `onSelect` | 선택 상태 변경 시 호출되는 클로저 |
- **Return Value**

  구성된 라디오 버튼 컨트롤
</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>

컨트롤의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum State``</summary>

컨트롤의 상태를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case checked``</summary>

선택된 상태
</details>
<details>

<summary>``case indeterminate``</summary>

중간 상태 (checkbox에서만 지원)
</details>
<details>

<summary>``case unchecked``</summary>

선택되지 않은 상태
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>
<details>

<summary>``enum Variant``</summary>

컨트롤의 종류를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case checkbox``</summary>

체크박스 (3가지 상태: 선택, 미선택, 중간 상태)
</details>
<details>

<summary>``case checkmark``</summary>

체크마크 (선택, 미선택 상태만 지원)
</details>
<details>

<summary>``case radio``</summary>

라디오 버튼 (선택, 미선택 상태만 지원)
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



