---
title: List cell
description: 텍스트와 콘텐츠를 포함하는 리스트 아이템 컴포넌트입니다.
---

```swift
@MainActor struct ListCell
```

## Overview

`ListCell`은 앱 내에서 리스트 형태로 정보를 표시할 때 사용되는 기본 컴포넌트입니다. 라벨, 부가 설명과 함께 네 종류의 콘텐츠 슬롯([leadingResources(_:)](/documentation/montage/listcell/leadingresources(_:).md), [labelTrailingResources(_:)](/documentation/montage/listcell/labeltrailingresources(_:).md), [trailingResources(_:)](/documentation/montage/listcell/trailingresources(_:).md), [extraResources(_:)](/documentation/montage/listcell/extraresources(_:).md))을 제공하며 다양한 스타일로 커스터마이징할 수 있습니다.

```swift
// 기본 셀
ListCell(label: "기본 셀")

// 추가 설명이 있는 셀
ListCell(label: "설명이 있는 셀")
    .description("부가 설명 텍스트")

// 리딩 요소와 선택 상태의 셀
ListCell(label: "커스텀 셀", onTap: {
    print("셀이 탭되었습니다")
})
.leadingResources([.icon(.person)])
.selected(true)
.chevron(true)
```

## 콘텐츠 슬롯

네 슬롯은 셀 안에서 각각 다음 위치를 차지하며, 슬롯마다 여러 요소를 나열할 수 있습니다. 슬롯에 넣을 수 있는 요소는 [ListCell.Resource](/documentation/montage/listcell/resource.md)에 슬롯별로 정의되어 있어, 다른 슬롯 전용 요소를 넘기면 컴파일되지 않습니다.

- [leadingResources(_:)](/documentation/montage/listcell/leadingresources(_:).md): 라벨 앞, 항목 간 간격 8
- [labelTrailingResources(_:)](/documentation/montage/listcell/labeltrailingresources(_:).md): 라벨 바로 뒤, 항목 간 간격 4
- [trailingResources(_:)](/documentation/montage/listcell/trailingresources(_:).md): 셀 오른쪽 끝, 항목 간 간격 8
- [extraResources(_:)](/documentation/montage/listcell/extraresources(_:).md): 설명 아래, 항목 간 간격 6

```swift
ListCell(label: "김티드")
    .description("iOS 개발자")
    .labelTrailingResources([.contentBadge(title: "신규")])
    .extraResources([.contentBadge(.outlined, title: "서울")])
    .trailingResources([.value("값")])
```

목록에 없는 구성이 필요하면 각 슬롯 타입의 `slot(_:)` 팩토리로 임의 뷰를 넣을 수 있습니다.

```swift
ListCell(label: "커스텀")
    .trailingResources([.slot { MyCustomView() }])
```

## 셀 형태

셀이 놓이는 리스트를 기준으로 두 형태 중 하나를 [variant(_:)](/documentation/montage/listcell/variant(_:).md)로 정합니다. 좌우 여백을 리스트가 주는 [ListCell.Variant.inset](/documentation/montage/listcell/variant/inset.md)이 기본값이고, 셀이 리스트 폭을 채우며 좌우 여백을 직접 갖는 형태는 [ListCell.Variant.full](/documentation/montage/listcell/variant/full.md)입니다. 콘텐츠가 놓이는 자리는 두 형태가 같고, 인터랙션 배경이 리스트 좌우 끝까지 닿는지만 달라집니다.

```swift
// 리스트가 좌우 여백을 주는 경우 (기본값)
ListCell(label: "메뉴 항목")

// 셀이 리스트 폭을 채우는 경우
ListCell(label: "설정 항목")
    .variant(.full)
```

## 비활성화

비활성화는 SwiftUI 표준 `disabled(_:)`를 사용합니다. 상위 컨테이너에 한 번 걸면 하위 컴포넌트까지 함께 비활성 스타일로 표시됩니다. 비활성 셀은 탭 이벤트를 받지 않으며 라벨·설명·콘텐츠 슬롯에 `foregroundDisablePrimary` 색상이 적용됩니다.

```swift
ListCell(label: "비활성 셀")
    .disabled(true)
```

> **Note**
>
> 콘텐츠 슬롯에는 전경색으로 전달되므로, 슬롯 안에서 색상을 직접 지정한 뷰에는 적용되지 않습니다.

## Topics

### Initializers

