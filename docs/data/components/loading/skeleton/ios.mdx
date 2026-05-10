---
title: Skeleton
description: 콘텐츠 로딩 중 표시되는 스켈레톤 UI 컴포넌트입니다.
---

```swift
enum Skeleton
```

## Overview

데이터 로딩 중에 UI의 구조를 미리 보여주는 스켈레톤 뷰를 제공합니다. 텍스트, 사각형, 원형 등 다양한 형태의 스켈레톤 로딩 플레이스홀더를 지원합니다.

텍스트 스켈레톤은 `Typography.Variant`의 `lineHeight`를 기반으로 줄 수를 자동 계산하고, 첫 줄은 100%, 나머지는 가변 길이로 표시합니다.

```swift
// 자동 텍스트 스켈레톤 (variant 기반 자동 계산)
Text("콘텐츠")
    .skeleton(isPresented: isLoading, kind: .text(variant: .body1))

// 이미지를 위한 원형 스켈레톤 사용
Image(systemName: "person.circle")
    .skeleton(isPresented: isLoading, kind: .circle)

// 커스텀 스켈레톤 뷰 사용
contentView
    .skeleton(isPresented: isLoading) {
        Skeleton.SkeletonView(.rectangle(cornerRadius: 8))
            .color(.semantic(.fillNormal))
            .opacity(0.7)
    }
```

## Topics

### Structures

<details>

<summary>``struct Kind``</summary>


스켈레톤 요소의 종류를 지정하는 구조체입니다.
#### Instance Properties

<details>

<summary>``var isCircle: Bool``</summary>


원형 종류인지 여부
</details>
<details>

<summary>``var isRectangle: Bool``</summary>


사각형 종류인지 여부
</details>
<details>

<summary>``var isText: Bool``</summary>


텍스트 종류인지 여부
</details>

#### Type Properties

<details>

<summary>``static var circle: Kind``</summary>


원형 스켈레톤
</details>

#### Type Methods

<details>

<summary>``static func rectangle(cornerRadius: CGFloat) -> Kind``</summary>


사각형 모양의 스켈레톤을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `cornerRadius` | 모서리 둥글기, 생략하면 기본값으로 `3` 적용 |
- **Return Value**

  사각형 스켈레톤 Kind
</details>
<details>

<summary>~~``static func text(alignment: Align, lengths: [Length], cornerRadius: CGFloat, lineNumber: Int) -> Kind``~~</summary>


텍스트 줄을 나타내는 스켈레톤을 생성합니다.
>  **Deprecated**
>
>  text(variant:alignment:cornerRadius:)를 사용하세요


- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `alignment` | 텍스트 정렬 방식 |
  | `lengths` | 각 줄의 상대적 길이 |
  | `cornerRadius` | 모서리 둥글기 |
  | `lineNumber` | 텍스트 줄 수. `0`이면 자동 계산 |
- **Return Value**

  텍스트 스켈레톤 Kind
</details>
<details>

<summary>``static func text(variant: Typography.Variant, alignment: Align, cornerRadius: CGFloat) -> Kind``</summary>


텍스트 줄을 나타내는 스켈레톤을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트의 타이포그래피 변형. `lineHeight`를 기준으로 줄 수를 자동 계산합니다 |
  | `alignment` | 텍스트 정렬 방식, 생략하면 기본값으로 `.leading` 적용 |
  | `cornerRadius` | 모서리 둥글기, 생략하면 기본값으로 `3` 적용 |
- **Return Value**

  텍스트 스켈레톤 Kind
- **Discussion**

  `variant`의 `lineHeight`를 기반으로 뷰 높이에 맞는 줄 수를 자동 계산하고, 첫 줄은 100%, 나머지는 가변 길이로 표시합니다.
</details>

</details>
<details>

<summary>``struct SkeletonView``</summary>


스켈레톤 로딩 UI를 표시하는 뷰입니다.
#### Initializers

<details>

<summary>``init(Kind)``</summary>


스켈레톤 뷰를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `kind` | 표시할 스켈레톤의 종류 |
</details>

#### Instance Properties

<details>

<summary>``var body: some View``</summary>


뷰의 내용과 동작을 정의합니다.
</details>

#### Instance Methods

<details>

<summary>``func color(SwiftUI.Color) -> Skeleton.SkeletonView``</summary>


스켈레톤 뷰의 색상을 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 적용할 색상 |
- **Return Value**

  수정된 SkeletonView 인스턴스
</details>
<details>

<summary>``func opacity(CGFloat) -> Skeleton.SkeletonView``</summary>


스켈레톤 뷰의 투명도를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `opacity` | 적용할 투명도 (0.0 ~ 1.0) |
- **Return Value**

  수정된 SkeletonView 인스턴스
</details>

</details>

### Enumerations

<details>

<summary>``enum Align``</summary>


스켈레톤 요소의 정렬 방식을 지정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case center``</summary>


중앙 정렬
</details>
<details>

<summary>``case leading``</summary>


좌측 정렬
</details>
<details>

<summary>``case trailing``</summary>


우측 정렬
</details>

</details>
<details>

<summary>``enum Length``</summary>


스켈레톤 요소의 길이 비율을 지정하는 열거형입니다.
#### Initializers

<details>

<summary>``init?(rawValue: CGFloat)``</summary>

</details>

</details>

### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func skeleton<V>(isPresented: Bool, skeletonView: () -> V) -> some View``</summary>


현재 뷰에 커스텀 스켈레톤 로딩 UI를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 스켈레톤 표시 여부를 제어하는 불리언 값 |
  | `skeletonView` | 커스텀 스켈레톤 뷰를 생성하는 클로저 |
- **Return Value**

  스켈레톤 기능이 적용된 뷰
</details>

<details>

<summary>``func skeleton(isPresented: Bool, kind: Skeleton.Kind, color: SwiftUI.Color?, opacity: CGFloat?, size: CGSize?) -> some View``</summary>


현재 뷰에 미리 정의된 스켈레톤 로딩 UI를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 스켈레톤 표시 여부를 제어하는 불리언 값 |
  | `kind` | 스켈레톤 종류 (텍스트, 사각형, 원형 등) |
  | `color` | 스켈레톤 색상, 생략하면 기본값으로 `nil` 적용 (.semantic(.fillNormal) 사용) |
  | `opacity` | 스켈레톤 투명도, 생략하면 기본값으로 `nil` 적용 |
  | `size` | 스켈레톤 크기 (지정하지 않으면 원본 뷰 크기를 사용), 생략하면 기본값으로 `nil` 적용 |
- **Return Value**

  스켈레톤 기능이 적용된 뷰
</details>


</details>

