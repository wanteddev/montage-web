---
title: Skeleton
description: 콘텐츠 로딩 중 표시되는 스켈레톤 UI 컴포넌트입니다.
---

```swift
enum Skeleton
```

## Overview

데이터 로딩 중에 UI의 구조를 미리 보여주는 스켈레톤 뷰를 제공합니다. 텍스트, 사각형, 원형 등 다양한 형태의 스켈레톤 로딩 플레이스홀더를 지원합니다.

```swift
// 텍스트 스켈레톤 사용
Text("콘텐츠")
    .skeleton(isPresented: isLoading, kind: .text(lineNumber: 3))

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

>  **Note**
>
> 스켈레톤 뷰는 로딩 상태일 때 부드러운 페이드 인/아웃 애니메이션을 제공합니다.

## Topics

### Structures

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

#### Default Implementations


[View Implementations](/docs/utilities/ios-utilities/view-implementations)

[View Implementations](/docs/utilities/ios-utilities/view-implementations)

</details>

___
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

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Kind``</summary>

스켈레톤 요소의 종류를 지정하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case circle``</summary>

원형 스켈레톤
</details>
<details>

<summary>``case rectangle(cornerRadius: CGFloat)``</summary>

사각형 모양의 스켈레톤

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `cornerRadius` | 모서리 둥글기 (기본값: 3) |
</details>
<details>

<summary>``case text(alignment: Align, lengths: [Length], cornerRadius: CGFloat, lineNumber: Int)``</summary>

텍스트 줄을 나타내는 스켈레톤

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `alignment` | 텍스트 정렬 방식 (기본값: .leading) |
  | `lengths` | 각 줄의 상대적 길이 (기본값: [._100]) |
  | `cornerRadius` | 모서리 둥글기 (기본값: 3) |
  | `lineNumber` | 텍스트 줄 수 (기본값: 1) |
</details>

</details>
<details>

<summary>``enum Length``</summary>

스켈레톤 요소의 길이 비율을 지정하는 열거형입니다.
#### Initializers

<details>

<summary>``init?(rawValue: CGFloat)``</summary>
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

[RawRepresentable Implementations](/docs/utilities/ios-utilities/rawrepresentable-implementations)

</details>

