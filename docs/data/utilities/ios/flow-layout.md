---
title: FlowLayout
description: 항목들을 자동으로 여러 줄에 배치하는 흐름 레이아웃 컴포넌트입니다.
---

Structure

# FlowLayout

```swift
struct FlowLayout
```

## Overview

이 레이아웃은 컨테이너의 너비를 초과할 경우 항목을 자동으로 다음 줄로 넘겨 배치합니다. 항목 간 수평 간격과 줄 간 수직 간격을 설정할 수 있습니다.

```swift
FlowLayout(spacing: 8, lineSpacing: 12) {
    ForEach(tags, id: \.self) { tag in
        Text(tag)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(Color.blue.opacity(0.1))
            .cornerRadius(16)
    }
}
```

## Topics

### Structures

<details>

<summary>``struct Cache``</summary>

레이아웃 계산에 사용되는 캐시 구조체입니다.
</details>

___
### Initializers

<details>

<summary>``init(spacing: CGFloat?, lineSpacing: CGFloat)``</summary>

FlowLayout을 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `spacing` | 항목 간 수평 간격. nil인 경우 시스템 기본 간격을 사용합니다. (기본값: nil) |
  | `lineSpacing` | 줄 간 수직 간격 (기본값: 10.0) |
</details>

___
### Instance Methods

<details>

<summary>``func makeCache(subviews: Subviews) -> Cache``</summary>

레이아웃 캐시를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `subviews` | 배치할 서브뷰 컬렉션 |
- **Return Value**

  각 서브뷰의 크기와 간격 정보를 포함한 캐시
</details>
<details>

<summary>``func placeSubviews(in: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout Cache)``</summary>

서브뷰들을 실제 위치에 배치합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `bounds` | 레이아웃의 경계 사각형 |
  | `proposal` | 제안된 크기 |
  | `subviews` | 배치할 서브뷰 컬렉션 |
  | `cache` | 레이아웃 캐시 |
</details>
<details>

<summary>``func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout Cache) -> CGSize``</summary>

레이아웃의 전체 크기를 계산합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `proposal` | 제안된 크기 |
  | `subviews` | 배치할 서브뷰 컬렉션 |
  | `cache` | 레이아웃 캐시 |
- **Return Value**

  계산된 레이아웃의 전체 크기
</details>

___
### Default Implementations


[Animatable Implementations](/docs/utilities/ios/animatable-implementations.md)

[Layout Implementations](/docs/utilities/ios/layout-implementations.md)

## Relationships

Conforms To

`SwiftUICore.Animatable`

`SwiftUICore.Layout`