<details>

<summary>``init(label: String, onTap: (() -> Void)?)``</summary>


셀 컴포넌트를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `label` | 셀에 표시할 제목 텍스트 |
  | `onTap` | 셀을 탭했을 때 실행할 클로저, 생략하면 기본값으로 `nil` 적용 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func chevron(Bool) -> ListCell``</summary>


셀 우측에 화살표(chevron) 아이콘을 추가합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `chevron` | 화살표 표시 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  주로 탭했을 때 다른 화면으로 이동하는 셀에 사용됩니다.
</details>
<details>

<summary>``func description(String?) -> ListCell``</summary>


셀에 부가 설명을 추가합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `description` | 표시할 설명 텍스트, 생략하면 기본값으로 `nil` 적용 (nil 설정 시 설명 제거) |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  설명은 라벨 아래에 작은 글씨로 표시되는 부가 설명 텍스트입니다.
</details>
<details>

<summary>``func divider(Bool) -> ListCell``</summary>


셀 하단에 구분선을 추가합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `divider` | 구분선 표시 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
</details>
<details>

<summary>``func extraResources([Resource.Extra]) -> ListCell``</summary>


설명 아래에 표시할 요소를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `resources` | 표시할 요소 목록 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  셀 폭을 모두 사용하며, 여러 개를 넘기면 6포인트 간격으로 가로 배치됩니다.

  ```swift
  ListCell(label: "김티드")
      .description("iOS 개발자")
      .extraResources([
          .contentBadge(.outlined, title: "서울"),
          .contentBadge(.outlined, title: "5년차")
      ])
  ```

</details>
<details>

<summary>``func highlight(String) -> ListCell``</summary>


라벨과 설명의 특정 텍스트를 강조 표시합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 강조할 텍스트 문자열 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  지정한 문자열과 일치하는 부분을 굵은 글씨(bold)로 강조 표시합니다. 대소문자를 구분하지 않으며, 라벨과 [description(_:)](/documentation/montage/listcell/description(_:).md) 각각에서 첫 번째로 일치하는 부분만 강조됩니다.
</details>
<details>

<summary>``func labelColor(Color.Semantic) -> ListCell``</summary>


라벨 텍스트의 `color` 속성을 조정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 텍스트 색상 |

- **Return Value**

  수정된 ListCell 인스턴스
</details>
<details>

<summary>``func labelTrailingResources([Resource.LabelTrailing]) -> ListCell``</summary>


라벨 행의 오른쪽 끝에 표시할 요소를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `resources` | 표시할 요소 목록 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  배지나 인증 아이콘처럼 라벨에 딸린 요소를 배치할 때 사용합니다. 여러 개를 넘기면 4포인트 간격으로 가로 배치되며, 높이가 22포인트로 고정되어 행 높이를 늘리지 않습니다.

  ```swift
  ListCell(label: "김티드")
      .labelTrailingResources([.contentBadge(title: "신규")])
  ```

  > **Note**
  >
  > 라벨이 2줄 이상일 때 표시 위치는 [verticalAlign(_:)](/documentation/montage/listcell/verticalalign(_:).md)을 따릅니다.

</details>
<details>

<summary>``func labelVariant(Typography.Variant) -> ListCell``</summary>


라벨 텍스트의 `variant` 속성을 조정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 적용할 Typography 변형 스타일 |

- **Return Value**

  수정된 ListCell 인스턴스
</details>
<details>

<summary>``func labelWeight(Typography.Weight) -> ListCell``</summary>


라벨 텍스트의 `weight` 속성을 조정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `weight` | 적용할 텍스트 두께 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**
  > **Note**
  >
  > `selected`가 `true`인 셀은 이 값과 무관하게 `bold`로 표시됩니다.

</details>
<details>

<summary>``func leadingResources([Resource.Leading]) -> ListCell``</summary>


셀 좌측에 표시할 요소를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `resources` | 표시할 요소 목록 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  아이콘, 체크박스, 아바타, 썸네일 등을 셀 라벨 앞에 배치할 수 있습니다. 여러 개를 넘기면 8포인트 간격으로 가로 배치됩니다.

  ```swift
  ListCell(label: "김티드")
      .leadingResources([
          .checkbox(checked: isChecked),
          .avatar(profileImageURL, variant: .person)
      ])
  ```

</details>
<details>

<summary>``func selected(Bool) -> ListCell``</summary>


