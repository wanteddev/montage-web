---
title: Tooltip
description: UI 요소 주변에 추가 정보나 설명을 제공하는 툴팁 컴포넌트입니다.
---

```swift
enum Tooltip
```

## Overview

툴팁은 사용자가 특정 UI 요소를 이해하는데 도움이 되는 짧은 설명을 보여주기 위해 사용됩니다. 화살표가 있는 말풍선 형태로 표시되며, 화살표의 위치와 방향을 설정할 수 있습니다. 또한 닫기 버튼과 액션 버튼을 추가할 수 있습니다.

```swift
// 기본 툴팁 표시
@State private var showTooltip = false

Button("도움말") {
    showTooltip.toggle()
}
.modifier(
    Tooltip.Modifier(
        isPresented: $showTooltip,
        position: .top(),
        message: "이 버튼을 클릭하면 도움말이 표시됩니다."
    )
)

// 버튼이 있는 툴팁
Button("설정") {
    showTooltip.toggle()
}
.modifier(
    Tooltip.Modifier(
        isPresented: $showTooltip,
        position: .bottom(arrowPosition: .leading),
        message: "서비스 이용을 위해 설정이 필요합니다.",
        showCloseButton: true,
        buttonInfo: Tooltip.ButtonInfo(
            title: "설정하기",
            action: {
                // 설정 화면으로 이동
            }
        )
    )
)
```

## Topics

### Structures

<details>

<summary>``struct ButtonInfo``</summary>

툴팁에 표시되는 버튼의 정보를 정의하는 구조체입니다.
#### Initializers

<details>

<summary>``init(title: String, action: () -> Void)``</summary>

ButtonInfo를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `title` | 버튼에 표시될 텍스트 |
  | `action` | 버튼 클릭 시 실행될 동작 |
</details>

#### Instance Properties

<details>

<summary>``let action: () -> Void``</summary>
</details>
<details>

<summary>``let title: String``</summary>
</details>

</details>

___
### Enumerations

<details>

<summary>``enum Position``</summary>

툴팁이 표시될 위치를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case bottom(arrowPosition: HorizontalAlignment)``</summary>

하단에 툴팁 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `arrowPosition` | 화살표의 수평 위치 (기본값: .center) |
</details>
<details>

<summary>``case leading(arrowPosition: VerticalAlignment)``</summary>

왼쪽에 툴팁 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `arrowPosition` | 화살표의 수직 위치 (기본값: .center) |
</details>
<details>

<summary>``case top(arrowPosition: HorizontalAlignment)``</summary>

상단에 툴팁 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `arrowPosition` | 화살표의 수평 위치 (기본값: .center) |
</details>
<details>

<summary>``case trailing(arrowPosition: VerticalAlignment)``</summary>

오른쪽에 툴팁 표시

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `arrowPosition` | 화살표의 수직 위치 (기본값: .center) |
</details>

</details>

