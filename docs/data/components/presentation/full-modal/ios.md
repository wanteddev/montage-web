---
title: Full modal
description: 화면 전체를 덮는 풀스크린 모달 컴포넌트입니다.
---

```swift
@MainActor struct FullModal
```

## Overview

SwiftUI의 .fullScreenCover 수정자와 함께 사용하여 전체 화면을 덮는 모달을 구현합니다. 내비게이션 바와 액션 영역을 설정할 수 있습니다.

```swift
@State private var showFullModal = false

Button("전체 화면 모달 열기") {
    showFullModal = true
}
.fullScreenCover(isPresented: $showFullModal) {
    FullModal {
        VStack(spacing: 20) {
            Text("풀스크린 모달 내용")
            Button("닫기") {
                showFullModal = false
            }
        }
        .padding()
    }
    .modalNavigation {
        ModalNavigation(title: "제목")
            .leadingButton(.back {
                showFullModal = false
            })
    }
}
```

모디파이어를 사용하면 더 간편하게 구현할 수 있습니다:

```swift
YourView()
    .modifier(
        FullModalModifier(
            isPresented: $showFullModal
        ) {
            Text("풀스크린 모달 내용")
        }
    )
```

## Topics

### Initializers

<details>

<summary>``init(() -> any View)``</summary>

풀스크린 모달을 초기화합니다.

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

<summary>``func ignoresEdgeInsets(Bool) -> FullModal``</summary>

컨텐츠의 기본 여백을 무시할지 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `ignoresEdgeInsets` | 여백 무시 여부 |
- **Return Value**

  수정된 풀스크린 모달 뷰
</details>
<details>

<summary>``func modalActionArea(ActionArea.Model?) -> FullModal``</summary>

풀스크린 모달 하단에 액션 영역을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `actionAreaModel` | 액션 영역 모델 |
- **Return Value**

  수정된 풀스크린 모달 뷰
</details>
<details>

<summary>``func modalNavigation((() -> Montage.ModalNavigation)?) -> FullModal``</summary>

풀스크린 모달 상단에 내비게이션 바를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `navigation` | 내비게이션 바를 반환하는 클로저 |
- **Return Value**

  수정된 풀스크린 모달 뷰
</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



