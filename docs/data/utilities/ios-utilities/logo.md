---
title: Logo
description: Montage 디자인 시스템의 로고 세트
---

```swift
enum Logo
```

## Overview

Logo는 Wanted 브랜드의 공식 로고 이미지들을 정의합니다. 각 로고는 브랜드 아이덴티티를 일관되게 표현하기 위해 다양한 형태와 방향으로 제공됩니다.

```swift
// UIKit에서 사용
let imageView = UIImageView()
imageView.image = UIImage.montage(.wantedLogoHorizontal)

// SwiftUI에서 사용
Image.montage(.wantedCircleSymbol)
    .resizable()
    .scaledToFit()
    .frame(width: 40, height: 40)
```

>  **Note**
>
> 로고를 사용할 때는 브랜드 가이드라인에 따라 적절한 여백과 비율을 유지해야 합니다.

## Topics

### Enumeration Cases

<details>

<summary>``case wantedCircleSymbol``</summary>

Wanted 원형 심볼 로고
</details>
<details>

<summary>``case wantedLogoHorizontal``</summary>

Wanted 가로형 로고
</details>
<details>

<summary>``case wantedLogoVertical``</summary>

Wanted 세로형 로고
</details>

___
### Instance Properties

<details>

<summary>``var name: String``</summary>

로고의 리소스 이름을 반환합니다.
</details>

___
### Default Implementations


[Equatable Implementations](/docs/utilities/ios-utilities/equatable-implementations.md)

## Relationships

Conforms To

`Swift.Equatable`

`Swift.Hashable`



