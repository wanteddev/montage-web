---
title: Text field
description: 단일 라인 텍스트 입력을 위한 컴포넌트입니다.
---

```swift
@MainActor struct TextField
```

## Overview

이 컴포넌트는 사용자가 텍스트를 입력할 수 있는 필드를 제공합니다. 제목, 아이콘, 자동완성, 상태 표시 등 다양한 기능을 지원합니다.

```swift
@State private var inputText = ""

// 기본 텍스트 필드
TextField(text: $inputText)
   .placeholder("이메일을 입력하세요")

// 아이콘과 오류 상태를 가진 필드
TextField(text: $inputText)
   .icon(.person)
   .status(.negative)

// 오른쪽 버튼이 있는 텍스트 필드
TextField(text: $inputText)
   .trailingButton(
       .init(
           title: "인증",
           handler: { verifyCode() }
       )
   )

// 사이즈를 지정한 텍스트 필드
TextField(text: $inputText)
   .size(.medium)

// 자동수정·맞춤법 검사를 끈 이메일 입력 필드
TextField(text: $inputText)
   .placeholder("이메일을 입력하세요")
   .autocorrectionDisabled()

// 비활성화
TextField(text: $inputText)
   .disabled(true)
```

> **Note**
>
> 비활성화는 SwiftUI 표준 `disabled(_:)`를 사용합니다. 상위 컨테이너에 한 번 걸면 하위 컴포넌트까지 함께 비활성 스타일로 표시됩니다. 트레일링 버튼만 따로 비활성화하려면 [TextField.TrailingButtonInfo](/documentation/montage/textfield/trailingbuttoninfo.md)의 `disable`을 사용합니다.

## Topics

### Structures

<details>

<summary>``struct AutoCompletionDataSource``</summary>


텍스트 필드의 자동완성 기능을 위한 데이터 소스를 정의합니다.
- **Overview**

  이 구조체를 사용하여 자동완성 목록의 섹션, 항목, 레이아웃 등을 정의할 수 있습니다.
#### Operators

<details>

<summary>``static func == (AutoCompletionDataSource, AutoCompletionDataSource) -> Bool``</summary>

</details>

#### Initializers

<details>

<summary>``init<V>(numberOfSections: Int, sectionTitleAt: ((Int) -> String)?, numberOfItemsInSection: (Int) -> Int, cellForItemAt: (IndexPath) -> V, headerView: (() -> any View)?, footerView: (() -> any View)?, maxHeight: CGFloat)``</summary>


자동완성 데이터 소스를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `numberOfSections` | 섹션 수, 생략하면 기본값으로 `1` 적용 |
  | `sectionTitleAt` | 섹션 제목을 반환하는 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `numberOfItemsInSection` | 각 섹션의 항목 수를 반환하는 클로저 |
  | `cellForItemAt` | 각 항목의 뷰를 반환하는 클로저 |
  | `headerView` | 헤더 뷰 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `footerView` | 푸터 뷰 클로저, 생략하면 기본값으로 `nil` 적용 |
  | `maxHeight` | 자동완성 목록의 최대 높이, 생략하면 기본값으로 `400` 적용 |

</details>

#### Instance Properties

<details>

<summary>``var totalNumberOfItems: Int``</summary>


전체 항목 수를 반환합니다.
</details>

</details>
<details>

<summary>``struct TrailingButtonInfo``</summary>


텍스트 필드의 오른쪽에 표시할 버튼의 속성을 정의합니다.
- **Overview**

  이 구조체를 사용하여 필드 내부 오른쪽에 표시될 버튼(Outlined 형태)의 텍스트와 동작을 정의할 수 있습니다.
#### Initializers

<details>

<summary>``init(title: String, disable: Bool, handler: (() -> Void)?)``</summary>


트레일링 버튼을 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `title` | 버튼에 표시할 텍스트 |
  | `disable` | 트레일링 버튼만 비활성화할지 여부, 생략하면 기본값으로 `false` 적용 |
  | `handler` | 버튼 클릭 시 실행할 핸들러 |

</details>

</details>

### Initializers

<details>

<summary>``init(text: Binding<String>, autoCompletionDataSource: Binding<AutoCompletionDataSource?>)``</summary>


텍스트 필드를 초기화합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 텍스트 필드의 값을 바인딩 |
  | `autoCompletionDataSource` | 자동완성 데이터 소스를 바인딩, 생략하면 기본값으로 `nil` 적용 |

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

<summary>``func accessory<Accessory>(() -> Accessory) -> TextField``</summary>


메시지 행의 오른쪽에 표시할 액세서리 뷰를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `accessory` | 표시할 액세서리 뷰 빌더 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  글자 수 카운트, 타이머 등 입력 아래에 붙는 보조 요소를 자유롭게 구성할 수 있습니다. 스타일(타이포그래피·색)은 호출부에서 지정합니다.
</details>
<details>

<summary>``func autocorrectionDisabled(Bool) -> TextField``</summary>


자동수정과 맞춤법 검사를 비활성화할지 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `disable` | 비활성화 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  이메일·아이디·인증 코드처럼 자동수정이 오히려 방해가 되는 입력에서 사용합니다. `true`이면 입력 중 자동수정이 적용되지 않고, 맞춤법 검사 밑줄도 표시되지 않습니다.

  텍스트 필드가 내부에서 SwiftUI의 `autocorrectionDisabled(_:)`를 직접 적용하므로, 호출부에서 인스턴스 바깥에 같은 모디파이어를 붙이면 내부 설정에 덮어써집니다. 반드시 이 모디파이어로 설정해 주세요.
