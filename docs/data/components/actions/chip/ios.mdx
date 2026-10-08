---
title: Chip
description: 칩 컴포넌트입니다.
---

```swift
@MainActor struct Chip
```

## Overview

텍스트와 콘텐츠를 포함하는 칩 형태의 버튼입니다. 다양한 크기와 스타일을 지원하며, 탭 이벤트를 처리할 수 있습니다.

```swift
Chip(
    variant: .solid,
    size: .medium,
    text: "액션"
)
.backgroundColor(.semantic(.surfaceBrandPrimary))
.fontColor(.semantic(.staticWhite))
.leadingContent {
    Image.icon(.heart)
        .resizable()
        .renderingMode(.template)
        .frame(width: 14, height: 14)
        .foregroundStyle(SwiftUI.Color.semantic(.foregroundNeutralPrimary))
}

// 비활성화
Chip(text: "필터")
    .disabled(true)
```

## 콘텐츠 슬롯

텍스트 앞뒤에 임의의 뷰를 하나씩 넣을 수 있는 슬롯입니다.

- [leadingContent(_:)](/documentation/montage/chip/leadingcontent(_:).md): 텍스트 앞
- [trailingContent(_:)](/documentation/montage/chip/trailingcontent(_:).md): 텍스트 뒤

슬롯 뷰는 가공 없이 그대로 배치되므로 크기와 색상은 사용처에서 정합니다. 시안상 슬롯은 정사각 아이콘 자리이며 권장 크기는 `large` 16, `medium`·`small` 14, `xsmall` 12입니다.

```swift
Chip(text: "김티드")
    .leadingContent {
        Thumbnail(urlString: profileImageURL, ratio: .r1x1)
            .width(14)
    }
```

> **Note**
>
> 비활성화는 SwiftUI 표준 `disabled(_:)`를 사용합니다. 상위 컨테이너에 한 번 걸면 하위 컴포넌트까지 함께 비활성 스타일로 표시됩니다. 슬롯 뷰에는 색을 강제하지 않으므로, 비활성 상태의 색 변화가 필요하면 사용처에서 처리합니다.

## Topics

### Initializers

<details>

<summary>``init(variant: Variant, size: Size, text: String, handler: (() -> Void)?)``</summary>


칩을 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 칩의 외관 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `size` | 칩의 크기, 생략하면 기본값으로 `.medium` 적용 |
  | `text` | 칩에 표시할 텍스트 |
  | `handler` | 칩 클릭 시 실행할 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func active(Bool) -> Chip``</summary>


칩의 선택 상태를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `active` | 선택 상태 여부 |

- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func activeColor(SwiftUI.Color) -> Chip``</summary>


칩의 활성화 상태 색상을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 활성화 상태일 때의 색상 |

- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func backgroundColor(SwiftUI.Color) -> Chip``</summary>


칩의 배경색을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 배경색 |

- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func borderColor(SwiftUI.Color) -> Chip``</summary>


칩의 테두리 색상을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 테두리 색상 |

- **Return Value**

  수정된 칩 인스턴스
- **Discussion**
  > **Note**
  >
  > `outlined` variant에서만 적용됩니다. (`solid`는 테두리를 그리지 않습니다.)

</details>
<details>

<summary>``func fontColor(SwiftUI.Color) -> Chip``</summary>


칩의 텍스트 색상을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 텍스트 색상 |

- **Return Value**

  수정된 칩 인스턴스
</details>
<details>

<summary>``func leadingContent<V>(() -> V) -> Chip``</summary>


텍스트 앞에 표시할 콘텐츠를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 뷰를 생성하는 클로저 |

- **Return Value**

  수정된 칩 인스턴스
- **Discussion**

  슬롯 뷰는 가공 없이 그대로 배치되므로 크기와 색상은 사용처에서 정합니다. 시안상 권장 크기는 `large` 16, `medium`·`small` 14, `xsmall` 12입니다.

  ```swift
  Chip(text: "김티드")
      .leadingContent {
          Image.icon(.bell)
              .resizable()
              .renderingMode(.template)
              .frame(width: 14, height: 14)
              .foregroundStyle(SwiftUI.Color.semantic(.foregroundNeutralPrimary))
      }
  ```

  > **Note**
  >
  > 4.0.0에서 제거된 `leadingImage(_:)`·`imageColor(_:)`를 대체합니다. `leadingImage(Image.icon(.bell))`은 이 슬롯에서 아이콘을 직접 구성하는 형태로 옮겨집니다.

</details>
<details>

<summary>``func trailingContent<V>(() -> V) -> Chip``</summary>


텍스트 뒤에 표시할 콘텐츠를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 뷰를 생성하는 클로저 |

- **Return Value**

  수정된 칩 인스턴스
- **Discussion**

  슬롯 뷰는 가공 없이 그대로 배치되므로 크기와 색상은 사용처에서 정합니다. 시안상 권장 크기는 `large` 16, `medium`·`small` 14, `xsmall` 12입니다.

  ```swift
  Chip(text: "김티드")
      .trailingContent {
          Image.icon(.closeThick)
              .resizable()
              .renderingMode(.template)
              .frame(width: 14, height: 14)
              .foregroundStyle(SwiftUI.Color.semantic(.foregroundNeutralPrimary))
      }
  ```

  > **Note**
  >
  > 4.0.0에서 제거된 `trailingImage(_:)`·`imageColor(_:)`를 대체합니다. `trailingImage(Image.icon(.closeThick))`은 이 슬롯에서 아이콘을 직접 구성하는 형태로 옮겨집니다.

</details>

### Enumerations

<details>

<summary>``enum Size``</summary>


칩의 크기를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>


큰 크기
</details>
<details>

<summary>``case medium``</summary>


중간 크기
</details>
<details>

<summary>``case small``</summary>


작은 크기
</details>
<details>

<summary>``case xsmall``</summary>


가장 작은 크기
</details>

#### Initializers

<details>

<summary>``init?(rawValue: String)``</summary>

</details>

</details>
<details>

<summary>``enum Variant``</summary>


칩의 외관을 결정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case outlined``</summary>


테두리만 있는 아웃라인 스타일
</details>
<details>

<summary>``case solid``</summary>


배경색이 채워진 스타일
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



