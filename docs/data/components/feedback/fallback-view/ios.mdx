---
title: Fallback view
description: 콘텐츠가 비어있거나 에러/접근 불가 등의 상황에서 대체(Fallback) 화면을 제공하는 컴포넌트입니다.
---

```swift
@MainActor struct FallbackView
```

## Overview

데이터 없음, 검색 결과 없음(Empty) 뿐 아니라 404/네트워크 오류 등의 상태를 시각적으로 표현하고 사용자에게 적절한 안내/복구 액션을 제공합니다. 제목, 설명, 버튼 요소를 조합하여 다양한 상황에 맞는 대체(Fallback) 화면을 구성할 수 있습니다.

```swift
// 기본 사용법
FallbackView(
    description: "검색 결과가 없습니다."
)

// 버튼 1개를 사용한 예시
FallbackView(
    title: "데이터가 없습니다.",
    description: "새로운 항목을 추가해 보세요."
)
.buttonActionArea(
    .single(.init(text: "추가하기", action: { addItem() }))
)

// 버튼 2개를 가로로 배치한 예시
FallbackView(
    title: "불러올 수 없어요.",
    description: "네트워크 상태를 확인해 주세요."
)
.buttonActionArea(
    .horizontal(
        main: .init(text: "다시 시도", action: { retry() }),
        alternative: .init(text: "홈으로", action: { goHome() })
    )
)

// 상하 여백을 좁게 적용한 예시
FallbackView(
    description: "검색 결과가 없습니다."
)
.padding(.compact)
```

## Topics

### Initializers

<details>

<summary>``init(title: String?, description: String)``</summary>


FallbackView 컴포넌트를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `title` | 강조되어 표시할 제목, 생략하면 기본값으로 `nil` 적용 |
  | `description` | 상황을 설명하는 텍스트 |

- **Discussion**

  원하는 레이아웃을 구성하기 위해 제목을 선택적으로 제공할 수 있습니다. 설명은 필수이며, 제목과 설명 모두 최대 2줄로 표시되고 넘치는 텍스트는 말줄임 처리됩니다.

  하단 버튼 영역과 상하 여백은 [buttonActionArea(_:)](/documentation/montage/fallbackview/buttonactionarea(_:).md), [padding(_:)](/documentation/montage/fallbackview/padding(_:).md) 수정자로 구성합니다.
</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func buttonActionArea(ButtonActionArea?) -> FallbackView``</summary>


하단 버튼 영역의 구성을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `buttonActionArea` | 하단 버튼 영역의 구성, `nil`을 전달하면 버튼을 표시하지 않음 |

- **Return Value**

  수정된 FallbackView 인스턴스
</details>
<details>

<summary>``func padding(Padding) -> FallbackView``</summary>


콘텐츠 영역의 상하 여백 크기를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `padding` | 콘텐츠 영역의 상하 여백 크기 |

- **Return Value**

  수정된 FallbackView 인스턴스
- **Discussion**

  콘텐츠는 상위 뷰의 세로 중앙에 배치되며, 이 여백은 상위 뷰가 충분히 크지 않을 때 확보할 최소 여백입니다.
</details>

### Enumerations

<details>

<summary>``enum ButtonActionArea``</summary>


하단 버튼 영역의 버튼 구성과 배치를 정의합니다.
- **Overview**

  버튼은 항상 `Assistive` 색상의 외곽선(`outlined`) 스타일로 표시됩니다.
#### Structures

<details>

<summary>``struct ButtonInfo``</summary>


버튼에 표시할 텍스트와 탭 시 실행할 액션을 정의하는 구조체입니다.
##### Initializers

<details>

<summary>``init(text: String, action: () -> Void)``</summary>


버튼 정보를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 버튼에 표시할 텍스트 |
  | `action` | 버튼 탭 시 실행할 액션 |

</details>

</details>

#### Enumeration Cases

<details>

<summary>``case horizontal(main: ButtonInfo, alternative: ButtonInfo)``</summary>


버튼 2개를 가로로 배치합니다. 대체 버튼이 왼쪽, 주 버튼이 오른쪽에 표시됩니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `main` | 주 버튼 정보 |
  | `alternative` | 대체 버튼 정보 |

</details>
<details>

<summary>``case single(ButtonInfo)``</summary>


버튼 1개를 배치합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `buttonInfo` | 버튼 정보 |

</details>
<details>

<summary>``case vertical(main: ButtonInfo, alternative: ButtonInfo)``</summary>


버튼 2개를 세로로 배치합니다. 주 버튼이 위, 대체 버튼이 아래에 표시됩니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `main` | 주 버튼 정보 |
  | `alternative` | 대체 버튼 정보 |

</details>

</details>
<details>

<summary>``enum Padding``</summary>


콘텐츠 영역의 상하 여백 크기를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case compact``</summary>


좁은 여백(80)을 적용합니다. 화면 일부 영역만 대체할 때 사용합니다.
</details>
<details>

<summary>``case normal``</summary>


기본 여백(160)을 적용합니다. 화면 전체를 대체할 때 사용합니다.
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



