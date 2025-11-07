---
title: Shadow
---

```swift
enum Shadow
```

## Topics

### Enumerations

<details>

<summary>``enum Level``</summary>


그림자의 강도를 정의하는 열거형입니다.
#### Enumeration Cases

<details>

<summary>``case large``</summary>


큰 그림자
</details>
<details>

<summary>``case medium``</summary>


중간 크기 그림자
</details>
<details>

<summary>``case none``</summary>


그림자 없음
</details>
<details>

<summary>``case small``</summary>


작은 그림자
</details>
<details>

<summary>``case xlarge``</summary>


매우 큰 그림자
</details>
<details>

<summary>``case xsmall``</summary>


매우 작은 그림자
</details>

</details>

___
### Associated Extensions

<details>

<summary>``extension View``</summary>

<details>

<summary>``func shadow(Shadow.Level) -> some View``</summary>


현재 뷰에 그림자를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `level` | 적용할 그림자 레벨 |
- **Return Value**

  그림자가 적용된 뷰
- **Discussion**

  지정된 레벨의 그림자를 뷰에 적용하여 깊이감을 줍니다. 키 그림자와 앰비언트 그림자가 조합되어 자연스러운 그림자 효과를 만듭니다.

  ```swift
  // 기본 사용법
  RoundedRectangle(cornerRadius: 12)
      .fill(.white)
      .shadow(.medium)
  
  // 버튼에 그림자 적용
  Button("확인") { }
      .padding()
      .background(.blue)
      .foregroundColor(.white)
      .cornerRadius(8)
      .shadow(.small)
  
  // 카드에 큰 그림자 적용
  VStack {
      Text("카드 제목")
      Text("카드 내용")
  }
  .padding()
  .background(.white)
  .cornerRadius(16)
  .shadow(.large)
  ```

</details>


</details>

