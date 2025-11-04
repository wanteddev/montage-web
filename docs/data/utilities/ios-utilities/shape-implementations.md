---
title: Shape Implementations
---

## Topics

### Instance Properties

<details>

<summary>``var layoutDirectionBehavior: LayoutDirectionBehavior``</summary>
</details>

___
### Instance Methods

<details>

<summary>``func fill<S>(S, style: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func fill<S>(S, style: FillStyle) -> _ShapeView<Self, S>``</summary>
</details>
<details>

<summary>``func fill(style: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func intersection<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>
<details>

<summary>``func lineIntersection<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>
<details>

<summary>``func lineSubtraction<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>
<details>

<summary>``func offset(CGSize) -> OffsetShape<Self>``</summary>
</details>
<details>

<summary>``func offset(CGPoint) -> OffsetShape<Self>``</summary>
</details>
<details>

<summary>``func offset(x: CGFloat, y: CGFloat) -> OffsetShape<Self>``</summary>
</details>
<details>

<summary>``func rotation(Angle, anchor: UnitPoint) -> RotatedShape<Self>``</summary>
</details>
<details>

<summary>``func scale(CGFloat, anchor: UnitPoint) -> ScaledShape<Self>``</summary>
</details>
<details>

<summary>``func scale(x: CGFloat, y: CGFloat, anchor: UnitPoint) -> ScaledShape<Self>``</summary>
</details>
<details>

<summary>``func size(CGSize) -> some Shape``</summary>
</details>
<details>

<summary>``func size(CGSize, anchor: UnitPoint) -> some Shape``</summary>
</details>
<details>

<summary>``func size(width: CGFloat, height: CGFloat) -> some Shape``</summary>
</details>
<details>

<summary>``func size(width: CGFloat, height: CGFloat, anchor: UnitPoint) -> some Shape``</summary>
</details>
<details>

<summary>``func sizeThatFits(ProposedViewSize) -> CGSize``</summary>
</details>
<details>

<summary>``func stroke<S>(S, lineWidth: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func stroke<S>(S, lineWidth: CGFloat, antialiased: Bool) -> StrokeShapeView<Self, S, EmptyView>``</summary>
</details>
<details>

<summary>``func stroke<S>(S, style: StrokeStyle) -> some View``</summary>
</details>
<details>

<summary>``func stroke<S>(S, style: StrokeStyle, antialiased: Bool) -> StrokeShapeView<Self, S, EmptyView>``</summary>
</details>
<details>

<summary>``func stroke(lineWidth: CGFloat) -> some Shape``</summary>
</details>
<details>

<summary>``func stroke(style: StrokeStyle) -> some Shape``</summary>
</details>
<details>

<summary>``func subtracting<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>
<details>

<summary>``func symmetricDifference<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>
<details>

<summary>``func transform(CGAffineTransform) -> TransformedShape<Self>``</summary>
</details>
<details>

<summary>``func trim(from: CGFloat, to: CGFloat) -> some Shape``</summary>
</details>
<details>

<summary>``func union<T>(T, eoFill: Bool) -> some Shape``</summary>
</details>

___
### Type Properties

<details>

<summary>``static var role: ShapeRole``</summary>
</details>

