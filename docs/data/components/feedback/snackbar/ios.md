---
title: Snack bar
description: 화면 상단 또는 하단에 임시로 표시되는 알림 메시지 컴포넌트입니다.
---

```swift
@MainActor struct SnackBar
```

## Overview

사용자에게 짧은 피드백이나 알림을 제공하기 위해 사용합니다. 제목, 설명, 추가 콘텐츠와 액션 버튼을 포함할 수 있으며, 설정된 시간이 지나면 자동으로 사라집니다.

```swift
// 모델을 통한 스낵바 표시
@State private var snackBarModel: SnackBar.Model?

var body: some View {
    ContentView()
        .snackBar(
            $snackBarModel,
            handler: {
                // 액션 버튼 클릭 시 실행할 코드
            }
        )
        .onAppear {
            snackBarModel = SnackBar.Model(
                duration: .short,
                description: "작업이 완료되었습니다.",
                action: "확인"
            )
        }
}
```

## Topics

### Structures

<details>

<summary>``struct Model``</summary>

SnackBar의 데이터 모델을 정의하는 구조체입니다.
#### Operators

<details>

<summary>``static func == (`Self`, `Self`) -> Bool``</summary>
</details>

#### Initializers

<details>

<summary>``init(duration: Duration, heading: String?, description: String?, action: String)``</summary>

SnackBar 모델을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `duration` | 스낵바가 표시되는 시간 |
  | `heading` | 스낵바의 제목 (선택 사항) |
  | `description` | 스낵바의 설명 텍스트 (선택 사항) |
  | `action` | 스낵바의 액션 버튼에 표시할 텍스트 |
</details>
<details>

<summary>``init<V>(duration: Duration, heading: String?, description: String?, extraContents: () -> V, action: String)``</summary>

SnackBar 모델을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `duration` | 스낵바가 표시되는 시간 |
  | `heading` | 스낵바의 제목 (선택 사항) |
  | `description` | 스낵바의 설명 텍스트 (선택 사항) |
  | `extraContents` | 스낵바에 표시할 추가 콘텐츠를 반환하는 클로저 (선택 사항) |
  | `action` | 스낵바의 액션 버튼에 표시할 텍스트 |
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

SnackBar가 자동으로 사라지는 시간을 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case long``</summary>

긴 표시 시간 (16초)
</details>
<details>

<summary>``case short``</summary>

짧은 표시 시간 (4초)
</details>

#### Initializers

<details>

<summary>``init?(rawValue: Double)``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios-utilities/rawrepresentable-implementations)

</details>
<details>

<summary>``enum Location``</summary>

스낵바가 표시될 위치를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case bottom(offset: CGFloat)``</summary>

화면 하단에 스낵바 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `offset` | 하단에서의 오프셋 값 (기본값: 0) |
</details>
<details>

<summary>``case top(offset: CGFloat)``</summary>

화면 상단에 스낵바 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `offset` | 상단에서의 오프셋 값 (기본값: 0) |
</details>

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



