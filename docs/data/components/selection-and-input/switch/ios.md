---
title: Switch
description: 켜기/끄기 상태 전환이 가능한 스위치 컴포넌트입니다.
---

```swift
@MainActor struct Switch
```

## Overview

사용자가 기능을 활성화하거나 비활성화할 수 있는 토글 스위치입니다. 작은 크기와 중간 크기 두 가지 옵션을 제공합니다.

```swift
@State private var isOn = false

// 기본 크기(small) 스위치
Switch($isOn) { newValue in
    print("스위치 상태: \(newValue)")
}

// 중간 크기 스위치
Switch($isOn, size: .medium)
```

>  **Note**
>
> 스위치가 켜진 상태에서는 기본 테마 색상(primaryNormal)을 사용합니다.

## Topics

### Initializers

<details>

<summary>``init(Binding<Bool>, size: Size, onChange: (Bool) -> Void)``</summary>

스위치 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isOn` | 스위치의 켜짐/꺼짐 상태 바인딩 |
  | `size` | 스위치 크기 (기본값: .small) |
  | `onChange` | 상태 변경 시 호출되는 클로저 (기본값: 빈 클로저) |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>

스위치의 크기를 정의하는 열거형입니다.
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

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



