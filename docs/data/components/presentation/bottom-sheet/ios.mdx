---
title: Bottom sheet
description: 화면 하단에서 위로 올라오는 바텀 시트 모달 컴포넌트입니다.
---

```swift
@MainActor struct BottomSheet
```

## Overview

SwiftUI의 .sheet 수정자와 함께 사용하여 다양한 크기와 동작을 지원하는 바텀 시트를 구현합니다. 내비게이션 바, 액션 영역, 핸들 등의 요소를 설정할 수 있습니다.

```swift
@State private var showBottomSheet = false

Button("바텀 시트 열기") {
    showBottomSheet = true
}
.sheet(isPresented: $showBottomSheet) {
    BottomSheet {
        VStack(spacing: 16) {
            Text("바텀 시트 내용")
            Button("닫기") {
                showBottomSheet = false
            }
        }
    }
    .resize(.flexible)
    .modalNavigation {
        ModalNavigation()
            .title("제목")
    }
}
```

모디파이어를 사용하면 더 간편하게 구현할 수 있습니다:

```swift
YourView()
    .bottomSheet(
        isPresented: $showBottomSheet,
        resize: .hug
    ) {
        Text("바텀 시트 내용")
    }
```

## Topics

### Initializers

<details>

<summary>``init<V>(() -> V)``</summary>


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


뷰의 내용과 동작을 정의합니다.
</details>

___
### Instance Methods

<details>

<summary>``func ignoresEdgeInsets(Bool) -> BottomSheet``</summary>


컨텐츠의 기본 여백을 무시할지 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `ignoresEdgeInsets` | 여백 무시 여부 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func modalActionArea(ActionArea.Model?) -> BottomSheet``</summary>


바텀 시트 하단에 액션 영역을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `actionAreaModel` | 액션 영역 모델 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func modalNavigation((() -> Montage.ModalNavigation)?) -> BottomSheet``</summary>


바텀 시트 상단에 내비게이션 바를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `navigation` | 내비게이션 바를 반환하는 클로저 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func needHandle(Bool) -> BottomSheet``</summary>


바텀 시트 상단의 핸들 표시 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `needHandle` | 핸들 표시 여부 |
- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func resize(BottomSheet.Resize) -> BottomSheet``</summary>


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
___
### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func bottomSheet<V>(isPresented: Binding<Bool>, isFullScreenCover: Bool, needHandle: Bool, resize: BottomSheet.Resize, ignoresEdgeInsets: Bool, actionAreaModel: ActionArea.Model?, navigation: (() -> ModalNavigation)?, () -> V) -> some View``</summary>


바텀 시트 모달을 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `isFullScreenCover` | 전체 화면 모달로 표시할지 여부, 생략하면 기본값으로 `false` 적용 |
  | `needHandle` | 상단 핸들 표시 여부, 생략하면 기본값으로 `true` 적용 |
  | `resize` | 모달 크기 조절 방식, 생략하면 기본값으로 `.hug` 적용 |
  | `ignoresEdgeInsets` | 모달 내용이 Edge 인셋을 무시할지 여부 |
  | `actionAreaModel` | 모달 하단에 표시할 액션 영역 모델, 생략하면 기본값으로 `nil` 적용 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |
- **Return Value**

  바텀 시트 모달이 적용된 뷰
- **Discussion**

  화면 하단에서 올라오는 바텀 시트 형태의 모달을 표시합니다.
</details>


</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