셀을 선택된 상태로 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `selected` | 선택 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  선택된 셀은 라벨 텍스트의 색상이 `surfaceBrandPrimary`로 변경되고, 텍스트 두께가 bold로 설정되며, trailing 영역에 체크 아이콘이 표시됩니다. [chevron(_:)](/documentation/montage/listcell/chevron(_:).md)을 켠 셀에서는 화살표가 체크 아이콘 오른쪽에 그대로 남습니다.
  > **Important**
  >
  > 체크 아이콘은 [trailingResources(_:)](/documentation/montage/listcell/trailingresources(_:).md)와 자리를 공유하므로 둘을 함께 표시할 수 없습니다. trailing 요소가 있으면 그쪽이 표시되고 체크 아이콘은 나타나지 않으며, 이때 선택 상태는 라벨의 색과 굵기로만 드러납니다. 선택 여부를 아이콘으로도 보여야 하면 [leadingResources(_:)](/documentation/montage/listcell/leadingresources(_:).md)의 체크박스·라디오를 사용하세요.

</details>
<details>

<summary>``func textEllipsis(Bool) -> ListCell``</summary>


텍스트의 생략 처리 여부를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `textEllipsis` | 텍스트 생략 처리 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  `true`로 설정하면 라벨과 설명이 각각 한 줄로 제한되고, 초과 텍스트는 말줄임 처리됩니다. `false`인 경우 두 텍스트 모두 줄 수 제한 없이 줄바꿈됩니다.
</details>
<details>

<summary>``func trailingResources([Resource.Trailing]) -> ListCell``</summary>


셀 우측에 표시할 요소를 지정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `resources` | 표시할 요소 목록 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  값 텍스트, 배지, 버튼, 스위치 등을 셀 오른쪽 끝에 배치할 수 있습니다. 여러 개를 넘기면 8포인트 간격으로 가로 배치됩니다.

  ```swift
  ListCell(label: "알림 받기")
      .trailingResources([.switch(checked: isOn, onSelect: { isOn = $0 })])
  ```

  > **Note**
  >
  > [selected(_:)](/documentation/montage/listcell/selected(_:).md)가 `true`인 셀에서도 이 요소가 우선 표시되며, 선택 상태의 체크 아이콘은 이 슬롯이 비었을 때만 나타납니다.

</details>
<details>

<summary>``func variant(Variant) -> ListCell``</summary>


셀의 형태를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 적용할 셀 형태, 생략하면 기본값으로 `.inset` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  셀의 좌우 여백과 인터랙션 효과(hover·pressed 배경)의 확장 폭·모서리 둥글기가 함께 정해집니다. 두 형태의 차이는 [ListCell.Variant](/documentation/montage/listcell/variant.md)를 참고하세요.

  ```swift
  // 리스트가 좌우 여백을 주는 경우 (기본값)
  ListCell(label: "메뉴 항목")
  
  // 셀이 리스트 폭을 채우는 경우
  ListCell(label: "설정 항목")
      .variant(.full)
  ```

  > **Note**
  >
  > 4.0.0에서 제거된 `fillWidth(_:)`·`interactionPadding(_:)`을 대체합니다. `fillWidth(false)`는 [ListCell.Variant.inset](/documentation/montage/listcell/variant/inset.md), `fillWidth(true)`는 [ListCell.Variant.full](/documentation/montage/listcell/variant/full.md)에 대응합니다.

</details>
<details>

<summary>``func verticalAlign(VerticalAlign) -> ListCell``</summary>


셀 내 콘텐츠의 수직 정렬을 조정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `verticalAlignment` | 적용할 수직 정렬 방식, 생략하면 기본값으로 `.top` 적용 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  라벨이 2줄 이상일 때 leading·labelTrailing·trailing 콘텐츠를 첫 행에 맞출지, 셀 중앙에 맞출지 정합니다.
</details>
<details>

<summary>``func verticalPadding(VerticalPadding) -> ListCell``</summary>


상하 여백의 크기를 조정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `verticalPadding` | 적용할 상하 여백 크기 |

- **Return Value**

  수정된 ListCell 인스턴스
- **Discussion**

  정해진 네 단계(`none`·`small`·`medium`·`large`)로 표현할 수 없는 간격은 [ListCell.VerticalPadding.custom(_:)](/documentation/montage/listcell/verticalpadding/custom(_:).md)으로 직접 지정할 수 있습니다.
  > **Note**
  >
  > 여백이 `0`인 셀은 인터랙션 효과를 표시하지 않습니다.

