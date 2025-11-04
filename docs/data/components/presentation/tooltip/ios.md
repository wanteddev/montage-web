---
title: Tooltip
description: UI 요소 주변에 추가 정보나 설명을 제공하는 툴팁 컴포넌트입니다.
---

```swift
enum Tooltip
```

## Overview

툴팁은 사용자가 특정 UI 요소를 이해하는데 도움이 되는 짧은 설명을 보여주기 위해 사용됩니다. 화살표가 있는 말풍선 형태로 표시되며, 화살표의 위치와 방향을 설정할 수 있습니다.

```swift
// 버튼을 클릭하면 표시되는 툴팁 (click 모드)
@State private var showTooltip = false

Button {
    showTooltip.toggle()
}, label: {
    HStack {
        Text("Montage")
        Image.icon(.circleInfo)
    }
})
.tooltip(
    isPresented: $showTooltip,
    mode: .click,
    position: .top(),
    message: "Montage는 컴포넌트 기반의 디자인 시스템입니다."
)

// 화면에 진입하면 표시되는 툴팁 (always 모드)
Button("설정") {
    showTooltip.toggle()
    setupSomething() // 설정 화면으로 이동
}
.tooltip(
    isPresented: $showTooltip,
    mode: .always,
    position: .bottom(arrowPosition: .leading),
    size: .small,
    message: "서비스 이용을 위해 설정이 필요합니다."
)
```

## Topics

### Enumerations

<details>

<summary>``enum ActionMode``</summary>

툴팁의 표시 모드를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case always``</summary>

바인딩으로만 닫힘을 제어할 수 있습니다. 주로 화면이 노출될 때 항상 표시되는 툴팁에 사용됩니다.
</details>
<details>

<summary>``case click``</summary>

백그라운드를 터치하거나 스크롤을 할 시 닫힙니다. 주로 클릭 시에 표시되는 툴팁에 사용됩니다.
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
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

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Size``</summary>

툴팁의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case medium``</summary>

중간 크기
</details>
<details>

<summary>``case small``</summary>

작은 크기
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>

