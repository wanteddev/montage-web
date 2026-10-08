---
title: Text area
description: 여러 줄의 텍스트 입력을 위한 컴포넌트입니다.
---

```swift
@MainActor struct TextArea
```

## Overview

이 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 영역을 제공합니다. 사이즈, 리사이즈 옵션, 하단 리소스 등 다양한 기능을 지원합니다.

```swift
@State private var longText = ""
@FocusState private var isFocused: Bool

// 기본 텍스트 영역
TextArea(text: $longText, focus: $isFocused)
    .placeholder("의견을 입력해주세요")

// 중간 사이즈와 고정 크기를 가진 텍스트 영역
TextArea(text: $longText)
    .size(.medium)
    .resize(.fixed(min: 108, max: 200))

// 입력 글자 수를 추적하는 텍스트 영역
@State private var characterCount = 0
TextArea(text: $longText)
    .maxLength(100)
    .onTextChange { characterCount = $0.count }

// 자동수정·맞춤법 검사를 끈 텍스트 영역
TextArea(text: $longText)
    .autocorrectionDisabled()

// 비활성화
TextArea(text: $longText)
    .disabled(true)
```

> **Note**
>
> 비활성화는 SwiftUI 표준 `disabled(_:)`를 사용합니다. 상위 컨테이너에 한 번 걸면 하위 컴포넌트까지 함께 비활성 스타일로 표시됩니다.

## Topics

### Initializers

<details>

<summary>``init(text: Binding<String>, focus: FocusState<Bool>.Binding?)``</summary>


텍스트 영역을 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 텍스트 영역의 값을 바인딩 |
  | `focus` | 텍스트 영역의 포커스 상태를 바인딩, 생략하면 기본값으로 `nil` 적용 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
- **Discussion**

  항상 [FormControl](/documentation/montage/formcontrol.md)로 감싼다. 라벨·메시지 유무로 분기하면 값이 런타임에 바뀔 때 뷰 identity가 갈려 입력 중 포커스가 풀리므로, 설정이 비어 있어도 래퍼를 유지한다.
</details>

### Instance Methods

<details>

<summary>``func accessory<Accessory>(() -> Accessory) -> TextArea``</summary>


메시지 행의 오른쪽에 표시할 액세서리 뷰를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `accessory` | 표시할 액세서리 뷰 빌더 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  입력 **바깥** 아래에 붙는 보조 요소입니다. 입력 상자 **안쪽** 하단에 요소를 배치하려면 [bottomResources(leading:trailing:leadingResourceSpacing:trailingResourceSpacing:)](/documentation/montage/textarea/bottomresources(leading:trailing:leadingresourcespacing:trailingresourcespacing:).md)를 사용하세요.
</details>
<details>

<summary>``func autocorrectionDisabled(Bool) -> TextArea``</summary>


자동수정과 맞춤법 검사를 비활성화할지 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  코드 조각·고유명사처럼 사전에 없는 텍스트를 자주 입력하는 화면에서 사용합니다. `true`이면 입력 중 자동수정이 적용되지 않고, 맞춤법 검사 밑줄도 표시되지 않습니다.

  텍스트 영역의 입력부는 `UITextView`를 감싼 뷰이므로 SwiftUI의 `autocorrectionDisabled(_:)`를 인스턴스 바깥에 붙여도 입력부까지 전달되지 않습니다. 반드시 이 모디파이어로 설정해 주세요.
</details>
<details>

<summary>``func bottomResources(leading: [Resource.Leading], trailing: [Resource.Trailing], leadingResourceSpacing: CGFloat?, trailingResourceSpacing: CGFloat?) -> TextArea``</summary>