</details>

### Enumerations

<details>

<summary>``enum Resource``</summary>


[ListCell](/documentation/montage/listcell.md)의 각 슬롯에 표시할 요소들의 Namespace입니다.
- **Overview**

  슬롯마다 쓸 수 있는 요소가 다르므로 슬롯별로 타입을 나눠 두었습니다. 예를 들어 [ListCell.Resource.Trailing.switch(checked:onSelect:)](/documentation/montage/listcell/resource/trailing/switch(checked:onselect:).md)는 [trailingResources(_:)](/documentation/montage/listcell/trailingresources(_:).md)에만 넘길 수 있고, [leadingResources(_:)](/documentation/montage/listcell/leadingresources(_:).md)에 넘기면 컴파일되지 않습니다.

  미리 정의된 요소는 크기와 정렬이 셀 스펙(행 최소 높이 24)에 맞춰 고정됩니다. 목록에 없는 구성이 필요하면 각 타입의 `slot(_:)` 팩토리를 사용합니다.
  > **Important**
  >
  > `slot(_:)`으로 넣은 뷰에는 이 크기 제약이 적용되지 않습니다. 행 높이가 밀리지 않게 하려면 사용처에서 `frame(...)`이나 `fixedSize(...)`로 크기를 직접 정해야 합니다.

#### Enumerations

<details>

<summary>``enum Extra``</summary>


설명 아래([extraResources(_:)](/documentation/montage/listcell/extraresources(_:).md))에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case contentBadge(ContentBadge.Variant, title: String)``</summary>


콘텐츠 배지

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 배지 변형 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `title` | 배지 텍스트 |

</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/listcell/resource/extra/slot(_:).md) 팩토리로 생성합니다.
</details>
<details>

<summary>``case text(String)``</summary>


텍스트

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 표시할 텍스트 |

</details>

##### Type Methods

<details>

<summary>``static func slot<V>(() -> V) -> Extra``</summary>


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

<summary>``enum LabelTrailing``</summary>


라벨 행 오른쪽 끝([labelTrailingResources(_:)](/documentation/montage/listcell/labeltrailingresources(_:).md))에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case contentBadge(ContentBadge.Variant, title: String)``</summary>


콘텐츠 배지

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 배지 변형 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `title` | 배지 텍스트 |

</details>
<details>

<summary>``case icon(Icon, tintColor: SwiftUI.Color)``</summary>


아이콘 (22×22)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.surfaceBrandPrimary)` 적용 |

</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/listcell/resource/labeltrailing/slot(_:).md) 팩토리로 생성합니다.
</details>

##### Type Methods

<details>

<summary>``static func slot<V>(() -> V) -> LabelTrailing``</summary>


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

<summary>``enum Leading``</summary>


셀 좌측([leadingResources(_:)](/documentation/montage/listcell/leadingresources(_:).md))에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case avatar(String, variant: Avatar.Variant)``</summary>


아바타 (40×40)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `imageUrl` | 표시할 이미지의 URL 문자열 |
  | `variant` | 아바타 유형 |

</details>
<details>

<summary>``case checkbox(checked: Bool, onSelect: ((Bool) -> Void)?)``</summary>


체크박스

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `checked` | 선택 여부 |
  | `onSelect` | 선택 변경 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case icon(Icon, tintColor: SwiftUI.Color)``</summary>


아이콘 (22×22)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralTertiary)` 적용 |

</details>
<details>

<summary>``case largeIcon(Icon, tintColor: SwiftUI.Color)``</summary>


