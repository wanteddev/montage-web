---
title: ScreenScaffold
description: 화면의 골격을 잡는 컨테이너입니다.
---

```swift
@MainActor struct ScreenScaffold<Content> where Content : View
```

## Overview

상단 [TopNavigation](/documentation/montage/topnavigation.md), 하단 [ActionArea](/documentation/montage/actionarea.md), 그리고 그 사이 스크롤 영역을 한곳에서 관리합니다. 세 요소는 서로의 크기와 스크롤 상태에 의존하므로, 따로 붙이면 호출부가 그 배선을 떠안게 됩니다.

[BottomSheet](/documentation/montage/bottomsheet.md)·[Popup](/documentation/montage/popup.md)과 같은 형태로 슬롯을 받습니다. 본문은 마지막 인자입니다 - 슬롯이 함께 오면 SwiftLint의 `multiple_closures_with_trailing_closure`가 trailing closure를 막으므로, 이 레포의 다른 호출부와 같이 괄호 안에 둡니다.

```swift
ScreenScaffold(
    navigation: {
        TopNavigation()
            .title("언어 설정")
    },
    actionArea: {
        ActionArea(variant: .neutral(main: .init(text: "저장", action: save)))
    },
    {
        VStack(spacing: 16) {
            ForEach(items) { row($0) }
        }
        .padding(.horizontal, 20)
    }
)
```

## 스크롤을 누가 쥐는가

기본값 [ScreenScaffold.ScrollContainer.builtIn](/documentation/montage/screenscaffold/scrollcontainer/builtin.md)은 스캐폴드가 [ScrollView](/documentation/montage/scrollview.md)를 깔아 줍니다. `List`처럼 스크롤을 스스로 쥐어야 하는 콘텐츠는 [ScreenScaffold.ScrollContainer.custom](/documentation/montage/screenscaffold/scrollcontainer/custom.md)로 바꾸고, 콘텐츠가 직접 신호를 올립니다.

```swift
ScreenScaffold(scrollContainer: .custom) {
    List {
        ForEach(items) { row($0) }
            .listRowBackground(SwiftUI.Color.clear)
    }
    .scrollContentBackground(.hidden)
    .reportsScrollOffset()
    .reportsScrollReachedEnd()
}
```

`List`는 행 배경과 스크롤 배경을 각각 깔기 때문에 둘 다 걷어내야 합니다. 하나만 처리하면 [backgroundColor(_:)](/documentation/montage/screenscaffold/backgroundcolor(_:).md)로 지정한 색이 가려지고, [ActionArea](/documentation/montage/actionarea.md)가 바닥에서 투명해질 때 그 경계가 드러납니다.

> **Note**
>
> [BottomSheet](/documentation/montage/bottomsheet.md)·[Popup](/documentation/montage/popup.md) 안에는 넣지 않습니다. 두 컴포넌트가 같은 일을 하며 [ActionArea](/documentation/montage/actionarea.md) 높이를 자기 높이 계산에 쓰므로 `actionArea:` 인자로 넘기세요. 전체 화면 커버나 push된 목적지는 시트가 아니라 화면이므로 여기에 해당하지 않습니다.

## Topics

### Initializers

<details>

<summary>``init(scrollContainer: ScrollContainer, navigation: (() -> TopNavigation)?, actionArea: (() -> ActionArea)?, () -> Content)``</summary>


화면 스캐폴드를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `scrollContainer` | 스크롤 컨테이너를 누가 둘지, 생략하면 기본값으로 [ScreenScaffold.ScrollContainer.builtIn](/documentation/montage/screenscaffold/scrollcontainer/builtin.md) 적용 |
  | `navigation` | 상단에 배치할 [TopNavigation](/documentation/montage/topnavigation.md)을 만드는 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `actionArea` | 하단에 배치할 [ActionArea](/documentation/montage/actionarea.md)를 만드는 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `content` | 화면 본문을 만드는 클로저 |

- **Discussion**

  스크롤 오프셋과 하단 도달 여부는 스캐폴드가 슬롯에 넣어 주므로 호출부가 넘기지 않습니다.
  > **Note**
  >
  > 슬롯 클로저에 `@ViewBuilder`를 붙이지 않았습니다. 붙이면 `if`문이 `_ConditionalContent`를 만들어 [ActionArea](/documentation/montage/actionarea.md)·[TopNavigation](/documentation/montage/topnavigation.md) 타입 제약이 깨집니다. 조건부로 넣을 때는 `actionArea: isEditing ? slot : nil`처럼 클로저 자체를 갈라 주세요.

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color?) -> ScreenScaffold<Content>``</summary>


화면 전체의 바탕색을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 바탕색, `nil`이면 칠하지 않습니다 |

- **Return Value**

  수정된 스캐폴드
</details>

### Enumerations

<details>

<summary>``enum ScrollContainer``</summary>


스크롤 컨테이너를 누가 두는지 정합니다.
#### Enumeration Cases

<details>

<summary>``case builtIn``</summary>


스캐폴드가 [ScrollView](/documentation/montage/scrollview.md)를 깔고, 콘텐츠는 그 안에 놓입니다.
</details>
<details>

<summary>``case custom``</summary>


콘텐츠가 스크롤 컨테이너를 직접 둡니다. `List`처럼 컨테이너를 바꿀 수 없을 때 씁니다.
- **Discussion**

  스캐폴드가 스크롤 상태를 알 수 없으므로, 콘텐츠가 `SwiftUI/View/reportsScrollOffset(_:)`과 `SwiftUI/View/reportsScrollReachedEnd(_:)`로 직접 신호를 올려야 합니다.
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



