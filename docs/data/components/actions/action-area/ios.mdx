---
title: Action area
description: 화면 하단에 사용자 액션 버튼을 표시하는 영역 컴포넌트입니다.
---

```swift
@MainActor struct ActionArea
```

## Overview

이 컴포넌트는 화면 하단에 위치하며 주요 액션 버튼과 보조 버튼을 표시합니다. 다양한 레이아웃 변형을 지원하고, 캡션 텍스트와 추가 콘텐츠를 포함할 수 있습니다.

```swift
// 기본 강조 버튼 영역
ActionArea(variant: .strong(
    main: .init(text: "확인", action: { confirmAction() }),
    sub: .init(text: "취소", action: { cancelAction() })
))

// 캡션이 있는 중립 버튼 영역
ActionArea(variant: .neutral(
    main: .init(text: "저장", action: { saveData() })
))
.caption("변경 사항을 저장하시겠습니까?")

// 추가 콘텐츠가 있는 취소 버튼 영역
ActionArea(variant: .cancel(
    main: .init(text: "닫기", action: { dismiss() })
))
.extra({
    Text("추가 정보")
        .typography(variant: .label2) 
})
```

> **Note**
>
> 키보드가 표시될 때 ActionArea가 위치가 자동으로 키보드 상단에 붙어있도록 조정됩니다.

## Topics

### Structures

<details>

<summary>``struct ButtonInfo``</summary>


ActionArea에 표시될 버튼 정보를 정의하는 구조체입니다.
- **Overview**

  버튼의 텍스트, 액션, 커스텀 뷰 등을 지정할 수 있습니다.
#### Initializers

<details>

<summary>``init(text: String, action: (() -> Void))``</summary>


기본 버튼 정보를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 버튼에 표시할 텍스트 |
  | `action` | 버튼 클릭 시 실행할 액션 |

</details>

#### Type Methods

<details>

<summary>``static func custom<V>(() -> V) -> ActionArea.ButtonInfo``</summary>


커스텀 버튼 뷰를 사용하는 버튼 정보를 생성합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `custom` | 커스텀 버튼 뷰를 생성하는 클로저 |

- **Return Value**

  커스텀 뷰가 포함된 ButtonInfo 인스턴스
- **Discussion**
  > **Note**
  >
  > 버튼 크기가 가능한 한 최대 크기가 되도록 하려면 fillWidth(_:) 모디파이어를 사용하세요.

</details>

</details>

### Initializers

<details>

<summary>``init(variant: Variant)``</summary>


ActionArea 컴포넌트를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼 영역의 변형 스타일과 버튼 구성 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func backgroundColor(SwiftUI.Color?) -> ActionArea``</summary>


배경 색상을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `backgroundColor` | 설정할 색상. `nil`을 전달하면 기본 배경색을 사용합니다. |

- **Return Value**

  수정된 ActionArea 인스턴스
- **Discussion**

  지정한 색은 배경뿐 아니라 상단 sticky 그라데이션의 시작색으로도 함께 적용됩니다. 두 색이 어긋나면 경계가 보이므로 값을 분리하지 않습니다.
</details>
<details>

<summary>``func caption(String?, icon: Icon?) -> ActionArea``</summary>


버튼 위에 표시할 캡션 텍스트를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `caption` | 표시할 캡션 텍스트 |
  | `icon` | 캡션 텍스트 앞에 표시할 아이콘, 생략하면 기본값으로 `nil`을 적용하여 아이콘을 표시하지 않습니다. |

- **Return Value**

  수정된 ActionArea 인스턴스
- **Discussion**

  `icon`을 지정하면 캡션 텍스트 앞에 16pt 아이콘을 함께 표시합니다. 아이콘 색은 캡션 텍스트와 같습니다.

  ```swift
  .caption("변경 사항을 저장하시겠습니까?")                      // 텍스트만
  .caption("변경 사항을 저장하시겠습니까?", icon: .circleInfo)   // 아이콘 + 텍스트
  ```

</details>
<details>

<summary>``func extra<V>(() -> V, divider: Bool) -> ActionArea``</summary>


