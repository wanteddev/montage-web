---
title: Opacity
description: 색상의 투명도를 정의한 열거형입니다.
---

```swift
enum Opacity
```

## Overview

Montage 디자인 시스템에서 사용하는 정규화된 투명도 값을 제공합니다. 각 케이스는 백분율 형식으로 이름이 지정되어 있습니다 (예: p005는 5% 투명도).

```swift
// CGFloat 값으로 변환
let alpha: CGFloat = .opacity(.p052)

// 뷰 투명도 설정
myView.alpha = .opacity(.p088)

// 색상 투명도 설정
let transparentColor = UIColor.black.withAlphaComponent(.opacity(.p043))
```

>  **Note**
>
> 표준화된 투명도 값을 사용하면 디자인의 일관성을 유지하는 데 도움이 됩니다.

## Topics

### Enumeration Cases

<details>

<summary>``case p000``</summary>


0% 투명도 (완전 불투명)
</details>
<details>

<summary>``case p005``</summary>


5% 투명도
</details>
<details>

<summary>``case p008``</summary>


8% 투명도
</details>
<details>

<summary>``case p012``</summary>


12% 투명도
</details>
<details>

<summary>``case p016``</summary>


16% 투명도
</details>
<details>

<summary>``case p022``</summary>


22% 투명도
</details>
<details>

<summary>``case p028``</summary>


28% 투명도
</details>
<details>

<summary>``case p032``</summary>


32% 투명도
</details>
<details>

<summary>``case p035``</summary>


35% 투명도
</details>
<details>

<summary>``case p043``</summary>


43% 투명도
</details>
<details>

<summary>``case p052``</summary>


52% 투명도
</details>
<details>

<summary>``case p061``</summary>


61% 투명도
</details>
<details>

<summary>``case p074``</summary>


74% 투명도
</details>
<details>

<summary>``case p088``</summary>


88% 투명도
</details>
<details>

<summary>``case p097``</summary>


97% 투명도
</details>
<details>

<summary>``case p100``</summary>


100% 투명도 (완전 투명)
</details>

___
___
### Associated Extensions

<details>

<summary>``extension CGFloat``</summary>

<details>

<summary>``static func opacity(Opacity) -> CGFloat``</summary>


Opacity 열거형 값에 해당하는 CGFloat 불투명도 값을 반환합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `opacityComponent` | 사용할 불투명도 열거형 값 |
- **Return Value**

  지정된 불투명도에 해당하는 CGFloat 값 (0.0 ~ 1.0 범위)
- **Discussion**

  디자인 시스템에서 정의된 일관된 불투명도 값을 사용할 수 있도록 합니다.

  ```swift
  let alpha = CGFloat.opacity(.p052) // 0.52
  ```

</details>


</details>


<details>

<summary>``extension Float``</summary>

<details>

<summary>``static func opacity(Opacity) -> Float``</summary>


Opacity 열거형 값에 해당하는 Float 불투명도 값을 반환합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `opacityComponent` | 사용할 불투명도 열거형 값 |
- **Return Value**

  지정된 불투명도에 해당하는 Float 값 (0.0 ~ 1.0 범위)
- **Discussion**

  디자인 시스템에서 정의된 일관된 불투명도 값을 사용할 수 있도록 합니다.

  ```swift
  let alpha = Float.opacity(.p050) // 0.5
  ```

</details>


</details>

## Relationships

Conforms To

`Swift.Equatable`

`Swift.Hashable`



