---
title: Form control
description: 입력 컨트롤에 제목(Label)과 도움말(Message)을 붙여 주고, 라벨 ↔ 입력 ↔ 메시지의 접근성 연결을 자동으로 처리하는 래퍼(wrapper) 컴포넌트입니다.
---

```swift
@MainActor struct FormControl
```

## Overview

FormControl은 단독으로 값을 입력받지 않습니다. 내부 슬롯(`input`)에 실제 입력 컴포넌트를 조합해 사용하며, 라벨·필수 표시(`*`)·도움말/에러 메시지·액세서리(글자 수 카운트 등)를 일관된 레이아웃으로 감싸 줍니다.

FormControl의 `.size(_:)`·`.status(_:)`는 슬롯 안의 Montage 입력 컴포넌트([TextField](/documentation/montage/textfield.md)·[TextArea](/documentation/montage/textarea.md)· [Select](/documentation/montage/select.md))에 자동으로 전파됩니다. 입력 쪽에서 값을 명시하면 그 값이 우선하므로, 보통은 FormControl에 한 번만 설정하면 됩니다.

```swift
FormControl {
    TextField(text: $email)
        .placeholder("이메일을 입력하세요")
}
.label("이메일", required: true)
.message("회사 이메일을 입력해 주세요.")

// 에러 상태 — FormControl에만 .status(.negative)를 주면 메시지 색과 입력 상태가 함께 바뀐다.
FormControl {
    TextField(text: $email)
}
.size(.medium)
.status(.negative)
.label("이메일", required: true)
.message("올바른 이메일 형식이 아닙니다.")
.accessory {
    Text("\(email.count)/100")
        .typography(variant: .caption1, weight: .regular, semantic: .foregroundNeutralTertiary)
}

// 라벨을 입력 왼쪽에 배치
FormControl {
    TextField(text: $name)
}
.labelPlacement(.leading)
.label("이름")
```

> **Note**
>
> Montage 입력 컴포넌트는 [label(_:required:)](/documentation/montage/textfield/label(_:required:).md) 등 같은 이름의 모디파이어를 직접 제공합니다. 단일 입력을 감쌀 때는 FormControl을 명시하지 않고 입력에 바로 붙이는 쪽이 간결하지만, 위 예제처럼 FormControl로 직접 감싸는 구성도 그대로 지원됩니다. 앱에서 만든 커스텀 입력을 감쌀 때나 입력 종류가 런타임에 바뀌어 래퍼 설정을 한곳에 모아 두고 싶을 때는 FormControl을 직접 쓰세요.

## Topics

### Structures

<details>

<summary>``struct Context``</summary>


입력 슬롯 클로저에 전달되는 FormControl의 현재 상태 컨텍스트입니다.
- **Overview**

  슬롯 입력 컴포넌트가 FormControl의 [FormControl.Size](/documentation/montage/formcontrol/size.md)·[FormControl.Status](/documentation/montage/formcontrol/status.md)를 그대로 반영하도록 현재 값을 묶어 전달합니다. 향후 항목이 추가돼도 클로저 시그니처는 바뀌지 않습니다.
#### Instance Properties

<details>

<summary>``let size: Size``</summary>


현재 FormControl 크기.
</details>
<details>

<summary>``let status: Status``</summary>


현재 FormControl 상태.
</details>

</details>

### Initializers

<details>

<summary>``init<Input>(input: () -> Input)``</summary>


입력 컴포넌트를 슬롯으로 받아 FormControl을 생성합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `input` | 감쌀 입력 컴포넌트를 반환하는 뷰 빌더 |

- **Discussion**

  FormControl의 [size(_:)](/documentation/montage/formcontrol/size(_:).md)·[status(_:)](/documentation/montage/formcontrol/status(_:).md)는 슬롯 안의 Montage 입력 컴포넌트에 자동으로 전파되므로 호출부에서 다시 넘길 필요가 없습니다.
</details>
<details>

<summary>``init<Input>(input: (Context) -> Input)``</summary>


현재 [FormControl.Context](/documentation/montage/formcontrol/context.md)를 전달받는 슬롯으로 FormControl을 생성합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `input` | 현재 [FormControl.Context](/documentation/montage/formcontrol/context.md)를 받아 감쌀 입력 컴포넌트를 반환하는 뷰 빌더 |

- **Discussion**

  크기·상태 전파는 Montage 입력 컴포넌트에만 자동 적용됩니다. 앱에서 만든 **커스텀 입력**이 FormControl의 크기·상태를 반영해야 할 때 이 초기화를 사용하세요.

  ```swift
  FormControl { context in
      MyCustomPicker(selection: $region)
          .compact(context.size == .medium)
          .invalid(context.status == .negative)
  }
  .status(.negative)
  .label("지역", required: true)
  ```

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func accessory<Accessory>(() -> Accessory) -> FormControl``</summary>


