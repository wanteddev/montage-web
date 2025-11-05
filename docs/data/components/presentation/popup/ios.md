---
title: Popup modal
description: 화면 중앙에 표시되는 팝업 모달 컴포넌트입니다.
---

```swift
@MainActor struct PopupModal
```

## Overview

배경을 어둡게 처리하고 화면 중앙에 콘텐츠를 표시하는 형태의 모달입니다. 내비게이션 바와 액션 영역을 설정할 수 있으며, 애니메이션과 함께 표시됩니다.

```swift
@State private var showPopup = false

Button("팝업 열기") {
    showPopup = true
}
.fullScreenCover(isPresented: $showPopup) {
    PopupModal {
        VStack(spacing: 16) {
            Text("알림")
                .font(.headline)
            Text("중요한 메시지입니다.")
            
            Button("확인") {
                showPopup = false
            }
        }
        .padding()
    }
}
.transaction { transaction in
    transaction.disablesAnimations = true
}
```

모디파이어를 사용하면 더 간편하게 구현할 수 있으며, 애니메이션이 자동으로 처리됩니다:

```swift
YourView()
    .popupModal(
        isPresented: $showPopup
    ) {
        Text("팝업 내용")
    }
```

## Topics

### Initializers

<details>

<summary>``init<V>(() -> V)``</summary>

팝업 모달을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `content` | 모달 내에 표시할 콘텐츠를 반환하는 클로저 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func ignoresEdgeInsets(Bool) -> PopupModal``</summary>

컨텐츠의 기본 여백을 무시할지 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `ignoresEdgeInsets` | 여백 무시 여부 |
- **Return Value**

  수정된 팝업 모달 뷰
</details>
<details>

<summary>``func modalActionArea(ActionArea.Model?) -> PopupModal``</summary>

팝업 모달 하단에 액션 영역을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `actionAreaModel` | 액션 영역 모델 |
- **Return Value**

  수정된 팝업 모달 뷰
</details>
<details>

<summary>``func modalNavigation((() -> Montage.ModalNavigation)?) -> PopupModal``</summary>

팝업 모달 상단에 내비게이션 바를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `navigation` | 내비게이션 바를 반환하는 클로저 |
- **Return Value**

  수정된 팝업 모달 뷰
</details>
<details>

<summary>``func resize(Resize) -> PopupModal``</summary>

팝업 모달의 크기를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `resize` | 팝업 모달의 크기 설정 |
- **Return Value**

  수정된 팝업 모달 뷰
</details>

___
### Enumerations

<details>

<summary>``enum Resize``</summary>

팝업의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case fixed(CGFloat)``</summary>

지정한 높이로 고정됩니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `height` | 높이 |
</details>
<details>

<summary>``case hug``</summary>

컨텐츠 크기에 맞게 자동 조절됩니다.
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



