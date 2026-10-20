---
title: ScrollView
description: 스크롤 상태 추적과 오프셋 감지가 가능한 커스텀 스크롤 뷰입니다.
---

```swift
@MainActor struct ScrollView
```

## Overview

기본 SwiftUI 스크롤 뷰를 확장하여 스크롤 상태 추적, 오프셋 감지, 새로고침 등 추가 기능을 제공합니다.

스크롤 위치는 스크롤 뷰 안에서만 추적하고, 바깥에는 필요한 만큼만 알립니다. 오프셋에서 필요한 값만 뽑아 받으려면 [onScrollOffsetChange(for:transform:action:)](/documentation/montage/scrollview/onscrolloffsetchange(for:transform:action:).md)를, 크기와 오프셋을 함께 읽으려면 [ScrollView.Geometry](/documentation/montage/scrollview/geometry.md)를 씁니다.

```swift
@State private var showsTopButton = false

ScrollView {
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
.onScrollOffsetChange(for: Bool.self) { offset in
    offset.y < -300
} action: { _, newValue in
    showsTopButton = newValue
}
.onRefresh {
    // 새로고침 작업 수행
    try? await Task.sleep(nanoseconds: 2_000_000_000)
}
```

> **Note**
>
> 콘텐츠 오프셋은 최상단에서 `0`이고, 아래(가로는 오른쪽)로 스크롤할수록 음수가 됩니다. 당겨서 새로고침처럼 최상단 너머로 당기면 양수가 됩니다.

## Topics

### Structures

<details>

<summary>``struct ScrollStatus``</summary>


스크롤 뷰의 상태를 추적하는 구조체입니다.
- **Overview**

  스크롤 방향, 스크롤 뷰 크기, 콘텐츠 크기, 오프셋 등의 정보를 포함합니다.
  > **Note**
  >
  > deprecated된 [init(scrollStatus:onOffsetChanged:content:)](/documentation/montage/scrollview/init(scrollstatus:onoffsetchanged:content:).md)에서만 쓰입니다. 새 코드는 [ScrollView.Geometry](/documentation/montage/scrollview/geometry.md)를 쓰세요.

#### Initializers

<details>

<summary>``init(axis: Axis, scrollViewSize: CGSize, contentSize: CGSize, contentOffset: CGPoint)``</summary>


스크롤 상태를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `axis` | 스크롤 방향, 생략하면 기본값으로 `.vertical` 적용 |
  | `scrollViewSize` | 스크롤 뷰 크기, 생략하면 기본값으로 `.zero` 적용 |
  | `contentSize` | 콘텐츠 크기, 생략하면 기본값으로 `.zero` 적용 |
  | `contentOffset` | 콘텐츠 오프셋, 생략하면 기본값으로 `.zero` 적용 |

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

<summary>``var reachedEnd: Bool``</summary>


스크롤이 끝(세로는 바닥, 가로는 오른쪽 끝)에 도달했는지 여부입니다.
- **Discussion**

  [ActionArea](/documentation/montage/actionarea.md)의 상단 그라데이션은 이 값으로 표시 여부를 정합니다.
</details>
<details>

<summary>``var scrollViewSize: CGSize``</summary>


스크롤 뷰 크기
</details>

</details>

### Initializers

<details>

<summary>~~``init(content: () -> any View)``~~</summary>


`() -> any View`를 돌려주는 클로저로 스크롤 뷰를 초기화합니다.
> **Deprecated**
>
> 콘텐츠 클로저가 any View를 돌려주지 않게 바꾸고 init(content:)를 쓰세요.


- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 스크롤 뷰에 표시할 콘텐츠를 반환하는 클로저 |

- **Discussion**

  `any View`는 `View`를 따르지 않아 [init(content:)](/documentation/montage/scrollview/init(content:)-2nozf.md)로 넘길 수 없습니다. 이전 init에 이런 클로저를 넘기던 호출을 받아 두려고 남긴 경로이며, `@ViewBuilder` 클로저는 이 init으로 오지 않습니다.
</details>
<details>

<summary>``init<Content>(content: () -> Content)``</summary>


스크롤 뷰를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 스크롤 뷰에 표시할 콘텐츠 |

</details>
<details>

<summary>``init<Content>(geometry: Geometry, content: () -> Content)``</summary>


스크롤 상태를 [ScrollView.Geometry](/documentation/montage/scrollview/geometry.md)에 기록하는 스크롤 뷰를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `geometry` | 스크롤 상태를 기록할 객체 |
  | `content` | 스크롤 뷰에 표시할 콘텐츠 |