텍스트 영역 하단에 표시할 UI 요소를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `leading` | 왼쪽에 표시할 UI 요소 배열 (최대 3개) |
  | `trailing` | 오른쪽에 표시할 UI 요소 배열 (최대 3개) |
  | `leadingResourceSpacing` | 왼쪽 요소 간의 간격, 생략하면 사이즈별 기본값(large 8 / medium 6) 적용 |
  | `trailingResourceSpacing` | 오른쪽 요소 간의 간격, 생략하면 사이즈별 기본값(large 8 / medium 6) 적용 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**
  > **Note**
  >
  > `button`·`primaryIconButton`은 디자인 가이드상 trailing 전용이므로 [TextArea.Resource.Trailing](/documentation/montage/textarea/resource/trailing.md)에만 정의되어 있습니다. leading에 넘기면 컴파일되지 않습니다.

</details>
<details>

<summary>``func inputTransform(((String) -> String)?) -> TextArea``</summary>


입력되는 텍스트를 입력 시점에 변환할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `transform` | 입력 조각을 변환하는 클로저, nil이면 변환하지 않음 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  사용자가 입력하거나 붙여넣는 텍스트(replacement) 조각에 적용됩니다. emoji 제거 등 도메인별 정규화에 사용합니다. 사후 변형이 아닌 입력 단계에서 적용되므로 UITextView의 텍스트와 UndoManager가 일관되게 유지됩니다.
</details>
<details>

<summary>``func label(String?, required: Bool) -> TextArea``</summary>


제목(라벨)을 붙이고 필수 표시(`*`) 여부를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 라벨 텍스트. `nil`이거나 비어 있으면 라벨을 표시하지 않습니다. |
  | `required` | 필수 입력 표시(`*`) 여부, 생략하면 기본값으로 `false` 적용 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  이 모디파이어를 쓰면 텍스트 영역이 [FormControl](/documentation/montage/formcontrol.md)로 감싸져 라벨·메시지·액세서리가 함께 배치되고, 라벨이 입력의 접근성 라벨로 연결됩니다.

  ```swift
  TextArea(text: $bio)
      .placeholder("자기소개를 입력하세요")
      .label("자기소개")
      .message("200자 이내로 작성해 주세요.")
  ```

</details>
<details>

<summary>``func labelPlacement(FormControl.LabelPlacement) -> TextArea``</summary>


라벨 위치를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placement` | 라벨 위치, 생략하면 기본값으로 `.top` 적용 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**
  > **Note**
  >
  > `.leading` 배치에서 라벨은 입력 전체가 아니라 **첫 줄** 중앙에 정렬됩니다.

</details>
<details>

<summary>``func labelWidth(CGFloat) -> TextArea``</summary>


leading 배치에서 라벨 열의 폭을 명시적으로 고정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `width` | 라벨 열 폭(pt) |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  여러 입력의 라벨 열을 한꺼번에 맞추려면 각 입력에 반복하지 말고 [FormControlGroup](/documentation/montage/formcontrolgroup.md)을 사용하세요. [FormControl.LabelPlacement.top](/documentation/montage/formcontrol/labelplacement/top.md) 배치에는 영향이 없습니다.
</details>
<details>

<summary>``func maxLength(Int?) -> TextArea``</summary>


최대 글자 수를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `limit` | 최대 글자 수, nil이면 제한 없음 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  카운터 UI를 표시하지 않고 입력 길이만 제한합니다. 사후 변형이 아닌 입력 단계에서 제한하므로 UITextView의 텍스트와 UndoManager가 일관되게 유지되며, 초과 입력/붙여넣기는 허용분만 잘라서 삽입됩니다.
</details>
<details>

<summary>``func message(String?) -> TextArea``</summary>


입력 아래에 표시할 도움말/에러 메시지를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 메시지 텍스트. `nil`이거나 비어 있으면 메시지를 표시하지 않습니다. |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  메시지 색은 [negative(_:)](/documentation/montage/textarea/negative(_:).md)에 따라 결정되며 오류 상태에서만 강조 색으로 표시됩니다. 메시지는 입력의 접근성 힌트로도 연결됩니다.
</details>
<details>

<summary>``func negative(Bool) -> TextArea``</summary>


텍스트 영역의 오류 상태를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `negative` | 오류 상태 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  오류 상태일 때는 텍스트 영역이 적색 테두리로 강조됩니다.
</details>
<details>

<summary>``func onTextChange((String) -> Void) -> TextArea``</summary>


텍스트가 변경될 때마다 호출할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `handler` | 변경된 텍스트를 전달받는 클로저 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
- **Discussion**

  변경된 전체 텍스트를 전달하므로 글자 수 계산(`text.count`), 유효성 검사 등 다양한 후처리에 사용할 수 있습니다.
</details>
<details>

<summary>``func placeholder(String?) -> TextArea``</summary>


텍스트 영역에 입력된 텍스트가 없을 때 표시할 플레이스홀더를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placeholder` | 표시할 플레이스홀더 텍스트 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
</details>
<details>

