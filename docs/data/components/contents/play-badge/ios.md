---
title: Play badge
description: 재생 버튼이 있는 배지 컴포넌트입니다.
---

```swift
@MainActor struct PlayBadge
```

## Overview

`PlayBadge`는 미디어 콘텐츠에서 재생 기능을 나타내는 원형 아이콘을 제공합니다. 다양한 크기와 스타일로 커스터마이징할 수 있으며, 이미지나 비디오 위에 오버레이로 표시하기 적합합니다.

```swift
// 기본 재생 배지
PlayBadge()

// 커스텀 크기의 재생 배지
PlayBadge()
    .size(.large)

// 대체 스타일의 재생 배지
PlayBadge()
    .size(.medium)
    .alternative(true)
```

>  **Note**
>
> 기본 스타일은 반투명 배경에 흰색 재생 아이콘을 사용합니다. alternative 스타일은 불투명 회색 배경을 사용합니다.

## Topics

### Initializers

<details>

<summary>``init()``</summary>

기본 설정의 재생 배지를 생성합니다.
- **Discussion**

  초기화 시 기본 크기는 `.medium`이며, 반투명 배경의 기본 스타일이 적용됩니다.
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func alternative(Bool) -> PlayBadge``</summary>

대체 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `alternative` | 대체 스타일 적용 여부 (기본값: true) |
- **Return Value**

  수정된 PlayBadge 인스턴스
- **Discussion**

  기본 스타일은 반투명 배경을 사용하고, 대체 스타일은 불투명한 회색 배경을 사용합니다.
  >  **Note**
  >
  > 기본값은 `false`입니다.

</details>
<details>

<summary>``func size(Size) -> PlayBadge``</summary>

재생 배지의 크기를 설정합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 적용할 배지 크기 |
- **Return Value**

  수정된 PlayBadge 인스턴스
- **Discussion**
  >  **Note**
  >
  > 기본값은 `.medium`입니다.

</details>

___
### Enumerations

<details>

<summary>``enum Size``</summary>

재생 배지의 크기를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>

큰 크기 배지
</details>
<details>

<summary>``case medium``</summary>

중간 크기 배지
</details>
<details>

<summary>``case small``</summary>

작은 크기 배지
</details>

#### Default Implementations


[Equatable Implementations](/docs/utilities/ios/equatable-implementations.md)

</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