배경이 있는 큰 아이콘 (컨테이너 36×36 / 아이콘 20×20)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralSecondary)` 적용 |

</details>
<details>

<summary>``case radio(checked: Bool, onSelect: ((Bool) -> Void)?)``</summary>


라디오

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `checked` | 선택 여부 |
  | `onSelect` | 선택 변경 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/listcell/resource/leading/slot(_:).md) 팩토리로 생성합니다.
</details>
<details>

<summary>``case thumbnail(String)``</summary>


썸네일 (56×56 정사각, 둥근 모서리·테두리 적용)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `imageUrl` | 표시할 이미지의 URL 문자열 |

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


셀 우측([trailingResources(_:)](/documentation/montage/listcell/trailingresources(_:).md))에 표시할 요소입니다.
##### Enumeration Cases

<details>

<summary>``case button(title: String, color: Button.Color, handler: (() -> Void)?)``</summary>


버튼 (Solid / Small)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `title` | 버튼 텍스트 |
  | `color` | 버튼 색상, 생략하면 기본값으로 `.assistive` 적용 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case contentBadge(ContentBadge.Variant, title: String)``</summary>


콘텐츠 배지

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 배지 변형 스타일, 생략하면 기본값으로 `.solid` 적용 |
  | `title` | 배지 텍스트 |

</details>
<details>

<summary>``case icon(Icon, tintColor: SwiftUI.Color)``</summary>


아이콘 (22×22)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |
  | `tintColor` | 아이콘 색상, 생략하면 기본값으로 `.semantic(.foregroundNeutralSecondary)` 적용 |

</details>
<details>

<summary>``case iconButton(Icon, handler: (() -> Void)?)``</summary>


아이콘 버튼 (차지하는 자리 20×20 / 인터랙션 영역 32×32, 배경 없음)

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 버튼 아이콘 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case slotView(() -> AnyView)``</summary>


임의 뷰. [slot(_:)](/documentation/montage/listcell/resource/trailing/slot(_:).md) 팩토리로 생성합니다.
</details>
<details>

<summary>``case `switch`(checked: Bool, onSelect: ((Bool) -> Void)?)``</summary>


스위치

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `checked` | 켜짐 여부 |
  | `onSelect` | 값 변경 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case textButton(title: String, color: TextButton.Color, handler: (() -> Void)?)``</summary>


텍스트 버튼

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `title` | 버튼 텍스트 |
  | `color` | 버튼 색상, 생략하면 기본값으로 `.assistive` 적용 |
  | `handler` | 버튼 클릭 핸들러, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case value(String)``</summary>


값 텍스트

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 표시할 텍스트 |

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

<summary>``enum Variant``</summary>


셀이 놓이는 리스트(컨테이너)의 가장자리를 기준으로 한 셀의 형태입니다.
- **Overview**

  좌우 여백과 인터랙션 배경의 확장 폭·모서리 둥글기를 하나로 묶은 값으로, 세 값을 따로 지정할 수는 없습니다. 두 형태 모두 콘텐츠는 리스트 기준 같은 자리에 놓이고, 인터랙션 배경이 리스트 좌우 끝까지 닿는지만 달라집니다.
#### Enumeration Cases

<details>

<summary>``case full``</summary>


인터랙션 배경이 리스트 좌우 끝까지 각지게 채우는 형태입니다.
- **Discussion**

  셀이 리스트 폭을 채우고 좌우 여백 20을 직접 가지며, 인터랙션 배경은 셀과 같은 크기로 그려집니다.
</details>
<details>

<summary>``case inset``</summary>


인터랙션 배경이 리스트 좌우 끝에 닿지 않고 안쪽에 둥글게 그려지는 형태입니다.
- **Discussion**

  셀은 콘텐츠 폭을 그대로 쓰고 좌우 여백은 리스트가 줍니다. 인터랙션 배경만 셀보다 좌우로 12 넓어지고 모서리가 16 둥글게 처리됩니다.
</details>

</details>
<details>

<summary>``enum VerticalAlign``</summary>


셀 내 콘텐츠의 수직 정렬을 나타내는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case center``</summary>


셀 높이의 중앙에 정렬
</details>
<details>

<summary>``case top``</summary>


첫 행에 맞춰 정렬
</details>

</details>
<details>

<summary>``enum VerticalPadding``</summary>


상하 여백을 나타내는 열거형입니다.
- **Overview**

  셀 컴포넌트의 상하 여백을 조정할 때 사용되며, 각 케이스는 다양한 크기의 여백을 제공합니다.
#### Enumeration Cases

<details>

<summary>``case custom(CGFloat)``</summary>


직접 지정한 여백
- **Discussion**

  정해진 네 단계로 표현할 수 없는 간격이 필요할 때만 사용합니다.
</details>
<details>

<summary>``case large``</summary>


큰 여백 (16)
</details>
<details>

<summary>``case medium``</summary>


중간 여백 (12)
</details>
<details>

<summary>``case none``</summary>


여백 없음
</details>
<details>

<summary>``case small``</summary>


작은 여백 (8)
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