<summary>``func resize(Resize) -> TextArea``</summary>


텍스트 영역의 크기 조절 방식을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `resize` | 크기 조절 방식 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
</details>
<details>

<summary>``func size(Size) -> TextArea``</summary>


텍스트 영역의 사이즈를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `size` | 텍스트 영역의 사이즈 |

- **Return Value**

  수정된 텍스트 영역 인스턴스
</details>

### Enumerations

<details>

<summary>``enum Resize``</summary>


텍스트 영역의 크기 조절 방식을 정의합니다.
#### Enumeration Cases

<details>

<summary>``case fixed(min: CGFloat, max: CGFloat)``</summary>


텍스트 영역의 최소 및 최대 높이를 지정합니다. 초과 부분은 스크롤할 수 있습니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `min` | 최소 높이 |
  | `max` | 최대 높이 |

</details>
<details>

<summary>``case limit``</summary>


최대 6줄까지 표시되며, 초과 부분은 스크롤할 수 있습니다. 최소 높이는 2줄 기준입니다.
</details>
<details>

<summary>``case normal``</summary>


줄 수 제한이 없으며, 입력된 텍스트에 따라 영역이 자동으로 확장됩니다. 최소 높이는 2줄 기준입니다.
</details>

</details>
<details>

<summary>``enum Resource``</summary>


텍스트 영역 하단(Bottom Content)에 표시할 요소들의 Namespace입니다.
- **Overview**

  슬롯마다 쓸 수 있는 요소가 다르므로 슬롯별로 타입을 나눠 두었습니다. 예를 들어 [TextArea.Resource.Trailing.button(color:title:handler:)](/documentation/montage/textarea/resource/trailing/button(color:title:handler:).md)는 디자인 가이드상 trailing 전용이라 [bottomResources(leading:trailing:leadingResourceSpacing:trailingResourceSpacing:)](/documentation/montage/textarea/bottomresources(leading:trailing:leadingresourcespacing:trailingresourcespacing:).md)의 `trailing`에만 넘길 수 있고, `leading`에 넘기면 컴파일되지 않습니다.

  각 요소의 크기는 TextArea의 [TextArea.Size](/documentation/montage/textarea/size.md)에 따라 자동으로 조정됩니다. 목록에 없는 구성이 필요하면 각 타입의 `slot(_:)` 팩토리를 사용합니다.
#### Enumerations

<details>

<summary>``enum Leading``</summary>


Bottom Content 왼쪽에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case contentBadge(ContentBadge.Variant, title: String)``</summary>


콘텐츠 뱃지

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 뱃지 변형 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `title` | 뱃지 텍스트 |

</details>
<details>

<summary>``case icon(Icon, tintColor: SwiftUI.Color)``</summary>


단순 아이콘

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralQuaternary)` 적용 |

</details>
<details>

<summary>``case iconButton(icon: Icon, tintColor: SwiftUI.Color, handler: (() -> Void)?)``</summary>


아이콘 버튼(배경 없음)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 버튼 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralTertiary)` 적용 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case segmentedControl(selectedIndex: Binding<Int>, icons: [Icon], accessibilityLabels: [String], onSelect: ((Int) -> Void)?)``</summary>


