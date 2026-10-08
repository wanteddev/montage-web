---
title: Form control group
description: 라벨이 붙은 입력을 세로로 쌓을 때 라벨 열 폭을 통일해 입력의 시작 위치를 정렬하는 컨테이너입니다.
---

```swift
@MainActor struct FormControlGroup<Content> where Content : View
```

## Overview

Leading 배치([FormControl.LabelPlacement.leading](/documentation/montage/formcontrol/labelplacement/leading.md))의 라벨들을 대상으로, 내부 라벨의 본연 폭 중 가장 긴 값으로 라벨 열이 맞춰집니다.

개별 행에 폭을 지정할 필요 없이 이 컨테이너로 감싸기만 하면, 내부 leading 라벨들의 본연 폭 중 최댓값으로 라벨 열이 맞춰집니다. Dynamic Type·다국어로 라벨 길이가 바뀌어도 자동으로 재정렬되므로 호출부에 고정 폭(매직 넘버)을 두지 않아도 됩니다.

```swift
FormControlGroup {
    TextField(text: $name)
        .labelPlacement(.leading)
        .label("이름")

    TextField(text: $email)
        .labelPlacement(.leading)
        .label("이메일 주소")
}
// → 두 입력의 leading이 정렬되고, 라벨 열은 "이메일 주소" 폭으로 통일된다.
```

앱에서 만든 커스텀 입력은 [FormControl](/documentation/montage/formcontrol.md)로 직접 감싸 같은 그룹에 섞어 넣을 수 있습니다.

자동 측정 대신 라벨 열 폭을 **고정**하고 싶으면 `labelWidth`를 지정합니다. 이 경우 측정을 건너뛰고 모든 행이 그 폭을 씁니다. (여러 화면에서 동일한 폭을 맞추거나, 측정으로 인한 1프레임 흔들림을 피하고 싶을 때)

```swift
FormControlGroup(labelWidth: .dimension64) { … }   // 전 행 라벨 폭을 64로 고정
```

> **Note**
>
> [FormControl.LabelPlacement.top](/documentation/montage/formcontrol/labelplacement/top.md) 배치에는 영향을 주지 않습니다. 특정 행 하나만 다른 폭으로 두려면 그 행에 [labelWidth(_:)](/documentation/montage/formcontrol/labelwidth(_:).md)(또는 입력 컴포넌트의 같은 이름 모디파이어)를 사용하세요. per-control 값이 컨테이너 폭보다 우선합니다.

## Topics

### Initializers

<details>

<summary>``init(labelWidth: CGFloat?, spacing: CGFloat, content: () -> Content)``</summary>


컨테이너를 생성합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `labelWidth` | 라벨 열 폭을 고정할 값. 생략(`nil`)하면 내부 라벨 최댓값으로 **자동 측정**한다. |
  | `spacing` | FormControl 사이의 세로 간격. 생략하면 기본값으로 `.spacing16` 적용 |
  | `content` | 세로로 쌓을 입력 컴포넌트(또는 [FormControl](/documentation/montage/formcontrol.md)) 목록 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



