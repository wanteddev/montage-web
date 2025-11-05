---
title: Toast
description: 화면의 상단 또는 하단에 짧게 표시되는 알림 메시지 컴포넌트입니다.
---

```swift
@MainActor struct Toast
```

## Overview

사용자에게 간단한 피드백이나 정보를 제공하기 위해 사용합니다. 일반, 긍정, 주의, 부정적인 상태로 표시할 수 있으며, 설정된 시간이 지나면 자동으로 사라집니다.

```swift
// 토스트 메시지 표시
@State private var toastModel: Toast.Model?

var body: some View {
    ContentView()
        .toast(
            $toastModel,
            location: .bottom(),
            duration: .short
        )
        .onAppear {
            toastModel = Toast.Model(
                .positive,
                message: "성공적으로 저장되었습니다."
            )
        }
}
```

## Topics

### Structures

<details>

<summary>``struct Model``</summary>

토스트 메시지의 데이터 모델을 정의하는 구조체입니다.
#### Initializers

<details>

<summary>``init(Toast.Variant, message: String)``</summary>

Toast 모델을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 토스트 메시지의 스타일 (기본값: .normal()) |
  | `message` | 토스트에 표시할 메시지 텍스트 |
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Enumerations

<details>

<summary>``enum Duration``</summary>

토스트 메시지의 표시 시간을 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case long``</summary>

긴 표시 시간 (5초)
</details>
<details>

<summary>``case short``</summary>

짧은 표시 시간 (3초)
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Location``</summary>

토스트 메시지가 표시될 위치를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case bottom(offset: CGFloat)``</summary>

화면 하단에 토스트 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `offset` | 하단에서의 오프셋 값 (기본값: 0) |
</details>
<details>

<summary>``case top(offset: CGFloat)``</summary>

화면 상단에 토스트 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `offset` | 상단에서의 오프셋 값 (기본값: 0) |
</details>

</details>
<details>

<summary>``enum Variant``</summary>

토스트 메시지의 시각적 스타일을 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case cautionary``</summary>

주의 메시지를 위한 주황색 경고 아이콘 스타일
</details>
<details>

<summary>``case negative``</summary>

오류 메시지를 위한 빨간색 경고 아이콘 스타일
</details>
<details>

<summary>``case normal(Montage.Icon?, tint: Montage.Color.Semantic?)``</summary>

기본 스타일의 토스트 (선택적으로 아이콘과 색상 지정 가능)

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 (선택 사항) |
  | `tint` | 아이콘의 색상 (선택 사항) |
</details>
<details>

<summary>``case positive``</summary>

성공 메시지를 위한 녹색 체크 아이콘 스타일
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



