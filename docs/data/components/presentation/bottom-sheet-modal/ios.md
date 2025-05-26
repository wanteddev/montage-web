---
title: Bottom sheet modal
description: 화면 하단에서 위로 올라오는 바텀 시트 모달 컴포넌트입니다.
---

```swift
@MainActor struct BottomSheetModal
```

## Overview

SwiftUI의 .sheet 수정자와 함께 사용하여 다양한 크기와 동작을 지원하는 바텀 시트를 구현합니다. 내비게이션 바, 액션 영역, 핸들 등의 요소를 설정할 수 있습니다.

```swift
@State private var showBottomSheet = false

Button("바텀 시트 열기") {
    showBottomSheet = true
}
.sheet(isPresented: $showBottomSheet) {
    BottomSheetModal {
        VStack(spacing: 16) {
            Text("바텀 시트 내용")
            Button("닫기") {
                showBottomSheet = false
            }
        }
    }
    .resize(.flexible)
    .modalNavigation {
        ModalNavigation(title: "제목")
    }
}
```

모디파이어를 사용하면 더 간편하게 구현할 수 있습니다:

```swift
YourView()
    .bottomSheetModal(
        isPresented: $showBottomSheet,
        resize: .hug
    ) {
        Text("바텀 시트 내용")
    }
```

## Topics

### Initializers

<details>

<summary>``init(() -> any View)``</summary>

바텀 시트 모달을 초기화합니다.

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

<summary>``func ignoresEdgeInsets(Bool) -> BottomSheetModal``</summary>

컨텐츠의 기본 여백을 무시할지 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `ignoresEdgeInsets` | 여백 무시 여부 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func modalActionArea(ActionArea.Model?) -> BottomSheetModal``</summary>

바텀 시트 하단에 액션 영역을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `actionAreaModel` | 액션 영역 모델 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func modalNavigation((() -> Montage.ModalNavigation)?) -> BottomSheetModal``</summary>

바텀 시트 상단에 내비게이션 바를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `navigation` | 내비게이션 바를 반환하는 클로저 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func needHandle(Bool) -> BottomSheetModal``</summary>

바텀 시트 상단의 핸들 표시 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `needHandle` | 핸들 표시 여부 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func resize(BottomSheetModal.Resize) -> BottomSheetModal``</summary>

바텀 시트의 크기 조절 방식을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `resize` | 크기 조절 방식 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>

___
### Enumerations

<details>

<summary>``enum Resize``</summary>

바텀 시트의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case fill``</summary>

화면 전체를 채웁니다.
</details>
<details>

<summary>``case fixedHeight(CGFloat)``</summary>

지정한 높이로 고정됩니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `height` | 높이 |
</details>
<details>

<summary>``case fixedRatio(CGFloat)``</summary>

화면 높이의 특정 비율로 고정됩니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `ratio` | 비율 (0.0 ~ 1.0) |
</details>
<details>

<summary>``case flexible``</summary>

사용자가 드래그하여 크기를 조절할 수 있습니다.
</details>
<details>

<summary>``case hug``</summary>

컨텐츠 크기에 맞게 자동 조절됩니다.
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