Footer 우측(trailing)에 표시할 액세서리 뷰를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `accessory` | 표시할 액세서리 뷰 빌더 |

- **Return Value**

  수정된 FormControl 컴포넌트
- **Discussion**

  글자 수 카운트, 타이머 등 입력 아래에 붙는 보조 요소를 자유롭게 구성할 수 있습니다. 스타일(타이포그래피·색)은 호출부에서 지정합니다.
</details>
<details>

<summary>``func label(String?, required: Bool) -> FormControl``</summary>


라벨 텍스트와 필수 표시 여부를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 라벨 텍스트. `nil`이거나 비어 있으면 라벨을 표시하지 않습니다. |
  | `required` | 필수 입력 표시(`*`) 여부. 생략하면 기본값으로 `false` 적용 |

- **Return Value**

  수정된 FormControl 컴포넌트
</details>
<details>

<summary>``func labelPlacement(LabelPlacement) -> FormControl``</summary>


라벨 위치를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placement` | 라벨 위치. 생략하면 기본값으로 `.top` 적용 |

- **Return Value**

  수정된 FormControl 컴포넌트
</details>
<details>

<summary>``func labelWidth(CGFloat) -> FormControl``</summary>


leading 배치에서 이 컨트롤의 라벨 폭을 명시적으로 고정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `width` | 라벨 열 폭(pt). |

- **Return Value**

  수정된 FormControl 컴포넌트
- **Discussion**

  주 용도는 두 가지입니다. (1) 단독 leading FormControl에서 라벨 폭을 스펙값으로 맞출 때, 그리고 (2) [FormControlGroup](/documentation/montage/formcontrolgroup.md) 안에서 특정 행 하나만 다른 폭으로 둘 때(per-control 값이 컨테이너 폭보다 우선).

  컬럼 전체를 고정 폭으로 맞추려면 각 컨트롤에 반복하지 말고 [FormControlGroup](/documentation/montage/formcontrolgroup.md)의 `labelWidth`를 쓰세요. [FormControl.LabelPlacement.top](/documentation/montage/formcontrol/labelplacement/top.md) 배치에는 영향이 없습니다.
</details>
<details>

<summary>``func message(String?) -> FormControl``</summary>


도움말/에러 메시지를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 메시지 텍스트. `nil`이거나 비어 있으면 메시지를 표시하지 않습니다. |

- **Return Value**

  수정된 FormControl 컴포넌트
- **Discussion**
  > **Note**
  >
  > 메시지 색은 [status(_:)](/documentation/montage/formcontrol/status(_:).md)에 따라 결정됩니다. `.negative`에서만 강조 색으로 표시됩니다.

</details>
<details>

<summary>``func size(Size) -> FormControl``</summary>


크기를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `size` | FormControl 크기. 생략하면 기본값으로 `.large` 적용 |

- **Return Value**

  수정된 FormControl 컴포넌트
</details>
<details>

<summary>``func status(Status) -> FormControl``</summary>


상태를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `status` | FormControl 상태. 생략하면 기본값으로 `.normal` 적용 |

- **Return Value**

  수정된 FormControl 컴포넌트
</details>

### Enumerations

<details>

<summary>``enum LabelPlacement``</summary>


라벨의 위치입니다.
#### Enumeration Cases

<details>

<summary>``case leading``</summary>


라벨을 입력의 leading 쪽에 가로로 배치하고, 입력 슬롯의 **첫 줄 중앙**에 맞춥니다. (단일 행 입력은 입력 세로 중앙과 같고, 다중 행 입력은 입력 전체가 아니라 첫 줄을 기준으로 정렬됩니다.)
</details>
<details>

<summary>``case top``</summary>


라벨을 입력 위에 세로로 배치합니다. (기본)
</details>

</details>
<details>

<summary>``enum Size``</summary>


FormControl의 크기입니다. 라벨 타이포그래피를 결정합니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>


큰 크기 (라벨 `label1`)
</details>
<details>

<summary>``case medium``</summary>


중간 크기 (라벨 `label2`)
</details>

</details>
<details>

<summary>``enum Status``</summary>


FormControl의 상태입니다. 메시지의 색을 결정합니다.
#### Enumeration Cases

<details>

<summary>``case negative``</summary>


에러 상태. 메시지는 강조 색(`foregroundNegativePrimary`)으로 표시됩니다.
</details>
<details>

<summary>``case normal``</summary>


기본 상태. 메시지는 도움말 색(`foregroundNeutralTertiary`)으로 표시됩니다.
</details>
<details>

<summary>``case positive``</summary>


성공 상태. 메시지는 기본 도움말과 동일한 색(`foregroundNeutralTertiary`)으로 표시됩니다.
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