세그먼트 컨트롤(아이콘 전용). 표준 [SegmentedControl](/documentation/montage/segmentedcontrol.md)을 `small` 크기·`iconOnly`로 렌더링하며 정방형 아이콘만 받습니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `selectedIndex` | 선택된 세그먼트 인덱스 바인딩 |
  | `icons` | 세그먼트 아이콘 배열 |
  | `accessibilityLabels` | 세그먼트별 VoiceOver 라벨 배열, 생략하면 기본값으로 `[]` 적용 |
  | `onSelect` | 선택 변경 핸들러, 생략하면 기본값으로 `nil` 적용 |

- **Discussion**

  `accessibilityLabels`는 각 세그먼트의 항목 제목으로 전달됩니다. 라벨을 생략하거나 개수가 부족하면 해당 세그먼트는 아이콘 이름으로 대체됩니다.
</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/textarea/resource/leading/slot(_:).md) 팩토리로 생성합니다.
</details>

##### Type Methods

<details>

<summary>``static func slot<V>(() -> V) -> Leading``</summary>


목록에 없는 구성을 직접 배치합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 뷰를 생성하는 클로저 |

- **Return Value**

  구성된 요소
</details>

</details>
<details>

<summary>``enum Trailing``</summary>


Bottom Content 오른쪽에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case button(color: Button.Color, title: String, handler: (() -> Void)?)``</summary>


텍스트 버튼(Outlined)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 버튼 색상, 생략하면 기본값으로 `.assistive` 적용 |
  | `title` | 버튼 텍스트 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case contentBadge(ContentBadge.Variant, title: String)``</summary>


콘텐츠 뱃지

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 뱃지 변형 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `title` | 뱃지 텍스트 |

</details>
<details>

<summary>``case icon(Icon, tintColor: SwiftUI.Color)``</summary>


단순 아이콘

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralQuaternary)` 적용 |

</details>
<details>

<summary>``case iconButton(icon: Icon, tintColor: SwiftUI.Color, handler: (() -> Void)?)``</summary>


아이콘 버튼(배경 없음)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 버튼 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralTertiary)` 적용 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case primaryIconButton(icon: Icon, handler: (() -> Void)?)``</summary>


Primary 아이콘 버튼(Solid)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 버튼 아이콘 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case segmentedControl(selectedIndex: Binding<Int>, icons: [Icon], accessibilityLabels: [String], onSelect: ((Int) -> Void)?)``</summary>


세그먼트 컨트롤(아이콘 전용). 표준 [SegmentedControl](/documentation/montage/segmentedcontrol.md)을 `small` 크기·`iconOnly`로 렌더링하며 정방형 아이콘만 받습니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `selectedIndex` | 선택된 세그먼트 인덱스 바인딩 |
  | `icons` | 세그먼트 아이콘 배열 |
  | `accessibilityLabels` | 세그먼트별 VoiceOver 라벨 배열, 생략하면 기본값으로 `[]` 적용 |
  | `onSelect` | 선택 변경 핸들러, 생략하면 기본값으로 `nil` 적용 |

- **Discussion**

  `accessibilityLabels`는 각 세그먼트의 항목 제목으로 전달됩니다. 라벨을 생략하거나 개수가 부족하면 해당 세그먼트는 아이콘 이름으로 대체됩니다.
</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/textarea/resource/trailing/slot(_:).md) 팩토리로 생성합니다.
</details>

##### Type Methods

<details>

<summary>``static func slot<V>(() -> V) -> Trailing``</summary>


목록에 없는 구성을 직접 배치합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 뷰를 생성하는 클로저 |

- **Return Value**

  구성된 요소
</details>

</details>

</details>
<details>

<summary>``enum Size``</summary>


텍스트 영역의 사이즈를 정의합니다.
- **Overview**

  사이즈에 따라 모서리 반경, 최소 콘텐츠 높이, 입력 타이포그래피, 하단 리소스 크기가 함께 결정됩니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>


큰 사이즈 (입력 `body2`, 최소 콘텐츠 높이 48)
</details>
<details>

<summary>``case medium``</summary>


중간 사이즈 (입력 `label1`, 최소 콘텐츠 높이 44)
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



