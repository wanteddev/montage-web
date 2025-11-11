---
title: ScrollView
description: 스크롤 상태 추적과 오프셋 감지가 가능한 커스텀 스크롤 뷰입니다.
---

```swift
@MainActor struct ScrollView
```

## Overview

기본 SwiftUI 스크롤 뷰를 확장하여 스크롤 상태 추적, 오프셋 감지, 새로고침 등 추가 기능을 제공합니다.

```swift
@State private var scrollStatus = ScrollView.ScrollStatus()

ScrollView(scrollStatus: $scrollStatus, 
            onOffsetChanged: { offset in
              print("스크롤 오프셋: \(offset)")
            }) {
    VStack(spacing: 16) {
        ForEach(0..<20) { index in
            Text("항목 \(index)")
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)
        }
    }
    .padding()
}
.axis(.vertical)
.hidesIndicators()
.onRefresh {
    // 새로고침 작업 수행
    try? await Task.sleep(nanoseconds: 2_000_000_000)
}
```

## Topics

### Structures

<details>

<summary>``struct ScrollStatus``</summary>


스크롤 뷰의 상태를 추적하는 구조체입니다.
#### Initializers

<details>

<summary>``init(axis: Axis, scrollViewSize: CGSize, contentSize: CGSize, contentOffset: CGPoint)``</summary>


스크롤 상태를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `axis` | 스크롤 방향, 기본값은 `.vertical` |
  | `scrollViewSize` | 스크롤 뷰 크기, 기본값은 `.zero` |
  | `contentSize` | 콘텐츠 크기, 기본값은 `.zero` |
  | `contentOffset` | 콘텐츠 오프셋, 기본값은 `.zero` |
</details>

#### Instance Properties

<details>

<summary>``var axis: Axis``</summary>


스크롤 방향
</details>
<details>

<summary>``var contentOffset: CGPoint``</summary>


콘텐츠 오프셋
</details>
<details>

<summary>``var contentSize: CGSize``</summary>


콘텐츠 크기
</details>
<details>

<summary>``var scrollViewSize: CGSize``</summary>


스크롤 뷰 크기
</details>
<details>

<summary>``var scrolledToMax: Bool``</summary>


스크롤이 최대 위치에 도달했는지 여부입니다.
</details>

</details>

___
### Initializers

<details>

<summary>``init(scrollStatus: Binding<ScrollStatus>?, onOffsetChanged: (CGPoint) -> Void, content: () -> any View)``</summary>


스크롤 뷰를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `scrollStatus` | 스크롤 상태를 추적하기 위한 바인딩, 기본값은 `nil` |
  | `onOffsetChanged` | 스크롤 오프셋이 변경될 때 호출되는 클로저, 기본값은 빈 클로저 |
  | `content` | 스크롤 뷰에 표시할 콘텐츠를 반환하는 클로저 |
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

<summary>``func axis(Axis) -> ScrollView``</summary>


스크롤 방향을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `axis` | 스크롤 방향 (.vertical 또는 .horizontal) |
- **Return Value**

  수정된 스크롤 뷰
</details>
<details>

<summary>``func hidesIndicators(Bool) -> ScrollView``</summary>


스크롤 인디케이터 표시 여부를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `hidesIndicators` | 인디케이터를 숨길지 여부, 기본값은 `true` |
- **Return Value**

  수정된 스크롤 뷰
</details>
<details>

<summary>``func onRefresh(() async -> Void) -> ScrollView``</summary>


당겨서 새로고침 동작을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `perform` | 새로고침 시 실행할 비동기 작업 |
- **Return Value**

  수정된 스크롤 뷰
</details>

___
## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



