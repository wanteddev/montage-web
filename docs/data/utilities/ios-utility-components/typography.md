---
title: Typography
description: Montage 디자인 시스템의 타이포그래피 체계
---

```swift
enum Typography
```

## Overview

Typography는 Montage 디자인 시스템에서 사용되는 모든 텍스트 스타일을 정의합니다. 폰트 크기, 두께, 자간, 행간 등 텍스트의 시각적 특성을 일관되게 적용할 수 있도록 표준화된 타이포그래피 시스템을 제공합니다.

```swift
// UIKit에서 사용
let label = UILabel()
label.font = UIFont.font(variant: .body1, weight: .regular)

// SwiftUI에서 사용
Text("Hello, World!")
    .typography(variant: .heading1, weight: .bold, semantic: .labelNormal)
```

>  **Note**
>
> 텍스트 스타일을 적용할 때는 일관성을 위해 직접 폰트를 지정하기보다 Typography 시스템을 사용하는 것이 권장됩니다.

## Topics

### Enumerations

<details>

<summary>``enum Variant``</summary>

텍스트 변형을 정의하는 열거형
#### Enumeration Cases

<details>

<summary>``case body1``</summary>

기본 본문 텍스트
</details>
<details>

<summary>``case body1Reading``</summary>

긴 텍스트용 본문
</details>
<details>

<summary>``case body2``</summary>

작은 본문 텍스트
</details>
<details>

<summary>``case body2Reading``</summary>

긴 텍스트용 작은 본문
</details>
<details>

<summary>``case caption1``</summary>

캡션 텍스트
</details>
<details>

<summary>``case caption2``</summary>

작은 캡션 텍스트
</details>
<details>

<summary>``case display1``</summary>

가장 큰 디스플레이 텍스트
</details>
<details>

<summary>``case display2``</summary>

큰 디스플레이 텍스트
</details>
<details>

<summary>``case display3``</summary>

중간 디스플레이 텍스트
</details>
<details>

<summary>``case heading1``</summary>

주요 헤딩
</details>
<details>

<summary>``case heading2``</summary>

보조 헤딩
</details>
<details>

<summary>``case headline1``</summary>

강조 헤드라인
</details>
<details>

<summary>``case headline2``</summary>

일반 헤드라인
</details>
<details>

<summary>``case label1``</summary>

라벨 텍스트
</details>
<details>

<summary>``case label1Reading``</summary>

긴 텍스트용 라벨
</details>
<details>

<summary>``case label2``</summary>

작은 라벨 텍스트
</details>
<details>

<summary>``case title1``</summary>

대제목
</details>
<details>

<summary>``case title2``</summary>

중간 제목
</details>
<details>

<summary>``case title3``</summary>

소제목
</details>

#### Instance Properties

<details>

<summary>``var fontHeight: CGFloat``</summary>

각 변형에 대한 폰트 높이
</details>
<details>

<summary>``var fontSize: CGFloat``</summary>

각 변형에 대한 폰트 크기
</details>
<details>

<summary>``var lineHeight: CGFloat``</summary>

각 변형에 대한 행 높이
</details>
<details>

<summary>``var lineSpacing: CGFloat``</summary>

각 변형에 대한 행간 높이
</details>
<details>

<summary>``var tracking: CGFloat``</summary>

각 변형에 대한 자간 (letter spacing)
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>
<details>

<summary>``enum Weight``</summary>

폰트 두께를 정의하는 열거형
#### Enumeration Cases

<details>

<summary>``case bold``</summary>

굵은 두께
</details>
<details>

<summary>``case medium``</summary>

중간 두께
</details>
<details>

<summary>``case regular``</summary>

일반 두께
</details>

#### Instance Properties

<details>

<summary>``var pretendardWeight: Pretendard.Weight``</summary>

Pretendard 폰트 두께 매핑
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations)

</details>