버튼 위에 표시할 추가 콘텐츠를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `content` | 표시할 추가 콘텐츠를 생성하는 클로저 |
  | `divider` | 추가 콘텐츠 위에 구분선 표시 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 ActionArea 인스턴스
</details>
<details>

<summary>``func scrollReachedEnd(Bool) -> ActionArea``</summary>


스크롤이 바닥에 닿았는지를 직접 알려줍니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `reachedEnd` | 스크롤이 끝에 닿았는지 여부. `true`면 그라데이션을 숨깁니다. |

- **Return Value**

  수정된 ActionArea 인스턴스
- **Discussion**

  [ActionArea](/documentation/montage/actionarea.md)는 상단 그라데이션으로 “아래에 가려진 콘텐츠가 있다”를 표현합니다. [ScrollView](/documentation/montage/scrollview.md)를 쓰면 이 값이 자동으로 전달되므로 이 수정자는 필요 없습니다. `SwiftUI.ScrollView`·`List`처럼 신호를 올려주지 않는 컨테이너를 쓸 때만 사용합니다.

  ```swift
  ActionArea(variant: .strong(main: .init(text: "확인", action: {})))
      .scrollReachedEnd(scrollProxy.isAtBottom)
  ```

</details>

### Enumerations

<details>

<summary>``enum Variant``</summary>


ActionArea의 버튼 레이아웃 변형을 정의합니다.
#### Enumeration Cases

<details>

<summary>``case cancel(main: ButtonInfo)``</summary>


취소 버튼만 있는 간단한 레이아웃

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `main` | 주 버튼 정보 |

</details>
<details>

<summary>``case neutral(main: ButtonInfo, sub: ButtonInfo?, alternative: ButtonInfo?)``</summary>


중립적인 스타일의 버튼 레이아웃

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `main` | 주 버튼 정보 |
  | `sub` | 보조 버튼 정보, 생략하면 기본값으로 `nil` 적용 |
  | `alternative` | 대체 버튼 정보, 생략하면 기본값으로 `nil` 적용 |

</details>
<details>

<summary>``case strong(main: ButtonInfo, sub: ButtonInfo?, alternative: ButtonInfo?)``</summary>


강조된 주 버튼과 보조/대체 버튼이 있는 레이아웃

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `main` | 주 버튼 정보 |
  | `sub` | 보조 버튼 정보, 생략하면 기본값으로 `nil` 적용 |
  | `alternative` | 대체 버튼 정보, 생략하면 기본값으로 `nil` 적용 |

</details>

</details>

### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func actionArea(scrollReachedEnd: Bool?, () -> ActionArea) -> some View``</summary>


현재 뷰에 하단 ActionArea를 적용합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `scrollReachedEnd` | 콘텐츠 스크롤이 바닥에 닿았는지 여부. [ScrollView](/documentation/montage/scrollview.md)를 쓰면 자동으로 전달되므로 생략하고, `SwiftUI.ScrollView`·`List`를 쓸 때만 직접 넘깁니다. |
  | `actionArea` | 하단에 배치할 [ActionArea](/documentation/montage/actionarea.md)를 만드는 클로저 |

- **Return Value**

  ActionArea가 적용된 뷰
- **Discussion**

  구성은 [ActionArea](/documentation/montage/actionarea.md)의 모디파이어 체인으로 하고, 완성된 인스턴스를 이 슬롯에 넘깁니다.

  ```swift
  contentView
      .actionArea {
          ActionArea(variant: .strong(
              main: .init(text: "확인", action: { confirmAction() }),
              sub: .init(text: "취소", action: { cancelAction() })
          ))
          .caption("변경 사항을 저장하시겠습니까?")
      }
  ```

  > **Note**
  >
  > 슬롯 클로저에 `@ViewBuilder`를 붙이지 않았습니다. 붙이면 `if`문이 `_ConditionalContent`를 만들어 [ActionArea](/documentation/montage/actionarea.md) 타입 제약이 깨집니다. 공개 모디파이어가 모두 `Self`를 돌려주므로 체인과 삼항 연산자는 그대로 쓸 수 있습니다.

</details>


</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



