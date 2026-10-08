---
title: Search field
description: 검색어 입력을 위한 컴포넌트입니다.
---

```swift
@MainActor struct SearchField
```

## Overview

왼쪽 검색 아이콘과 단일 라인 입력 영역으로 구성되며, 입력값이 있으면 오른쪽에 지우기 버튼이 나타납니다. 치수·패딩·타이포그래피·모서리 반경은 [TextField](/documentation/montage/textfield.md)와 동일한 사이즈 체계를 따릅니다.

```swift
@State private var keyword = ""

// 기본 검색 필드 (Solid, Large)
SearchField(text: $keyword)
   .placeholder("검색어를 입력해 주세요.")

// 테두리만 있는 검색 필드
SearchField(text: $keyword)
   .variant(.outlined)
   .size(.medium)

// 포커스 상태를 외부에서 제어하고 검색어 제출을 처리
SearchField(text: $keyword)
   .focused($isFocused)
   .onSubmit { search(keyword) }

// 자동수정·맞춤법 검사를 끈 검색 필드
SearchField(text: $keyword)
   .autocorrectionDisabled()

// 비활성화
SearchField(text: $keyword)
   .disabled(true)
```

> **Note**
>
> 비활성화는 SwiftUI 표준 `disabled(_:)`를 사용합니다. 상위 컨테이너에 한 번 걸면 하위 컴포넌트까지 함께 비활성 스타일로 표시됩니다.

## Topics

### Initializers

<details>

<summary>``init(text: Binding<String>)``</summary>


검색 필드를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 검색어의 값을 바인딩 |

</details>

### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

### Instance Methods

<details>

<summary>``func autocorrectionDisabled(Bool) -> SearchField``</summary>


자동수정과 맞춤법 검사를 비활성화할지 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 검색 필드 인스턴스
- **Discussion**

  사람 이름·회사명·약어처럼 사전에 없는 검색어를 자주 입력하는 화면에서 사용합니다. `true`이면 입력 중 자동수정이 적용되지 않고, 맞춤법 검사 밑줄도 표시되지 않습니다.

  검색 필드가 내부에서 SwiftUI의 `autocorrectionDisabled(_:)`를 직접 적용하므로, 호출부에서 인스턴스 바깥에 같은 모디파이어를 붙이면 내부 설정에 덮어써집니다. 반드시 이 모디파이어로 설정해 주세요.
</details>
<details>

<summary>``func focused(Binding<Bool>) -> SearchField``</summary>


검색 필드의 포커스 상태를 외부 바인딩과 연결합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `focused` | 포커스 상태 바인딩 |

- **Return Value**

  수정된 검색 필드 인스턴스
- **Discussion**

  바인딩 값을 `true`로 바꾸면 키보드가 올라오고, 사용자가 직접 포커스를 옮기면 바인딩 값이 갱신됩니다.
</details>
<details>

<summary>``func onFocusChange((Bool) -> Void) -> SearchField``</summary>


포커스 상태가 변경될 때 호출할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `handler` | 변경된 포커스 상태를 전달받는 클로저 |

- **Return Value**

  수정된 검색 필드 인스턴스
</details>
<details>

<summary>``func onSubmit(() -> Void) -> SearchField``</summary>


검색어 제출 시 호출할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `handler` | 검색어 제출 시 실행할 클로저 |

- **Return Value**

  수정된 검색 필드 인스턴스
- **Discussion**

  키보드의 검색(return) 키를 눌렀을 때 호출됩니다.
</details>
<details>

<summary>``func onTextChange((String) -> Void) -> SearchField``</summary>


검색어가 변경될 때마다 호출할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `handler` | 변경된 검색어를 전달받는 클로저 |

- **Return Value**

  수정된 검색 필드 인스턴스
</details>
<details>

<summary>``func placeholder(String?) -> SearchField``</summary>


검색어가 없을 때 표시할 플레이스홀더를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placeholder` | 표시할 플레이스홀더 텍스트 |

- **Return Value**

  수정된 검색 필드 인스턴스
</details>
<details>

<summary>``func size(Size) -> SearchField``</summary>


검색 필드의 사이즈를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `size` | 검색 필드의 사이즈 |

- **Return Value**

  수정된 검색 필드 인스턴스
</details>
<details>

<summary>``func variant(Variant) -> SearchField``</summary>


검색 필드의 스타일을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `variant` | 검색 필드의 스타일 |

- **Return Value**

  수정된 검색 필드 인스턴스
</details>

### Enumerations

<details>

<summary>``enum Size``</summary>


검색 필드의 사이즈를 정의합니다.
- **Overview**

  사이즈에 따라 패딩, 모서리 반경, 최소 높이, 입력 타이포그래피, 아이콘 크기가 함께 결정됩니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>


큰 사이즈 (최소 높이 48)
</details>
<details>

<summary>``case medium``</summary>


중간 사이즈 (최소 높이 40)
</details>

</details>
<details>

<summary>``enum Variant``</summary>


검색 필드의 스타일을 정의합니다.
#### Enumeration Cases

<details>

<summary>``case outlined``</summary>


투명한 배경 위에 테두리를 사용하는 스타일
</details>
<details>

<summary>``case solid``</summary>


채워진 배경을 사용하고 테두리가 없는 스타일
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



