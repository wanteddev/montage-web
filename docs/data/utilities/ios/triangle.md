---
title: Triangle
description: 삼각형 모양을 그리는 Shape 컴포넌트입니다.
---

Structure

# Triangle

```swift
struct Triangle
```

## Overview

정해진 영역 내에 정삼각형 형태를 그립니다. 화살표 포인터, 툴팁, 인디케이터 등 다양한 UI 요소에 활용할 수 있습니다.

```swift
Triangle()
    .frame(width: 20, height: 10)
    .foregroundColor(.blue)
    .rotationEffect(.degrees(180)) // 방향 변경

// 버튼 위에 삼각형 인디케이터 표시
Button("메뉴") {
    // 작업 수행
}
.overlay(alignment: .top) {
    Triangle()
        .frame(width: 12, height: 6)
        .foregroundColor(.red)
        .offset(y: -6)
}
```

## Topics

### Initializers

<details>

<summary>``init()``</summary>

삼각형을 초기화합니다.
</details>

___
### Instance Methods

<details>

<summary>``func path(in: CGRect) -> Path``</summary>

삼각형 경로를 정의합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `rect` | 삼각형이 그려질 영역 |
- **Return Value**

  삼각형 경로
- **Discussion**

  삼각형은 기본적으로 아래쪽을 향하는 형태로 그려집니다. 방향을 변경하려면 rotationEffect 모디파이어를 사용하세요.
</details>

___
### Default Implementations


[Animatable Implementations](/docs/utilities/ios/animatable-implementations.md)

[Shape Implementations](/docs/utilities/ios/shape-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.Animatable`

`SwiftUICore.Shape`

`SwiftUICore.View`