- **Discussion**

  `geometry`는 값이 바뀐 속성만 알리므로, 그 속성을 읽는 뷰만 다시 그려집니다. 스크롤마다 바뀌는 [contentOffset](/documentation/montage/scrollview/geometry/contentoffset.md)을 화면 전체의 `body`에서 읽으면 스크롤하는 내내 화면 전체가 다시 그려지니, 읽는 부분을 작은 하위 뷰로 떼어 내세요. [reachedEnd](/documentation/montage/scrollview/geometry/reachedend.md)도 오프셋을 읽어 스크롤마다 다시 그려집니다. `Bool` 하나만 필요하면 [onScrollOffsetChange(for:transform:action:)](/documentation/montage/scrollview/onscrolloffsetchange(for:transform:action:).md)가 값이 바뀔 때만 알려 더 쌉니다.

  ```swift
  @State private var scrollGeometry = ScrollView.Geometry()
  
  ScrollView(geometry: scrollGeometry) {
      content
  }
  .overlay(alignment: .bottom) {
      BottomGradient(geometry: scrollGeometry) // 하위 뷰에서 reachedEnd를 읽는다
  }
  ```

</details>
<details>

<summary>~~``init(onOffsetChanged: (CGPoint) -> Void, content: () -> any View)``~~</summary>


스크롤 뷰를 초기화합니다.
> **Deprecated**
>
> 스크롤 틱마다 불립니다. init(content:)에 onScrollOffsetChange(for:transform:action:)를 붙여 필요한 값이 바뀔 때만 받으세요.


- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `onOffsetChanged` | 스크롤 오프셋이 변경될 때 호출되는 클로저 |
  | `content` | 스크롤 뷰에 표시할 콘텐츠를 반환하는 클로저 |

- **Discussion**
  > **Important**
  >
  > 스크롤할 때마다 `onOffsetChanged`가 불립니다. 그 안에서 상태를 바꾸면 그 상태를 쥔 뷰의 `body` 전체가 스크롤 틱마다 다시 그려집니다. 오프셋에서 필요한 값만 받으려면 [onScrollOffsetChange(for:transform:action:)](/documentation/montage/scrollview/onscrolloffsetchange(for:transform:action:).md)를 쓰세요.

</details>
<details>

<summary>~~``init(scrollStatus: Binding<ScrollStatus>?, onOffsetChanged: (CGPoint) -> Void, content: () -> any View)``~~</summary>


스크롤 뷰를 초기화합니다.
> **Deprecated**
>
> 스크롤마다 바인딩을 쥔 뷰 전체가 다시 그려집니다. init(content:)에 onScrollOffsetChange(for:transform:action:)를 붙이거나 init(geometry:content:)를 쓰세요.


- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `scrollStatus` | 스크롤 상태를 추적하기 위한 바인딩 |
  | `onOffsetChanged` | 스크롤 오프셋이 변경될 때 호출되는 클로저, 생략하면 기본값으로 빈 클로저 적용 |
  | `content` | 스크롤 뷰에 표시할 콘텐츠를 반환하는 클로저 |

- **Discussion**
  > **Important**
  >
  > 스크롤할 때마다 `scrollStatus`에 값을 써서 바인딩을 쥔 뷰의 `body` 전체가 다시 그려집니다. 오프셋에서 필요한 값만 받으려면 [onScrollOffsetChange(for:transform:action:)](/documentation/montage/scrollview/onscrolloffsetchange(for:transform:action:).md)를, 스크롤 상태를 통째로 읽어야 하면 [init(geometry:content:)](/documentation/montage/scrollview/init(geometry:content:).md)를 쓰세요.

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

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
  | `hidesIndicators` | 인디케이터를 숨길지 여부, 생략하면 기본값으로 `true` 적용 |

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
<details>

<summary>``func onScrollOffsetChange<T>(for: T.Type, transform: (_ offset: CGPoint) -> T, action: (_ oldValue: T, _ newValue: T) -> Void) -> ScrollView``</summary>


스크롤 오프셋에서 뽑은 값이 바뀔 때 동작을 실행합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `type` | `transform`이 돌려주는 값의 타입 |
  | `transform` | 콘텐츠 오프셋을 받아 지켜볼 값으로 바꾸는 클로저. 오프셋은 최상단에서 `0`이고 스크롤할수록 음수가 됩니다 |
  | `action` | 지켜보는 값이 바뀔 때 이전 값과 새 값을 받아 실행할 클로저 |

- **Return Value**

  수정된 스크롤 뷰
- **Discussion**

  `transform`은 스크롤할 때마다 불리지만 `action`은 그 결과가 달라질 때만 불립니다. 필요한 만큼으로 값을 줄일수록 `action`이 덜 불리고, 그 안에서 바꾼 상태 때문에 다시 그려지는 일도 줄어듭니다.

  ```swift
  ScrollView {
      content
  }
  .onScrollOffsetChange(for: Bool.self) { offset in
      offset.y < 0
  } action: { _, isScrolled in
      showsDivider = isScrolled
  }
  ```


  `transform`이 바깥 값을 쓰면 그 값만 바뀌어도 결과가 달라질 수 있습니다. 이때도 `action`이 불립니다. `action`은 직전 렌더에서 만든 클로저가 불리므로, 상태는 `@State`·`@Binding`으로 바꾸고 부모가 넘긴 `let` 값은 캡처하지 마세요. 여러 번 붙이면 붙인 순서대로 각각 동작합니다.
  > **Note**
  >
  > 처음 그려질 때는 `action`이 불리지 않습니다. 상태의 초깃값은 오프셋이 `.zero`일 때의 결과에 맞춰 두세요.

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



