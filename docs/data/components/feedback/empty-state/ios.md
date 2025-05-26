---
title: Empty state
description: 콘텐츠가 빈 상태일 때 사용자의 이해를 돕기 위한 컴포넌트입니다.
---

```swift
@MainActor struct EmptyState
```

## Overview

빈 화면, 데이터 없음, 검색 결과 없음 등의 상태를 시각적으로 표현하고 사용자에게 적절한 안내를 제공합니다. 이미지, 제목, 설명, 버튼 요소를 조합하여 다양한 상황에 맞는 빈 상태 화면을 구성할 수 있습니다.

```swift
// 기본 사용법
EmptyState(
    description: "검색 결과가 없습니다."
)

// 모든 요소를 사용한 예시
EmptyState(
    image: { 
        Image.montage(.emptyBox)
            .resizable()
            .frame(width: 120, height: 120)
    },
    title: "데이터가 없습니다.",
    description: "새로운 항목을 추가해 보세요.",
    button: {
        Button.filled(text: "추가하기") {
            // 버튼 동작
        }
    }
)
```

>  **Note**
>
> 컴포넌트가 기본적으로 화면 전체를 차지하므로 필요하다면 .frame modifier를 사용하여 크기를 조절하여 사용하시길 권장합니다.

## Topics

### Initializers

<details>

<summary>``init(image: (() -> any View)?, title: String?, description: String, button: (() -> any View)?)``</summary>

EmptyState 컴포넌트를 초기화합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `image` | 상단에 표시할 이미지 뷰를 반환하는 클로저 (선택 사항) |
  | `title` | 강조되어 표시할 제목 (선택 사항) |
  | `description` | 상황을 설명하는 텍스트 (필수) |
  | `button` | 하단에 표시할 버튼 뷰를 반환하는 클로저 (선택 사항) |
- **Discussion**

  원하는 레이아웃을 구성하기 위해 이미지, 제목, 설명, 버튼을 선택적으로 제공할 수 있습니다. 설명은 필수이며, 최대 2줄로 표시됩니다.
</details>

___
### Instance Properties

<details>

<summary>``var body: some View``</summary>
</details>

___
### Default Implementations


[View Implementations](/docs/utilities/ios/view-implementations.md)

[View Implementations](/docs/utilities/ios/view-implementations.md)

## Relationships

Conforms To

`Swift.Sendable`

`SwiftUICore.View`



