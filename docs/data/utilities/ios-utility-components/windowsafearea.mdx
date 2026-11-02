---
title: WindowSafeArea
description: 뷰가 놓인 window의 safe area 인셋을 담는 상태.
---

```swift
@propertyWrapper struct WindowSafeArea
```

## Overview

Body 평가 중에 `UIWindow`의 safe area를 읽으면 AttributeGraph 순환이 생겨 화면 갱신이 멈출 수 있습니다. 이 상태는 `SwiftUI/View/readsWindowSafeArea(_:)`가 window에 붙은 UIKit 뷰의 콜백에서 읽은 값으로 갱신되므로 렌더 중에 UIKit을 읽지 않습니다. 회전·창 크기 변경에 다시 갱신되고, 여러 window(멀티씬)에서는 각자 자기 window 값을 받습니다.

값을 받기 전 첫 프레임에는 가장 최근에 읽은 window 값을 씁니다. 앱이 처음 그리는 화면만 0에서 시작합니다.

```swift
@WindowSafeArea private var safeAreaInsets

var body: some View {
    content
        .padding(.bottom, safeAreaInsets.bottom)
        .readsWindowSafeArea($safeAreaInsets)
}
```

## Topics

### Initializers

<details>

<summary>``init()``</summary>


가장 최근에 읽은 window 값으로 시작합니다. 읽은 적이 없으면 0입니다.
</details>

### Instance Properties

<details>

<summary>``var projectedValue: Binding<EdgeInsets>``</summary>


`SwiftUI/View/readsWindowSafeArea(_:)`에 넘길 바인딩.
</details>
<details>

<summary>``var wrappedValue: EdgeInsets``</summary>


window의 safe area 인셋.
</details>

## Relationships

Conforms To

`SwiftUICore.DynamicProperty`



