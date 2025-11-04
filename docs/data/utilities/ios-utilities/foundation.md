---
title: Foundation
---

## Topics

### Extended Classes

<details>

<summary>``extension NSAttributedString``</summary>

Montage 디자인 시스템의 타이포그래피를 적용한 NSAttributedString을 생성하는 확장입니다.
#### Type Methods

<details>

<summary>``static func attributedString(String, variant: Typography.Variant, weight: Typography.Weight, color: SwiftUI.Color, lineBreakMode: NSLineBreakMode) -> NSAttributedString``</summary>

Montage 디자인 시스템의 타이포그래피를 적용한 NSAttributedString을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `string` | 변환할 문자열 |
  | `variant` | 타이포그래피 변형 (기본값: .body1) |
  | `weight` | 폰트 두께 (기본값: .regular) |
  | `color` | 색상 |
  | `lineBreakMode` | 줄바꿈 모드 (기본값: .byWordWrapping) |
- **Return Value**

  Montage 스타일이 적용된 NSAttributedString
</details>
<details>

<summary>``static func attributedString(String, variant: Typography.Variant, weight: Typography.Weight, semantic: Color.Semantic, lineBreakMode: NSLineBreakMode) -> NSAttributedString``</summary>

Montage 디자인 시스템의 타이포그래피를 적용한 NSAttributedString을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `string` | 변환할 문자열 |
  | `variant` | 타이포그래피 변형 (기본값: .body1) |
  | `weight` | 폰트 두께 (기본값: .regular) |
  | `semantic` | 의미론적 색상 |
  | `lineBreakMode` | 줄바꿈 모드 (기본값: .byWordWrapping) |
- **Return Value**

  Montage 스타일이 적용된 NSAttributedString
</details>

</details>

