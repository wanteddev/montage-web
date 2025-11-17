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

>  **Note**
>
> 키보드가 표시될 때 ActionArea가 위치가 자동으로 키보드 상단에 붙어있도록 조정됩니다.

## Topics

### Structures

<details>

<summary>``struct ButtonInfo``</summary>


ActionArea에 표시될 버튼 정보를 정의하는 구조체입니다.
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
  >  **Note**
  >
  > 버튼 크기가 가능한 한 최대 크기가 되도록 하려면 fill(horizontal:vertical:) 모디파이어를 사용하세요.

</details>

</details>
<details>

<summary>``struct Model``</summary>


ActionArea를 구성하기 위한 모델 구조체입니다.
#### Initializers

<details>

<summary>``init(variant: ActionArea.Variant, backgroundTransparencyControl: ActionArea.BackgroundTransparencyControl, caption: String?)``</summary>


ActionArea 모델을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼 레이아웃 변형 |
  | `backgroundTransparencyControl` | 배경 투명도 제어 방식, 생략하면 기본값으로 `.automatic` 적용 |
  | `caption` | 캡션 텍스트, 생략하면 기본값으로 `nil` 적용 |
</details>
<details>

<summary>``init<V>(variant: ActionArea.Variant, backgroundTransparencyControl: ActionArea.BackgroundTransparencyControl, caption: String?, extra: () -> V, extraDivider: Bool)``</summary>


ActionArea 모델을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼 레이아웃 변형 |
  | `backgroundTransparencyControl` | 배경 투명도 제어 방식, 생략하면 기본값으로 `.automatic` 적용 |
  | `caption` | 캡션 텍스트, 생략하면 기본값으로 `nil` 적용 |
  | `extra` | 추가 콘텐츠를 생성하는 클로저 |
  | `extraDivider` | 추가 콘텐츠 위에 구분선 표시 여부, 생략하면 기본값으로 `true` 적용 |
</details>

</details>

___
### Initializers

<details>

<summary>``init(variant: Variant)``</summary>


ActionArea 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 버튼 영역의 변형 스타일과 버튼 구성 |
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

___
### Instance Methods

<details>

<summary>``func caption(String?) -> ActionArea``</summary>


버튼 위에 표시할 캡션 텍스트를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `caption` | 표시할 캡션 텍스트 |
- **Return Value**

  수정된 ActionArea 인스턴스
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

<summary>``func transparentBackground(Bool) -> ActionArea``</summary>


배경을 투명하게 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `transparentBackground` | 배경 투명 여부, 생략하면 기본값으로 `true` 적용 |
- **Return Value**

  수정된 ActionArea 인스턴스
- **Discussion**

  이 수정자를 사용하면 그라데이션 배경이 숨겨지고 투명한 배경이 표시됩니다.
</details>

___
### Enumerations

<details>

<summary>``enum BackgroundTransparencyControl``</summary>


ActionArea의 배경 투명도를 제어하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case automatic``</summary>


자동으로 배경 투명도를 결정합니다. 기본적으로 스크롤 위치나 콘텐츠에 따라 투명도가 자동 처리됩니다.
</details>
<details>

<summary>``case manual(Bool)``</summary>


수동으로 배경 투명도를 설정합니다. true면 배경이 투명해지고, false면 배경이 표시됩니다.
</details>

</details>
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

___
___
### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func actionArea(variant: ActionArea.Variant, backgroundTransparency: Bool, caption: String?) -> some View``</summary>


현재 뷰에 하단 ActionArea를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | ActionArea의 버튼 레이아웃 변형 |
  | `backgroundTransparency` | 배경 투명도 설정, 생략하면 기본값으로 `true` 적용 |
  | `caption` | 캡션 텍스트, 생략하면 기본값으로 `nil` 적용 |
- **Return Value**

  ActionArea가 적용된 뷰
- **Discussion**

  ```swift
  contentView
      .actionArea(
          variant: .strong(
              main: .init(text: "확인", action: { confirmAction() }),
              sub: .init(text: "취소", action: { cancelAction() })
          ),
          caption: "변경 사항을 저장하시겠습니까?"
      )
  ```

</details>

<details>

<summary>``func actionArea<V>(variant: ActionArea.Variant, backgroundTransparency: Bool, caption: String?, extra: () -> V, extraDivider: Bool) -> some View``</summary>


현재 뷰에 하단 ActionArea를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | ActionArea의 버튼 레이아웃 변형 |
  | `backgroundTransparency` | 배경 투명도 설정, 생략하면 기본값으로 `true` 적용 |
  | `caption` | 캡션 텍스트, 생략하면 기본값으로 `nil` 적용 |
  | `extra` | 추가 콘텐츠를 생성하는 클로저 |
  | `extraDivider` | 추가 콘텐츠 위에 구분선 표시 여부, 생략하면 기본값으로 `true` 적용 |
- **Return Value**

  ActionArea가 적용된 뷰
- **Discussion**

  ```swift
  contentView
      .actionArea(
          variant: .strong(
              main: .init(text: "확인", action: { confirmAction() }),
              sub: .init(text: "취소", action: { cancelAction() })
          ),
          caption: "변경 사항을 저장하시겠습니까?",
          extra: {
              Text("추가 정보")
                  .typography(variant: .label2)
          },
          extraDivider: true
      )
  ```

</details>


</details>

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