</details>
<details>

<summary>``func backgroundColor(SwiftUI.Color?) -> TextField``</summary>


텍스트 필드의 배경색을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `color` | 설정할 배경색 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func icon(Icon?) -> TextField``</summary>


텍스트 필드 왼쪽에 표시할 아이콘을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `icon` | 표시할 아이콘 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func label(String?, required: Bool) -> TextField``</summary>


제목(라벨)을 붙이고 필수 표시(`*`) 여부를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 라벨 텍스트. `nil`이거나 비어 있으면 라벨을 표시하지 않습니다. |
  | `required` | 필수 입력 표시(`*`) 여부, 생략하면 기본값으로 `false` 적용 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  이 모디파이어를 쓰면 텍스트 필드가 [FormControl](/documentation/montage/formcontrol.md)로 감싸져 라벨·메시지·액세서리가 함께 배치되고, 라벨이 입력의 접근성 라벨로 연결됩니다. [FormControl](/documentation/montage/formcontrol.md)을 직접 조합하는 것과 결과가 같습니다.

  ```swift
  TextField(text: $email)
      .placeholder("이메일을 입력하세요")
      .label("이메일", required: true)
      .message("회사 이메일을 입력해 주세요.")
  ```

</details>
<details>

<summary>``func labelPlacement(FormControl.LabelPlacement) -> TextField``</summary>


라벨 위치를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placement` | 라벨 위치, 생략하면 기본값으로 `.top` 적용 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func labelWidth(CGFloat) -> TextField``</summary>


leading 배치에서 라벨 열의 폭을 명시적으로 고정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `width` | 라벨 열 폭(pt) |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  여러 입력의 라벨 열을 한꺼번에 맞추려면 각 입력에 반복하지 말고 [FormControlGroup](/documentation/montage/formcontrolgroup.md)을 사용하세요. [FormControl.LabelPlacement.top](/documentation/montage/formcontrol/labelplacement/top.md) 배치에는 영향이 없습니다.
</details>
<details>

<summary>``func maxLength(Int?) -> TextField``</summary>


입력 가능한 최대 글자 수를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `limit` | 최대 글자 수. `nil`이면 제한 없음 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  입력/붙여넣기로 텍스트가 제한을 초과하면 앞에서부터 `limit` 글자만 남기고 잘립니다. 글자 수는 문자(grapheme cluster) 단위로 계산됩니다. `nil`이면 길이를 제한하지 않습니다.
</details>
<details>

<summary>``func message(String?) -> TextField``</summary>


입력 아래에 표시할 도움말/에러 메시지를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `text` | 메시지 텍스트. `nil`이거나 비어 있으면 메시지를 표시하지 않습니다. |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  메시지 색은 [status(_:)](/documentation/montage/textfield/status(_:).md)에 따라 결정되며 `.negative`에서만 강조 색으로 표시됩니다. 메시지는 입력의 접근성 힌트로도 연결됩니다.
</details>
<details>

<summary>``func onTextChange((String) -> Void) -> TextField``</summary>


텍스트가 변경될 때마다 호출할 클로저를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `handler` | 변경된 텍스트를 전달받는 클로저 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  변경된 전체 텍스트를 전달하므로 글자 수 계산(`text.count`), 유효성 검사 등 다양한 후처리에 사용할 수 있습니다. [maxLength(_:)](/documentation/montage/textfield/maxlength(_:).md)으로 잘린 경우 잘린 뒤의 최종 텍스트가 전달됩니다.
</details>
<details>

<summary>``func placeholder(String?) -> TextField``</summary>


텍스트 필드에 입력된 텍스트가 없을 때 표시할 플레이스홀더를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `placeholder` | 표시할 플레이스홀더 텍스트 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func secured(Bool) -> TextField``</summary>


입력한 내용을 가릴지 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `secured` | 입력 내용을 가릴지 여부, 생략하면 기본값으로 `true` 적용 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
- **Discussion**

  비밀번호처럼 노출되면 안 되는 값을 입력받을 때 사용합니다.
  > **Note**
  >
  > 자동완성은 가려진 입력에서 동작하지 않습니다.

</details>
<details>

<summary>``func size(Size) -> TextField``</summary>


텍스트 필드의 사이즈를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `size` | 텍스트 필드의 사이즈 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func status(Status) -> TextField``</summary>


텍스트 필드의 상태를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `status` | 텍스트 필드의 상태 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func trailingButton(TrailingButtonInfo?) -> TextField``</summary>


텍스트 필드 오른쪽에 표시할 버튼을 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `trailingButton` | 표시할 버튼의 속성 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>
<details>

<summary>``func trailingContent<V>(() -> V) -> TextField``</summary>


텍스트 필드 오른쪽에 표시할 커스텀 콘텐츠를 설정합니다.

- **Parameters**

  | Parameter | Description |
  | --- | --- |
  | `trailingContent` | 표시할 커스텀 콘텐츠를 생성하는 클로저 |

- **Return Value**

  수정된 텍스트 필드 인스턴스
</details>

### Enumerations

<details>

<summary>``enum Size``</summary>


텍스트 필드의 사이즈를 정의합니다.
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

<summary>``enum Status``</summary>


텍스트 필드의 상태를 정의합니다.
#### Enumeration Cases

<details>

<summary>``case negative``</summary>


오류 상태
</details>
<details>

<summary>``case normal``</summary>


기본 상태
</details>
<details>

<summary>``case positive``</summary>


유효한 입력 상태
</details>

</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



