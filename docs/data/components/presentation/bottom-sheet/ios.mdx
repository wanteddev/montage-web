---
title: Bottom sheet
description: 화면 하단에서 위로 올라오는 바텀 시트 모달 컴포넌트입니다.
---

```swift
@MainActor struct BottomSheet
```

## Overview

다양한 크기와 동작을 지원하며, 내비게이션 바·액션 영역·핸들을 설정할 수 있습니다.

띄우는 방법은 두 가지입니다. 대개는 `SwiftUI/View/bottomSheet(isPresented:isFullScreenCover:needHandle:resize:contentVerticalPadding:contentHorizontalPadding:navigation:actionArea:onDismiss:_:)` 수정자를 씁니다. 표시 애니메이션과 딤 처리까지 함께 해 줍니다.

```swift
@State private var showBottomSheet = false

YourView()
    .bottomSheet(
        isPresented: $showBottomSheet,
        resize: .flexible,
        navigation: {
            ModalNavigation()
                .title("제목")
        },
        actionArea: {
            ActionArea(variant: .strong(main: .init(text: "확인", action: confirm)))
        },
        {
            Text("바텀 시트 내용")
        }
    )
```

`presentationDetents`·`interactiveDismissDisabled`처럼 SwiftUI 표준 시트 옵션을 함께 얹어야 할 때는 이 타입을 직접 만들어 `.sheet` 안에 넣습니다. 수정자는 표시까지 맡으므로 그 옵션을 끼워 넣을 자리가 없습니다.

```swift
.sheet(isPresented: $showBottomSheet) {
    BottomSheet {
        Text("바텀 시트 내용")
    }
    .needHandle(false)
    .presentationDetents([.large])
    .interactiveDismissDisabled()
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

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func contentPadding(vertical: ModalContentPadding.Vertical, horizontal: ModalContentPadding.Horizontal) -> BottomSheet``</summary>


콘텐츠 영역의 여백을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `vertical` | 상하 여백의 적용 범위, 생략하면 기본값으로 `.none` 적용 |
  | `horizontal` | 좌우 여백의 적용 여부, 생략하면 기본값으로 `.default` 적용 |

- **Return Value**

  수정된 바텀 시트 뷰
- **Discussion**

  좌우 28, 상하 24를 각각 켜고 끕니다. 기본값은 좌우만 적용하는 구성입니다.
</details>
<details>

<summary>~~``func ignoresEdgeInsets(Bool) -> BottomSheet``~~</summary>


컨텐츠의 기본 여백을 무시할지 설정합니다.
> **Deprecated**
>
> contentPadding(vertical:horizontal:)을 쓰세요. ignoresEdgeInsets(true)는 contentPadding(vertical: .none, horizontal: .none)과 같습니다.


- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `ignoresEdgeInsets` | 여백 무시 여부 |

- **Return Value**

  수정된 바텀 시트 뷰
</details>
<details>

<summary>``func modalActionArea((() -> ActionArea)?) -> BottomSheet``</summary>


바텀 시트 하단에 액션 영역을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `actionArea` | 하단에 배치할 [ActionArea](/documentation/montage/actionarea.md)를 만드는 클로저 |

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

### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func bottomSheet<V>(isPresented: Binding<Bool>, isFullScreenCover: Bool, needHandle: Bool, resize: BottomSheet.Resize, contentVerticalPadding: ModalContentPadding.Vertical, contentHorizontalPadding: ModalContentPadding.Horizontal, navigation: (() -> ModalNavigation)?, actionArea: (() -> ActionArea)?, onDismiss: (() -> Void)?, () -> V) -> some View``</summary>


바텀 시트 모달을 표시합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `isFullScreenCover` | 전체 화면 모달로 표시할지 여부, 생략하면 기본값으로 `false` 적용 |
  | `needHandle` | 상단 핸들 표시 여부, 생략하면 기본값으로 `true` 적용 |
  | `resize` | 모달 크기 조절 방식, 생략하면 기본값으로 `.hug` 적용 |
  | `contentVerticalPadding` | 콘텐츠 상하 여백의 적용 범위, 생략하면 기본값으로 `.none` 적용 |
  | `contentHorizontalPadding` | 콘텐츠 좌우 여백의 적용 여부, 생략하면 기본값으로 `.default` 적용 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `actionArea` | 모달 하단에 배치할 ActionArea를 만드는 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `onDismiss` | 모달이 닫힐때 호출될 클로저 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |

- **Return Value**

  바텀 시트 모달이 적용된 뷰
- **Discussion**

  화면 하단에서 올라오는 바텀 시트 형태의 모달을 표시합니다.
</details>

<details>

<summary>``func bottomSheet<V>(isPresented: Binding<Bool>, isFullScreenCover: Bool, needHandle: Bool, resize: BottomSheet.Resize, ignoresEdgeInsets: Bool, navigation: (() -> ModalNavigation)?, actionArea: (() -> ActionArea)?, onDismiss: (() -> Void)?, () -> V) -> some View``</summary>


바텀 시트 모달을 표시합니다.
> **Deprecated**
>
> contentHorizontalPadding을 쓰세요. ignoresEdgeInsets: true는 contentHorizontalPadding: .none과 같습니다.


- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `isFullScreenCover` | 전체 화면 모달로 표시할지 여부, 생략하면 기본값으로 `false` 적용 |
  | `needHandle` | 상단 핸들 표시 여부, 생략하면 기본값으로 `true` 적용 |
  | `resize` | 모달 크기 조절 방식, 생략하면 기본값으로 `.hug` 적용 |
  | `ignoresEdgeInsets` | 모달 내용이 Edge 인셋을 무시할지 여부 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `actionArea` | 모달 하단에 배치할 ActionArea를 만드는 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `onDismiss` | 모달이 닫힐때 호출될 클로저 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |

- **Return Value**

  바텀 시트 모달이 적용된 뷰
</details>


</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



