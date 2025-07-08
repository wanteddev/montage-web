---
title: View Implementations
---

## Topics

### Instance Methods

<details>

<summary>~~``func accentColor(Color?) -> some View``~~</summary>
</details>
<details>

<summary>~~``func accessibility(activationPoint: CGPoint) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(activationPoint: UnitPoint) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(addTraits: AccessibilityTraits) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(hidden: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(hint: Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(identifier: String) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(inputLabels: [Text]) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(label: Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(removeTraits: AccessibilityTraits) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(selectionIdentifier: AnyHashable) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(sortPriority: Double) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>~~``func accessibility(value: Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>``func accessibilityAction(AccessibilityActionKind, () -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityAction<Label>(action: () -> Void, label: () -> Label) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityAction<S>(named: S, () -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityAction(named: LocalizedStringKey, () -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityAction(named: Text, () -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityActions<Content>(() -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityActions<Content>(category: AccessibilityActionCategory, () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityActivationPoint(CGPoint) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityActivationPoint(UnitPoint) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityActivationPoint(CGPoint, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityActivationPoint(UnitPoint, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityAddTraits(AccessibilityTraits) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityAdjustableAction((AccessibilityAdjustmentDirection) -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityChartDescriptor<R>(R) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityChildren<V>(children: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent(AccessibilityCustomContentKey, LocalizedStringKey, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent<V>(LocalizedStringKey, V, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent(AccessibilityCustomContentKey, Text?, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>~~``func accessibilityCustomContent<L, V>(L, V, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``~~</summary>
</details>
<details>

<summary>``func accessibilityCustomContent(LocalizedStringKey, Text, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent(Text, Text, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent<V>(AccessibilityCustomContentKey, V, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityCustomContent(LocalizedStringKey, LocalizedStringKey, importance: AXCustomContent.Importance) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDirectTouch(Bool, options: AccessibilityDirectTouchOptions) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint(UnitPoint, description: Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint<S>(UnitPoint, description: S) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint(UnitPoint, description: LocalizedStringKey) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint(UnitPoint, description: LocalizedStringKey, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint<S>(UnitPoint, description: S, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDragPoint(UnitPoint, description: Text, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint(UnitPoint, description: Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint<S>(UnitPoint, description: S) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint(UnitPoint, description: LocalizedStringKey) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint(UnitPoint, description: LocalizedStringKey, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint<S>(UnitPoint, description: S, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityDropPoint(UnitPoint, description: Text, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityElement(children: AccessibilityChildBehavior) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityFocused(AccessibilityFocusState<Bool>.Binding) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityFocused<Value>(AccessibilityFocusState<Value>.Binding, equals: Value) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityHeading(AccessibilityHeadingLevel) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHidden(Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHidden(Bool, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint(LocalizedStringKey) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint<S>(S) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint(Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint(LocalizedStringKey, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint(Text, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityHint<S>(S, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityIdentifier(String) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityIdentifier(String, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityIgnoresInvertColors(Bool) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels<S>([S]) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels([Text]) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels([LocalizedStringKey]) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels([LocalizedStringKey], isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels([Text], isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityInputLabels<S>([S], isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel(LocalizedStringKey) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel<S>(S) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel(Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel(Text, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel<S>(S, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel(LocalizedStringKey, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityLabel<V>(content: (PlaceholderContentView<Self>) -> V) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityLabeledPair<ID>(role: AccessibilityLabeledPairRole, id: ID, in: Namespace.ID) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityLinkedGroup<ID>(id: ID, in: Namespace.ID) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRemoveTraits(AccessibilityTraits) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityRepresentation<V>(representation: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRespondsToUserInteraction(Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityRespondsToUserInteraction(Bool, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityRotor<Content>(LocalizedStringKey, entries: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<L, Content>(L, entries: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<Content>(Text, entries: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<Content>(AccessibilitySystemRotor, entries: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel, ID>(Text, entries: [EntryModel], entryID: KeyPath<EntryModel, ID>, entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<L, EntryModel, ID>(L, entries: [EntryModel], entryID: KeyPath<EntryModel, ID>, entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel, ID>(AccessibilitySystemRotor, entries: [EntryModel], entryID: KeyPath<EntryModel, ID>, entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel, ID>(LocalizedStringKey, entries: [EntryModel], entryID: KeyPath<EntryModel, ID>, entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel>(AccessibilitySystemRotor, entries: [EntryModel], entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<L, EntryModel>(L, entries: [EntryModel], entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel>(LocalizedStringKey, entries: [EntryModel], entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<EntryModel>(Text, entries: [EntryModel], entryLabel: KeyPath<EntryModel, String>) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor(Text, textRanges: [Range<String.Index>]) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor(AccessibilitySystemRotor, textRanges: [Range<String.Index>]) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor(LocalizedStringKey, textRanges: [Range<String.Index>]) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotor<L>(L, textRanges: [Range<String.Index>]) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityRotorEntry<ID>(id: ID, in: Namespace.ID) -> some View``</summary>
</details>
<details>

<summary>``func accessibilityScrollAction((Edge) -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityShowsLargeContentViewer() -> some View``</summary>
</details>
<details>

<summary>``func accessibilityShowsLargeContentViewer<V>(() -> V) -> some View``</summary>
</details>
<details>

<summary>``func accessibilitySortPriority(Double) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityTextContentType(AccessibilityTextContentType) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue<S>(S) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue(Text) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue(LocalizedStringKey) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue<S>(S, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue(LocalizedStringKey, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityValue(Text, isEnabled: Bool) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func accessibilityZoomAction((AccessibilityZoomGestureAction) -> Void) -> ModifiedContent<Self, AccessibilityAttachmentModifier>``</summary>
</details>
<details>

<summary>``func actionArea(model: ActionArea.Model) -> some View``</summary>

현재 뷰에 하단 ActionArea를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `model` | ActionArea의 구성 모델 |
- **Return Value**

  ActionArea가 적용된 뷰
- **Discussion**
</details>
<details>

<summary>~~``func actionSheet(isPresented: Binding<Bool>, content: () -> ActionSheet) -> some View``~~</summary>
</details>
<details>

<summary>~~``func actionSheet<T>(item: Binding<T?>, content: (T) -> ActionSheet) -> some View``~~</summary>
</details>
<details>

<summary>``func alert<S, A>(S, isPresented: Binding<Bool>, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A>(Text, isPresented: Binding<Bool>, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A>(LocalizedStringKey, isPresented: Binding<Bool>, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, M>(Text, isPresented: Binding<Bool>, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func alert<S, A, M>(S, isPresented: Binding<Bool>, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, M>(LocalizedStringKey, isPresented: Binding<Bool>, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func alert<S, A, T>(S, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, T>(Text, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, T>(LocalizedStringKey, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, M, T>(Text, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>``func alert<S, A, M, T>(S, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>``func alert<A, M, T>(LocalizedStringKey, isPresented: Binding<Bool>, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>~~``func alert(isPresented: Binding<Bool>, content: () -> Alert) -> some View``~~</summary>
</details>
<details>

<summary>``func alert<E, A>(isPresented: Binding<Bool>, error: E?, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func alert<E, A, M>(isPresented: Binding<Bool>, error: E?, actions: (E) -> A, message: (E) -> M) -> some View``</summary>
</details>
<details>

<summary>~~``func alert<Item>(item: Binding<Item?>, content: (Item) -> Alert) -> some View``~~</summary>
</details>
<details>

<summary>``func alignmentGuide(HorizontalAlignment, computeValue: (ViewDimensions) -> CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func alignmentGuide(VerticalAlignment, computeValue: (ViewDimensions) -> CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func allowedDynamicRange(Image.DynamicRange?) -> some View``</summary>
</details>
<details>

<summary>``func allowsHitTesting(Bool) -> some View``</summary>
</details>
<details>

<summary>``func allowsTightening(Bool) -> some View``</summary>
</details>
<details>

<summary>``func allowsWindowActivationEvents(Bool?) -> some View``</summary>
</details>
<details>

<summary>``func anchorPreference<A, K>(key: K.Type, value: Anchor<A>.Source, transform: (Anchor<A>) -> K.Value) -> some View``</summary>
</details>
<details>

<summary>~~``func animation(Animation?) -> some View``~~</summary>
</details>
<details>

<summary>``func animation<V>(Animation?, body: (PlaceholderContentView<Self>) -> V) -> some View``</summary>
</details>
<details>

<summary>``func animation<V>(Animation?, value: V) -> some View``</summary>
</details>
<details>

<summary>``func asUIImage() -> UIImage``</summary>

View를 UIImage로 변환합니다.
- **Return Value**

  변환된 UIImage
</details>
<details>

<summary>``func aspectRatio(CGFloat?, contentMode: ContentMode) -> some View``</summary>
</details>
<details>

<summary>``func aspectRatio(CGSize, contentMode: ContentMode) -> some View``</summary>
</details>
<details>

<summary>~~``func autocapitalization(UITextAutocapitalizationType) -> some View``~~</summary>
</details>
<details>

<summary>``func autocorrectionDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>~~``func background<Background>(Background, alignment: Alignment) -> some View``~~</summary>
</details>
<details>

<summary>``func background<S>(S, ignoresSafeAreaEdges: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func background<S, T>(S, in: T, fillStyle: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func background<S, T>(S, in: T, fillStyle: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func background<V>(alignment: Alignment, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func background(ignoresSafeAreaEdges: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func background<S>(in: S, fillStyle: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func background<S>(in: S, fillStyle: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func backgroundPreferenceValue<Key, T>(Key.Type, (Key.Value) -> T) -> some View``</summary>
</details>
<details>

<summary>``func backgroundPreferenceValue<K, V>(K.Type, alignment: Alignment, (K.Value) -> V) -> some View``</summary>
</details>
<details>

<summary>``func backgroundStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func badge<S>(S?) -> some View``</summary>
</details>
<details>

<summary>``func badge(Text?) -> some View``</summary>
</details>
<details>

<summary>``func badge(LocalizedStringKey?) -> some View``</summary>
</details>
<details>

<summary>``func badge(Int) -> some View``</summary>
</details>
<details>

<summary>``func badgeProminence(BadgeProminence) -> some View``</summary>
</details>
<details>

<summary>``func baselineOffset(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func blendMode(BlendMode) -> some View``</summary>
</details>
<details>

<summary>``func blur(radius: CGFloat, opaque: Bool) -> some View``</summary>
</details>
<details>

<summary>``func bold(Bool) -> some View``</summary>
</details>
<details>

<summary>``func border<S>(S, width: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func bottomSheetModal(isPresented: Binding<Bool>, needHandle: Bool, resize: BottomSheetModal.Resize, actionAreaModel: ActionArea.Model?, () -> any View, navigation: (() -> ModalNavigation)?) -> some View``</summary>

바텀 시트 모달을 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `needHandle` | 상단 핸들 표시 여부 (기본값: true) |
  | `resize` | 모달 크기 조절 방식 (기본값: .hug) |
  | `actionAreaModel` | 모달 하단에 표시할 액션 영역 모델 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저 |
- **Return Value**

  바텀 시트 모달이 적용된 뷰
- **Discussion**

  화면 하단에서 올라오는 바텀 시트 형태의 모달을 표시합니다.
</details>
<details>

<summary>``func brightness(Double) -> some View``</summary>
</details>
<details>

<summary>``func buttonBorderShape(ButtonBorderShape) -> some View``</summary>
</details>
<details>

<summary>``func buttonRepeatBehavior(ButtonRepeatBehavior) -> some View``</summary>
</details>
<details>

<summary>``func buttonStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func buttonStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func carveLogForPreview(String, font: Font?, alignment: Alignment) -> some View``</summary>

프리뷰에서 뷰 위에 로그를 출력합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `message` | 출력할 메시지 |
  | `font` | 폰트 |
  | `alignment` | 정렬 |
- **Return Value**

  로그가 출력된 View
</details>
<details>

<summary>``func clipShape<S>(S, style: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func clipped(antialiased: Bool) -> some View``</summary>
</details>
<details>

<summary>``func colorEffect(Shader, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func colorInvert() -> some View``</summary>
</details>
<details>

<summary>``func colorMultiply(Color) -> some View``</summary>
</details>
<details>

<summary>~~``func colorScheme(ColorScheme) -> some View``~~</summary>
</details>
<details>

<summary>``func compositingGroup() -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A>(Text, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A>(LocalizedStringKey, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<S, A>(S, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, M>(LocalizedStringKey, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, M>(Text, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<S, A, M>(S, isPresented: Binding<Bool>, titleVisibility: Visibility, actions: () -> A, message: () -> M) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, T>(LocalizedStringKey, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, T>(Text, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<S, A, T>(S, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, M, T>(LocalizedStringKey, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<S, A, M, T>(S, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>``func confirmationDialog<A, M, T>(Text, isPresented: Binding<Bool>, titleVisibility: Visibility, presenting: T?, actions: (T) -> A, message: (T) -> M) -> some View``</summary>
</details>
<details>

<summary>``func containerBackground<S>(S, for: ContainerBackgroundPlacement) -> some View``</summary>
</details>
<details>

<summary>``func containerBackground<V>(for: ContainerBackgroundPlacement, alignment: Alignment, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func containerRelativeFrame(Axis.Set, alignment: Alignment) -> some View``</summary>
</details>
<details>

<summary>``func containerRelativeFrame(Axis.Set, alignment: Alignment, (CGFloat, Axis) -> CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func containerRelativeFrame(Axis.Set, count: Int, span: Int, spacing: CGFloat, alignment: Alignment) -> some View``</summary>
</details>
<details>

<summary>``func containerShape<T>(T) -> some View``</summary>
</details>
<details>

<summary>``func containerValue<V>(WritableKeyPath<ContainerValues, V>, V) -> some View``</summary>
</details>
<details>

<summary>``func contentMargins(Edge.Set, CGFloat?, for: ContentMarginPlacement) -> some View``</summary>
</details>
<details>

<summary>``func contentMargins(Edge.Set, EdgeInsets, for: ContentMarginPlacement) -> some View``</summary>
</details>
<details>

<summary>``func contentMargins(CGFloat, for: ContentMarginPlacement) -> some View``</summary>
</details>
<details>

<summary>``func contentShape<S>(ContentShapeKinds, S, eoFill: Bool) -> some View``</summary>
</details>
<details>

<summary>``func contentShape<S>(S, eoFill: Bool) -> some View``</summary>
</details>
<details>

<summary>``func contentTransition(ContentTransition) -> some View``</summary>
</details>
<details>

<summary>~~``func contextMenu<MenuItems>(ContextMenu<MenuItems>?) -> some View``~~</summary>
</details>
<details>

<summary>``func contextMenu<I, M>(forSelectionType: I.Type, menu: (Set<I>) -> M, primaryAction: ((Set<I>) -> Void)?) -> some View``</summary>
</details>
<details>

<summary>``func contextMenu<MenuItems>(menuItems: () -> MenuItems) -> some View``</summary>
</details>
<details>

<summary>``func contextMenu<M, P>(menuItems: () -> M, preview: () -> P) -> some View``</summary>
</details>
<details>

<summary>``func contrast(Double) -> some View``</summary>
</details>
<details>

<summary>``func controlGroupStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func controlSize(ControlSize) -> some View``</summary>
</details>
<details>

<summary>``func coordinateSpace(NamedCoordinateSpace) -> some View``</summary>
</details>
<details>

<summary>~~``func coordinateSpace<T>(name: T) -> some View``~~</summary>
</details>
<details>

<summary>~~``func cornerRadius(CGFloat, antialiased: Bool) -> some View``~~</summary>
</details>
<details>

<summary>``func datePickerStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func defaultAdaptableTabBarPlacement(AdaptableTabBarPlacement) -> some View``</summary>
</details>
<details>

<summary>``func defaultAppStorage(UserDefaults) -> some View``</summary>
</details>
<details>

<summary>``func defaultFocus<V>(FocusState<V>.Binding, V, priority: DefaultFocusEvaluationPriority) -> some View``</summary>
</details>
<details>

<summary>``func defaultHoverEffect(HoverEffect?) -> some View``</summary>
</details>
<details>

<summary>``func defaultHoverEffect(some CustomHoverEffect) -> some View``</summary>
</details>
<details>

<summary>``func defaultScrollAnchor(UnitPoint?) -> some View``</summary>
</details>
<details>

<summary>``func defaultScrollAnchor(UnitPoint?, for: ScrollAnchorRole) -> some View``</summary>
</details>
<details>

<summary>``func defersSystemGestures(on: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func deleteDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func dialogIcon(Image?) -> some View``</summary>
</details>
<details>

<summary>``func dialogSuppressionToggle(LocalizedStringKey, isSuppressed: Binding<Bool>) -> some View``</summary>
</details>
<details>

<summary>``func dialogSuppressionToggle<S>(S, isSuppressed: Binding<Bool>) -> some View``</summary>
</details>
<details>

<summary>``func dialogSuppressionToggle(Text, isSuppressed: Binding<Bool>) -> some View``</summary>
</details>
<details>

<summary>``func dialogSuppressionToggle(isSuppressed: Binding<Bool>) -> some View``</summary>
</details>
<details>

<summary>~~``func disableAutocorrection(Bool?) -> some View``~~</summary>
</details>
<details>

<summary>``func disableSwipeBack(Bool) -> some View``</summary>

뷰에서 스와이프 백 제스처를 비활성화하는 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disabled` | 스와이프 백 제스처 비활성화 여부 |
- **Return Value**

  스와이프 백 제스처가 제어된 뷰
- **Discussion**

  네비게이션 컨트롤러의 스와이프 뒤로가기 제스처 인식기를 제어합니다.
</details>
<details>

<summary>``func disabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func disclosureGroupStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func distortionEffect(Shader, maxSampleOffset: CGSize, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func documentBrowserContextMenu(([URL]?) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func draggable<T>(@autoclosure () -> T) -> some View``</summary>
</details>
<details>

<summary>``func draggable<V, T>(@autoclosure () -> T, preview: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func drawingGroup(opaque: Bool, colorMode: ColorRenderingMode) -> some View``</summary>
</details>
<details>

<summary>``func dropDestination<T>(for: T.Type, action: ([T], CGPoint) -> Bool, isTargeted: (Bool) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func dynamicTypeSize(DynamicTypeSize) -> some View``</summary>
</details>
<details>

<summary>~~``func edgesIgnoringSafeArea(Edge.Set) -> some View``~~</summary>
</details>
<details>

<summary>``func elevation(Elevation) -> Self``</summary>

Montage 디자인 시스템의 그림자 효과를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `elevation` | 적용할 그림자 효과 |
- **Return Value**

  그림자 효과가 적용된 View
</details>
<details>

<summary>``func environment<T>(T?) -> some View``</summary>
</details>
<details>

<summary>``func environment<V>(WritableKeyPath<EnvironmentValues, V>, V) -> some View``</summary>
</details>
<details>

<summary>``func environmentObject<T>(T) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogBrowserOptions(FileDialogBrowserOptions) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogConfirmationLabel(Text?) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogConfirmationLabel(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogConfirmationLabel<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogCustomizationID(String) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogDefaultDirectory(URL?) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogImportsUnresolvedAliases(Bool) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogMessage<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogMessage(Text?) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogMessage(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func fileDialogURLEnabled(Predicate<URL>) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<D>(isPresented: Binding<Bool>, document: D?, contentType: UTType, defaultFilename: String?, onCompletion: (Result<URL, any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<D>(isPresented: Binding<Bool>, document: D?, contentType: UTType, defaultFilename: String?, onCompletion: (Result<URL, any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<D>(isPresented: Binding<Bool>, document: D?, contentTypes: [UTType], defaultFilename: String?, onCompletion: (Result<URL, any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<D>(isPresented: Binding<Bool>, document: D?, contentTypes: [UTType], defaultFilename: String?, onCompletion: (Result<URL, any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<C>(isPresented: Binding<Bool>, documents: C, contentType: UTType, onCompletion: (Result<[URL], any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<C>(isPresented: Binding<Bool>, documents: C, contentType: UTType, onCompletion: (Result<[URL], any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<C>(isPresented: Binding<Bool>, documents: C, contentTypes: [UTType], onCompletion: (Result<[URL], any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<C>(isPresented: Binding<Bool>, documents: C, contentTypes: [UTType], onCompletion: (Result<[URL], any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<T>(isPresented: Binding<Bool>, item: T?, contentTypes: [UTType], defaultFilename: String?, onCompletion: (Result<URL, any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporter<C, T>(isPresented: Binding<Bool>, items: C, contentTypes: [UTType], onCompletion: (Result<[URL], any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileExporterFilenameLabel(Text?) -> some View``</summary>
</details>
<details>

<summary>``func fileExporterFilenameLabel<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func fileExporterFilenameLabel(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func fileImporter(isPresented: Binding<Bool>, allowedContentTypes: [UTType], allowsMultipleSelection: Bool, onCompletion: (Result<[URL], any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileImporter(isPresented: Binding<Bool>, allowedContentTypes: [UTType], allowsMultipleSelection: Bool, onCompletion: (Result<[URL], any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileImporter(isPresented: Binding<Bool>, allowedContentTypes: [UTType], onCompletion: (Result<URL, any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileMover(isPresented: Binding<Bool>, file: URL?, onCompletion: (Result<URL, any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileMover(isPresented: Binding<Bool>, file: URL?, onCompletion: (Result<URL, any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileMover<C>(isPresented: Binding<Bool>, files: C, onCompletion: (Result<[URL], any Error>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func fileMover<C>(isPresented: Binding<Bool>, files: C, onCompletion: (Result<[URL], any Error>) -> Void, onCancellation: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func findDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func findNavigator(isPresented: Binding<Bool>) -> some View``</summary>
</details>
<details>

<summary>``func fixedSize() -> some View``</summary>
</details>
<details>

<summary>``func fixedSize(horizontal: Bool, vertical: Bool) -> some View``</summary>
</details>
<details>

<summary>``func flipsForRightToLeftLayoutDirection(Bool) -> some View``</summary>
</details>
<details>

<summary>``func focusEffectDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func focusable(Bool) -> some View``</summary>
</details>
<details>

<summary>``func focusable(Bool, interactions: FocusInteractions) -> some View``</summary>
</details>
<details>

<summary>``func focused(FocusState<Bool>.Binding) -> some View``</summary>
</details>
<details>

<summary>``func focused<Value>(FocusState<Value>.Binding, equals: Value) -> some View``</summary>
</details>
<details>

<summary>``func focusedObject<T>(T) -> some View``</summary>
</details>
<details>

<summary>``func focusedObject<T>(T?) -> some View``</summary>
</details>
<details>

<summary>``func focusedSceneObject<T>(T?) -> some View``</summary>
</details>
<details>

<summary>``func focusedSceneObject<T>(T) -> some View``</summary>
</details>
<details>

<summary>``func focusedSceneValue<T>(T?) -> some View``</summary>
</details>
<details>

<summary>``func focusedSceneValue<T>(WritableKeyPath<FocusedValues, T?>, T) -> some View``</summary>
</details>
<details>

<summary>``func focusedSceneValue<T>(WritableKeyPath<FocusedValues, T?>, T?) -> some View``</summary>
</details>
<details>

<summary>``func focusedValue<T>(T?) -> some View``</summary>
</details>
<details>

<summary>``func focusedValue<Value>(WritableKeyPath<FocusedValues, Value?>, Value) -> some View``</summary>
</details>
<details>

<summary>``func focusedValue<Value>(WritableKeyPath<FocusedValues, Value?>, Value?) -> some View``</summary>
</details>
<details>

<summary>``func font(Font?) -> some View``</summary>
</details>
<details>

<summary>``func fontDesign(Font.Design?) -> some View``</summary>
</details>
<details>

<summary>``func fontWeight(Font.Weight?) -> some View``</summary>
</details>
<details>

<summary>``func fontWidth(Font.Width?) -> some View``</summary>
</details>
<details>

<summary>~~``func foregroundColor(Color?) -> some View``~~</summary>
</details>
<details>

<summary>``func foregroundStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func foregroundStyle<S1, S2>(S1, S2) -> some View``</summary>
</details>
<details>

<summary>``func foregroundStyle<S1, S2, S3>(S1, S2, S3) -> some View``</summary>
</details>
<details>

<summary>``func formStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>~~``func frame() -> some View``~~</summary>
</details>
<details>

<summary>``func frame(minWidth: CGFloat?, idealWidth: CGFloat?, maxWidth: CGFloat?, minHeight: CGFloat?, idealHeight: CGFloat?, maxHeight: CGFloat?, alignment: Alignment) -> some View``</summary>
</details>
<details>

<summary>``func frame(width: CGFloat?, height: CGFloat?, alignment: Alignment) -> some View``</summary>
</details>
<details>

<summary>``func fullModal(isPresented: Binding<Bool>, ignoresEdgeInsets: Bool, actionAreaModel: ActionArea.Model?, () -> any View, navigation: (() -> ModalNavigation)?) -> some View``</summary>

전체 화면 모달을 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `ignoresEdgeInsets` | 모달 내용이 Edge 인셋을 무시할지 여부 |
  | `actionAreaModel` | 모달 하단에 표시할 액션 영역 모델 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저 |
- **Return Value**

  전체 화면 모달이 적용된 뷰
- **Discussion**

  화면 전체를 덮는 모달을 표시합니다.
</details>
<details>

<summary>``func fullScreenCover<Content>(isPresented: Binding<Bool>, onDismiss: (() -> Void)?, content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func fullScreenCover<Item, Content>(item: Binding<Item?>, onDismiss: (() -> Void)?, content: (Item) -> Content) -> some View``</summary>
</details>
<details>

<summary>``func gaugeStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func geometryGroup() -> some View``</summary>
</details>
<details>

<summary>``func gesture(some UIGestureRecognizerRepresentable) -> some View``</summary>
</details>
<details>

<summary>``func gesture<T>(T, including: GestureMask) -> some View``</summary>
</details>
<details>

<summary>``func gesture<T>(T, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func gesture<T>(T, name: String, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func grayscale(Double) -> some View``</summary>
</details>
<details>

<summary>``func gridCellAnchor(UnitPoint) -> some View``</summary>
</details>
<details>

<summary>``func gridCellColumns(Int) -> some View``</summary>
</details>
<details>

<summary>``func gridCellUnsizedAxes(Axis.Set) -> some View``</summary>
</details>
<details>

<summary>``func gridColumnAlignment(HorizontalAlignment) -> some View``</summary>
</details>
<details>

<summary>``func groupBoxStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func handGestureShortcut(HandGestureShortcut, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func handlesExternalEvents(preferring: Set<String>, allowing: Set<String>) -> some View``</summary>
</details>
<details>

<summary>``func headerProminence(Prominence) -> some View``</summary>
</details>
<details>

<summary>``func help<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func help(Text) -> some View``</summary>
</details>
<details>

<summary>``func help(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func hidden() -> some View``</summary>
</details>
<details>

<summary>``func highPriorityGesture<T>(T, including: GestureMask) -> some View``</summary>
</details>
<details>

<summary>``func highPriorityGesture<T>(T, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func highPriorityGesture<T>(T, name: String, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func hoverEffect(HoverEffect) -> some View``</summary>
</details>
<details>

<summary>``func hoverEffect(some CustomHoverEffect, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func hoverEffect(HoverEffect, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func hoverEffectDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func hueRotation(Angle) -> some View``</summary>
</details>
<details>

<summary>``func id<ID>(ID) -> some View``</summary>
</details>
<details>

<summary>``func `if`(Bool) -> some View``</summary>

조건이 true일 때만 View를 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `condition` | 표시 조건 |
- **Return Value**

  조건에 따라 표시되는 View
</details>
<details>

<summary>``func `if`(Bool, (Self) -> any View, else: ((Self) -> any View)?) -> some View``</summary>

조건에 따라 View를 변환합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `condition` | 변환 조건 |
  | `transform` | 조건이 true일 때 적용할 변환 |
  | `alternative` | 조건이 false일 때 적용할 변환 (선택적) |
- **Return Value**

  변환된 View
</details>
<details>

<summary>``func ignoresSafeArea(SafeAreaRegions, edges: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func imageScale(Image.Scale) -> some View``</summary>
</details>
<details>

<summary>``func indexViewStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func inspector<V>(isPresented: Binding<Bool>, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func inspectorColumnWidth(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func inspectorColumnWidth(min: CGFloat?, ideal: CGFloat, max: CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func interactionActivityTrackingTag(String) -> some View``</summary>
</details>
<details>

<summary>``func interactiveDismissDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func invalidatableContent(Bool) -> some View``</summary>
</details>
<details>

<summary>``func italic(Bool) -> some View``</summary>
</details>
<details>

<summary>``func itemProvider(Optional<() -> NSItemProvider?>) -> some View``</summary>
</details>
<details>

<summary>``func kerning(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func keyboardShortcut(KeyboardShortcut?) -> some View``</summary>
</details>
<details>

<summary>``func keyboardShortcut(KeyboardShortcut) -> some View``</summary>
</details>
<details>

<summary>``func keyboardShortcut(KeyEquivalent, modifiers: EventModifiers) -> some View``</summary>
</details>
<details>

<summary>``func keyboardShortcut(KeyEquivalent, modifiers: EventModifiers, localization: KeyboardShortcut.Localization) -> some View``</summary>
</details>
<details>

<summary>``func keyboardType(UIKeyboardType) -> some View``</summary>
</details>
<details>

<summary>``func keyframeAnimator<Value>(initialValue: Value, repeating: Bool, content: (PlaceholderContentView<Self>, Value) -> some View, keyframes: (Value) -> some Keyframes) -> some View``</summary>
</details>
<details>

<summary>``func keyframeAnimator<Value>(initialValue: Value, trigger: some Equatable, content: (PlaceholderContentView<Self>, Value) -> some View, keyframes: (Value) -> some Keyframes) -> some View``</summary>
</details>
<details>

<summary>``func labelStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func labeledContentStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func labelsHidden() -> some View``</summary>
</details>
<details>

<summary>``func labelsVisibility(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func layerEffect(Shader, maxSampleOffset: CGSize, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func layoutDirectionBehavior(LayoutDirectionBehavior) -> some View``</summary>
</details>
<details>

<summary>``func layoutPriority(Double) -> some View``</summary>
</details>
<details>

<summary>``func layoutValue<K>(key: K.Type, value: K.Value) -> some View``</summary>
</details>
<details>

<summary>``func lineLimit(PartialRangeFrom<Int>) -> some View``</summary>
</details>
<details>

<summary>``func lineLimit(Int?) -> some View``</summary>
</details>
<details>

<summary>``func lineLimit(ClosedRange<Int>) -> some View``</summary>
</details>
<details>

<summary>``func lineLimit(PartialRangeThrough<Int>) -> some View``</summary>
</details>
<details>

<summary>``func lineLimit(Int, reservesSpace: Bool) -> some View``</summary>
</details>
<details>

<summary>``func lineSpacing(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func listItemTint(ListItemTint?) -> some View``</summary>
</details>
<details>

<summary>``func listItemTint(Color?) -> some View``</summary>
</details>
<details>

<summary>``func listRowBackground<V>(V?) -> some View``</summary>
</details>
<details>

<summary>``func listRowInsets(EdgeInsets?) -> some View``</summary>
</details>
<details>

<summary>``func listRowSeparator(Visibility, edges: VerticalEdge.Set) -> some View``</summary>
</details>
<details>

<summary>``func listRowSeparatorTint(Color?, edges: VerticalEdge.Set) -> some View``</summary>
</details>
<details>

<summary>``func listRowSpacing(CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func listSectionSeparator(Visibility, edges: VerticalEdge.Set) -> some View``</summary>
</details>
<details>

<summary>``func listSectionSeparatorTint(Color?, edges: VerticalEdge.Set) -> some View``</summary>
</details>
<details>

<summary>``func listSectionSpacing(ListSectionSpacing) -> some View``</summary>
</details>
<details>

<summary>``func listSectionSpacing(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func listStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func loading(Binding<Bool>, type: Loading.Kind, dimmedColor: SwiftUI.Color) -> some View``</summary>

현재 뷰에 로딩 인디케이터와 함께 로딩 오버레이를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isLoading` | 로딩 상태를 제어하는 바인딩 불리언 값 |
  | `type` | 로딩 애니메이션 종류 (.wanted 또는 .circular) |
  | `dimmedColor` | 오버레이 배경색 (기본값: 투명) |
- **Return Value**

  로딩 기능이 적용된 뷰
- **Discussion**

  로딩 상태일 때 뷰 위에 반투명 배경과 로딩 애니메이션을 표시합니다. 로딩 중에는 사용자 상호작용이 비활성화됩니다.
</details>
<details>

<summary>``func luminanceToAlpha() -> some View``</summary>
</details>
<details>

<summary>~~``func mask<Mask>(Mask) -> some View``~~</summary>
</details>
<details>

<summary>``func mask<Mask>(alignment: Alignment, () -> Mask) -> some View``</summary>
</details>
<details>

<summary>``func matchedGeometryEffect<ID>(id: ID, in: Namespace.ID, properties: MatchedGeometryProperties, anchor: UnitPoint, isSource: Bool) -> some View``</summary>
</details>
<details>

<summary>``func matchedTransitionSource(id: some Hashable, in: Namespace.ID) -> some View``</summary>
</details>
<details>

<summary>``func matchedTransitionSource(id: some Hashable, in: Namespace.ID, configuration: (EmptyMatchedTransitionSourceConfiguration) -> some MatchedTransitionSourceConfiguration) -> some View``</summary>
</details>
<details>

<summary>``func materialActiveAppearance(MaterialActiveAppearance) -> some View``</summary>
</details>
<details>

<summary>``func measureBoxForPreview() -> some View``</summary>

프리뷰에서 뷰의 크기를 측정하여 뷰 위에 출력합니다.
- **Return Value**

  뷰 크기가 그려진 View
</details>
<details>

<summary>``func measureForPreview(axis: Axis) -> some View``</summary>

프리뷰에서 뷰의 주어진 축의 크기를 측정하여 뷰 위에 출력합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `axis` | 측정할 축 |
- **Return Value**

  뷰 크기가 그려진 View
</details>
<details>

<summary>``func menuActionDismissBehavior(MenuActionDismissBehavior) -> some View``</summary>
</details>
<details>

<summary>``func menuIndicator(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func menuOrder(MenuOrder) -> some View``</summary>
</details>
<details>

<summary>``func menuStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func minimumScaleFactor(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func modifier<T>(T) -> ModifiedContent<Self, T>``</summary>
</details>
<details>

<summary>``func modifying((Self) -> Self) -> Self``</summary>

View를 변환합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `transform` | 적용할 변환 |
- **Return Value**

  변환된 View
</details>
<details>

<summary>``func monospaced(Bool) -> some View``</summary>
</details>
<details>

<summary>``func monospacedDigit() -> some View``</summary>
</details>
<details>

<summary>``func moveDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func multilineTextAlignment(TextAlignment) -> some View``</summary>
</details>
<details>

<summary>``func navigationBarBackButtonHidden(Bool) -> some View``</summary>
</details>
<details>

<summary>~~``func navigationBarHidden(Bool) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarItems<L>(leading: L) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarItems<L, T>(leading: L, trailing: T) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarItems<T>(trailing: T) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle(LocalizedStringKey) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle(Text) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle<S>(S) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle<S>(S, displayMode: NavigationBarItem.TitleDisplayMode) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle(Text, displayMode: NavigationBarItem.TitleDisplayMode) -> some View``~~</summary>
</details>
<details>

<summary>~~``func navigationBarTitle(LocalizedStringKey, displayMode: NavigationBarItem.TitleDisplayMode) -> some View``~~</summary>
</details>
<details>

<summary>``func navigationBarTitleDisplayMode(NavigationBarItem.TitleDisplayMode) -> some View``</summary>
</details>
<details>

<summary>``func navigationDestination<D, C>(for: D.Type, destination: (D) -> C) -> some View``</summary>
</details>
<details>

<summary>``func navigationDestination<V>(isPresented: Binding<Bool>, destination: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func navigationDestination<D, C>(item: Binding<Optional<D>>, destination: (D) -> C) -> some View``</summary>
</details>
<details>

<summary>``func navigationDocument(URL) -> some View``</summary>
</details>
<details>

<summary>``func navigationDocument<D, I1, I2>(D, preview: SharePreview<I1, I2>) -> some View``</summary>
</details>
<details>

<summary>``func navigationDocument<D, I>(D, preview: SharePreview<I, Never>) -> some View``</summary>
</details>
<details>

<summary>``func navigationDocument<D>(D, preview: SharePreview<Never, Never>) -> some View``</summary>
</details>
<details>

<summary>``func navigationDocument<D, I>(D, preview: SharePreview<Never, I>) -> some View``</summary>
</details>
<details>

<summary>``func navigationSplitViewColumnWidth(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func navigationSplitViewColumnWidth(min: CGFloat?, ideal: CGFloat, max: CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func navigationSplitViewStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func navigationTitle(Text) -> some View``</summary>
</details>
<details>

<summary>``func navigationTitle(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func navigationTitle(Binding<String>) -> some View``</summary>
</details>
<details>

<summary>``func navigationTitle<V>(() -> V) -> some View``</summary>
</details>
<details>

<summary>``func navigationTitle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func navigationTransition(some NavigationTransition) -> some View``</summary>
</details>
<details>

<summary>~~``func navigationViewStyle<S>(S) -> some View``~~</summary>
</details>
<details>

<summary>``func offset(CGSize) -> some View``</summary>
</details>
<details>

<summary>``func offset(x: CGFloat, y: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func onAppear(perform: (() -> Void)?) -> some View``</summary>
</details>
<details>

<summary>``func onChange<V>(of: V, initial: Bool, () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onChange<V>(of: V, initial: Bool, (V, V) -> Void) -> some View``</summary>
</details>
<details>

<summary>~~``func onChange<V>(of: V, perform: (V) -> Void) -> some View``~~</summary>
</details>
<details>

<summary>``func onContinueUserActivity(String, perform: (NSUserActivity) -> ()) -> some View``</summary>
</details>
<details>

<summary>~~``func onContinuousHover(coordinateSpace: CoordinateSpace, perform: (HoverPhase) -> Void) -> some View``~~</summary>
</details>
<details>

<summary>``func onDisappear(perform: (() -> Void)?) -> some View``</summary>
</details>
<details>

<summary>``func onDrag(() -> NSItemProvider) -> some View``</summary>
</details>
<details>

<summary>``func onDrag<V>(() -> NSItemProvider, preview: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func onDrop(of: [UTType], delegate: any DropDelegate) -> some View``</summary>
</details>
<details>

<summary>~~``func onDrop(of: [String], delegate: any DropDelegate) -> some View``~~</summary>
</details>
<details>

<summary>``func onDrop(of: [UTType], isTargeted: Binding<Bool>?, perform: ([NSItemProvider]) -> Bool) -> some View``</summary>
</details>
<details>

<summary>``func onDrop(of: [UTType], isTargeted: Binding<Bool>?, perform: ([NSItemProvider], CGPoint) -> Bool) -> some View``</summary>
</details>
<details>

<summary>~~``func onDrop(of: [String], isTargeted: Binding<Bool>?, perform: ([NSItemProvider], CGPoint) -> Bool) -> some View``~~</summary>
</details>
<details>

<summary>~~``func onDrop(of: [String], isTargeted: Binding<Bool>?, perform: ([NSItemProvider]) -> Bool) -> some View``~~</summary>
</details>
<details>

<summary>``func onGeometryChange<T>(for: T.Type, of: (GeometryProxy) -> T, action: (T) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onGeometryChange<T>(for: T.Type, of: (GeometryProxy) -> T, action: (T, T) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onGeometryChange<T>(for: T.Type, of: (GeometryProxy) -> T, for: RunLoop.SchedulerTimeType.Stride, action: (_ newValue: T) -> Void) -> some View``</summary>

View의 지오메트리 변경정보를 디바운스시켜서 받습니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 변환 타입 |
  | `transform` | 지오메트리 변환 |
  | `dueTime` | 디바운스 시간 |
  | `action` | 변경 시 실행할 액션 |
- **Return Value**

  디바운스된 View
</details>
<details>

<summary>``func onHover(perform: (Bool) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onKeyPress(KeyEquivalent, action: () -> KeyPress.Result) -> some View``</summary>
</details>
<details>

<summary>``func onKeyPress(KeyEquivalent, phases: KeyPress.Phases, action: (KeyPress) -> KeyPress.Result) -> some View``</summary>
</details>
<details>

<summary>``func onKeyPress(characters: CharacterSet, phases: KeyPress.Phases, action: (KeyPress) -> KeyPress.Result) -> some View``</summary>
</details>
<details>

<summary>``func onKeyPress(keys: Set<KeyEquivalent>, phases: KeyPress.Phases, action: (KeyPress) -> KeyPress.Result) -> some View``</summary>
</details>
<details>

<summary>``func onKeyPress(phases: KeyPress.Phases, action: (KeyPress) -> KeyPress.Result) -> some View``</summary>
</details>
<details>

<summary>``func onLongPressGesture(minimumDuration: Double, maximumDistance: CGFloat, perform: () -> Void, onPressingChanged: ((Bool) -> Void)?) -> some View``</summary>
</details>
<details>

<summary>~~``func onLongPressGesture(minimumDuration: Double, maximumDistance: CGFloat, pressing: ((Bool) -> Void)?, perform: () -> Void) -> some View``~~</summary>
</details>
<details>

<summary>``func onLongPressGesture(minimumDuration: Double, perform: () -> Void, onPressingChanged: ((Bool) -> Void)?) -> some View``</summary>
</details>
<details>

<summary>~~``func onLongPressGesture(minimumDuration: Double, pressing: ((Bool) -> Void)?, perform: () -> Void) -> some View``~~</summary>
</details>
<details>

<summary>``func onOpenURL(perform: (URL) -> ()) -> some View``</summary>
</details>
<details>

<summary>``func onPencilDoubleTap(perform: (PencilDoubleTapGestureValue) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onPencilSqueeze(perform: (PencilSqueezeGesturePhase) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onPreferenceChange<K>(K.Type, perform: (K.Value) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onReceive<P>(P, perform: (P.Output) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onScrollGeometryChange<T>(for: T.Type, of: (ScrollGeometry) -> T, action: (T, T) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onScrollPhaseChange((ScrollPhase, ScrollPhase, ScrollPhaseChangeContext) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onScrollPhaseChange((ScrollPhase, ScrollPhase) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onScrollTargetVisibilityChange<ID>(idType: ID.Type, threshold: Double, ([ID]) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onScrollVisibilityChange(threshold: Double, (Bool) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func onSubmit(of: SubmitTriggers, (() -> Void)) -> some View``</summary>
</details>
<details>

<summary>~~``func onTapGesture(count: Int, coordinateSpace: CoordinateSpace, perform: (CGPoint) -> Void) -> some View``~~</summary>
</details>
<details>

<summary>``func onTapGesture(count: Int, perform: () -> Void) -> some View``</summary>
</details>
<details>

<summary>``func opacity(Double) -> some View``</summary>
</details>
<details>

<summary>~~``func overlay<Overlay>(Overlay, alignment: Alignment) -> some View``~~</summary>
</details>
<details>

<summary>``func overlay<S>(S, ignoresSafeAreaEdges: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func overlay<S, T>(S, in: T, fillStyle: FillStyle) -> some View``</summary>
</details>
<details>

<summary>``func overlay<V>(alignment: Alignment, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func overlayPreferenceValue<Key, T>(Key.Type, (Key.Value) -> T) -> some View``</summary>
</details>
<details>

<summary>``func overlayPreferenceValue<K, V>(K.Type, alignment: Alignment, (K.Value) -> V) -> some View``</summary>
</details>
<details>

<summary>``func padding(EdgeInsets) -> some View``</summary>
</details>
<details>

<summary>``func padding(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func padding(Edge.Set, CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func paletteSelectionEffect(PaletteSelectionEffect) -> some View``</summary>
</details>
<details>

<summary>``func paragraph(variant: Typography.Variant) -> some View``</summary>

Montage 디자인 시스템의 단락 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
- **Return Value**

  단락 스타일이 적용된 View
</details>
<details>

<summary>``func persistentSystemOverlays(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func phaseAnimator<Phase>(some Sequence, content: (PlaceholderContentView<Self>, Phase) -> some View, animation: (Phase) -> Animation?) -> some View``</summary>
</details>
<details>

<summary>``func phaseAnimator<Phase>(some Sequence, trigger: some Equatable, content: (PlaceholderContentView<Self>, Phase) -> some View, animation: (Phase) -> Animation?) -> some View``</summary>
</details>
<details>

<summary>``func pickerStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func popover<Content>(isPresented: Binding<Bool>, attachmentAnchor: PopoverAttachmentAnchor, arrowEdge: Edge?, content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func popover<Item, Content>(item: Binding<Item?>, attachmentAnchor: PopoverAttachmentAnchor, arrowEdge: Edge?, content: (Item) -> Content) -> some View``</summary>
</details>
<details>

<summary>``func popupModal(isPresented: Binding<Bool>, resize: PopupModal.Resize, ignoresEdgeInsets: Bool, actionAreaModel: ActionArea.Model?, () -> any View, navigation: (() -> ModalNavigation)?) -> some View``</summary>

팝업 모달을 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 모달 표시 여부를 제어하는 바인딩 |
  | `resize` | 모달 크기 조절 방식 (기본값: .hug) |
  | `ignoresEdgeInsets` | 모달 내용이 Edge 인셋을 무시할지 여부 |
  | `actionAreaModel` | 모달 하단에 표시할 액션 영역 모델 |
  | `content` | 모달에 표시할 콘텐츠 클로저 |
  | `navigation` | 모달 상단에 표시할 네비게이션 클로저 |
- **Return Value**

  팝업 모달이 적용된 뷰
- **Discussion**

  화면 중앙에 표시되는 팝업 형태의 모달을 표시합니다.
</details>
<details>

<summary>``func position(CGPoint) -> some View``</summary>
</details>
<details>

<summary>``func position(x: CGFloat, y: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func preference<K>(key: K.Type, value: K.Value) -> some View``</summary>
</details>
<details>

<summary>``func preferredColorScheme(ColorScheme?) -> some View``</summary>
</details>
<details>

<summary>``func presentationBackground<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func presentationBackground<V>(alignment: Alignment, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func presentationBackgroundInteraction(PresentationBackgroundInteraction) -> some View``</summary>
</details>
<details>

<summary>``func presentationCompactAdaptation(PresentationAdaptation) -> some View``</summary>
</details>
<details>

<summary>``func presentationCompactAdaptation(horizontal: PresentationAdaptation, vertical: PresentationAdaptation) -> some View``</summary>
</details>
<details>

<summary>``func presentationContentInteraction(PresentationContentInteraction) -> some View``</summary>
</details>
<details>

<summary>``func presentationCornerRadius(CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func presentationDetents(Set<PresentationDetent>) -> some View``</summary>
</details>
<details>

<summary>``func presentationDetents(Set<PresentationDetent>, selection: Binding<PresentationDetent>) -> some View``</summary>
</details>
<details>

<summary>``func presentationDragIndicator(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func presentationSizing(some PresentationSizing) -> some View``</summary>
</details>
<details>

<summary>``func previewContext<C>(C) -> some View``</summary>
</details>
<details>

<summary>``func previewDevice(PreviewDevice?) -> some View``</summary>
</details>
<details>

<summary>``func previewDisplayName(String?) -> some View``</summary>
</details>
<details>

<summary>``func previewInterfaceOrientation(InterfaceOrientation) -> some View``</summary>
</details>
<details>

<summary>``func previewLayout(PreviewLayout) -> some View``</summary>
</details>
<details>

<summary>``func printSize(String) -> some View``</summary>

프리뷰에서 크기가 변경될 때마다 콘솔에 출력합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `label` | 출력할 레이블 |
- **Return Value**

  크기가 출력된 View
</details>
<details>

<summary>``func printValue<V>(V, String) -> some View``</summary>

프리뷰에서 값이 변경될 때마다 콘솔에 출력합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `value` | 출력할 값 |
  | `label` | 출력할 레이블 |
- **Return Value**

  값이 출력된 View
</details>
<details>

<summary>``func privacySensitive(Bool) -> some View``</summary>
</details>
<details>

<summary>``func progressViewStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func projectionEffect(ProjectionTransform) -> some View``</summary>
</details>
<details>

<summary>``func pullToRefresh(scrollYOffset: Binding<CGFloat>, refresh: () async -> Void) -> some View``</summary>

스크롤 뷰에 풀-투-리프레시(Pull-to-Refresh) 기능을 추가합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `scrollYOffset` | 스크롤 뷰의 Y축 오프셋 바인딩. 당김 정도를 감지하는 데 사용됩니다. |
  | `refresh` | 리프레시가 트리거될 때 실행될 비동기 클로저입니다. |
- **Return Value**

  풀-투-리프레시 기능이, 추가된 뷰
- **Discussion**

  사용자가 스크롤 뷰를 아래로 당기면 애니메이션과 함께 리프레시 기능을 제공합니다. iOS 18 이상에서 사용 가능하며, 로딩 애니메이션과 함께 당김 정도에 따른 시각적 피드백을 제공합니다.
</details>
<details>

<summary>``func pushBadge(variant: PushBadge.Variant, size: PushBadge.Size, fontColor: SwiftUI.Color, backgroundColor: SwiftUI.Color, position: PushBadge.Position, inset: CGSize) -> some View``</summary>

현재 뷰에 푸시 알림 뱃지를 표시합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 뱃지의 표시 형태 (기본값: .dot) |
  | `size` | 뱃지 크기 (기본값: .xsmall) |
  | `fontColor` | 텍스트 색상 (기본값: staticWhite) |
  | `backgroundColor` | 배경 색상 (기본값: primaryNormal) |
  | `position` | 뱃지 위치 (기본값: .top(.trailing)) |
  | `inset` | 위치 조정을 위한 여백 (기본값: .zero) |
- **Return Value**

  뱃지가 적용된 뷰
- **Discussion**

  뷰의 특정 위치에 알림 또는 메시지 표시용 뱃지를 추가합니다.
</details>
<details>

<summary>``func recognizeViewForPreview(SwiftUI.Color, fill: Bool) -> some View``</summary>

프리뷰에서 View의 frame을 인식합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `color` | 인식 색상 |
  | `fill` | 배경 채우기 여부 |
- **Return Value**

  인식된 View
</details>
<details>

<summary>``func redacted(reason: RedactionReasons) -> some View``</summary>
</details>
<details>

<summary>``func refreshable(action: () async -> Void) -> some View``</summary>
</details>
<details>

<summary>``func renameAction(() -> Void) -> some View``</summary>
</details>
<details>

<summary>``func renameAction(FocusState<Bool>.Binding) -> some View``</summary>
</details>
<details>

<summary>``func replaceDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func rotation3DEffect(Angle, axis: (x: CGFloat, y: CGFloat, z: CGFloat), anchor: UnitPoint, anchorZ: CGFloat, perspective: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func rotationEffect(Angle, anchor: UnitPoint) -> some View``</summary>
</details>
<details>

<summary>``func safeAreaInset<V>(edge: HorizontalEdge, alignment: VerticalAlignment, spacing: CGFloat?, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func safeAreaInset<V>(edge: VerticalEdge, alignment: HorizontalAlignment, spacing: CGFloat?, content: () -> V) -> some View``</summary>
</details>
<details>

<summary>``func safeAreaPadding(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func safeAreaPadding(EdgeInsets) -> some View``</summary>
</details>
<details>

<summary>``func safeAreaPadding(Edge.Set, CGFloat?) -> some View``</summary>
</details>
<details>

<summary>``func saturation(Double) -> some View``</summary>
</details>
<details>

<summary>``func scaleEffect(CGFloat, anchor: UnitPoint) -> some View``</summary>
</details>
<details>

<summary>``func scaleEffect(CGSize, anchor: UnitPoint) -> some View``</summary>
</details>
<details>

<summary>``func scaleEffect(x: CGFloat, y: CGFloat, anchor: UnitPoint) -> some View``</summary>
</details>
<details>

<summary>``func scaledToFill() -> some View``</summary>
</details>
<details>

<summary>``func scaledToFit() -> some View``</summary>
</details>
<details>

<summary>``func scenePadding(Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func scenePadding(ScenePadding, edges: Edge.Set) -> some View``</summary>
</details>
<details>

<summary>``func scrollBounceBehavior(ScrollBounceBehavior, axes: Axis.Set) -> some View``</summary>
</details>
<details>

<summary>``func scrollClipDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func scrollContentBackground(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func scrollDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func scrollDismissesKeyboard(ScrollDismissesKeyboardMode) -> some View``</summary>
</details>
<details>

<summary>``func scrollIndicators(ScrollIndicatorVisibility, axes: Axis.Set) -> some View``</summary>
</details>
<details>

<summary>``func scrollIndicatorsFlash(onAppear: Bool) -> some View``</summary>
</details>
<details>

<summary>``func scrollIndicatorsFlash(trigger: some Equatable) -> some View``</summary>
</details>
<details>

<summary>``func scrollInputBehavior(ScrollInputBehavior, for: ScrollInputKind) -> some View``</summary>
</details>
<details>

<summary>``func scrollPosition(Binding<ScrollPosition>, anchor: UnitPoint?) -> some View``</summary>
</details>
<details>

<summary>``func scrollPosition(id: Binding<(some Hashable)?>, anchor: UnitPoint?) -> some View``</summary>
</details>
<details>

<summary>``func scrollTargetBehavior(some ScrollTargetBehavior) -> some View``</summary>
</details>
<details>

<summary>``func scrollTargetLayout(isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func scrollTransition(ScrollTransitionConfiguration, axis: Axis?, transition: (EmptyVisualEffect, ScrollTransitionPhase) -> some VisualEffect) -> some View``</summary>
</details>
<details>

<summary>``func scrollTransition(topLeading: ScrollTransitionConfiguration, bottomTrailing: ScrollTransitionConfiguration, axis: Axis?, transition: (EmptyVisualEffect, ScrollTransitionPhase) -> some VisualEffect) -> some View``</summary>
</details>
<details>

<summary>``func scrollable(Axis, contentOffset: Binding<CGPoint>) -> some View``</summary>

뷰에 자동 스크롤 기능을 적용하는 modifier입니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `axis` | 스크롤 방향 (.horizontal 또는 .vertical) |
  | `contentOffset` | 콘텐츠 오프셋을 바인딩하는 CGPoint 값 |
- **Return Value**

  자동 스크롤 기능이 적용된 뷰
- **Discussion**

  콘텐츠 오프셋을 추적하고 스크롤이 필요한 경우에만 스크롤을 활성화합니다. 콘텐츠가 스크롤 뷰보다 작은 경우 스크롤이 비활성화됩니다.
</details>
<details>

<summary>``func searchCompletion(String) -> some View``</summary>
</details>
<details>

<summary>``func searchDictationBehavior(TextInputDictationBehavior) -> some View``</summary>
</details>
<details>

<summary>``func searchFocused(FocusState<Bool>.Binding) -> some View``</summary>
</details>
<details>

<summary>``func searchFocused<V>(FocusState<V>.Binding, equals: V) -> some View``</summary>
</details>
<details>

<summary>``func searchPresentationToolbarBehavior(SearchPresentationToolbarBehavior) -> some View``</summary>
</details>
<details>

<summary>``func searchScopes<V, S>(Binding<V>, activation: SearchScopeActivation, () -> S) -> some View``</summary>
</details>
<details>

<summary>``func searchScopes<V, S>(Binding<V>, scopes: () -> S) -> some View``</summary>
</details>
<details>

<summary>``func searchSuggestions<S>(() -> S) -> some View``</summary>
</details>
<details>

<summary>``func searchSuggestions(Visibility, for: SearchSuggestionsPlacement.Set) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: Text?, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: some StringProtocol, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, placement: SearchFieldPlacement, prompt: some StringProtocol, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C>(text: Binding<String>, editableTokens: Binding<C>, placement: SearchFieldPlacement, prompt: Text?, token: (Binding<C.Element>) -> some View) -> some View``</summary>
</details>
<details>

<summary>``func searchable(text: Binding<String>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func searchable(text: Binding<String>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: Text?) -> some View``</summary>
</details>
<details>

<summary>``func searchable<S>(text: Binding<String>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: S) -> some View``</summary>
</details>
<details>

<summary>``func searchable<S>(text: Binding<String>, placement: SearchFieldPlacement, prompt: S) -> some View``</summary>
</details>
<details>

<summary>``func searchable(text: Binding<String>, placement: SearchFieldPlacement, prompt: LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func searchable(text: Binding<String>, placement: SearchFieldPlacement, prompt: Text?) -> some View``</summary>
</details>
<details>

<summary>~~``func searchable<S>(text: Binding<String>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, suggestions: () -> S) -> some View``~~</summary>
</details>
<details>

<summary>~~``func searchable<S>(text: Binding<String>, placement: SearchFieldPlacement, prompt: Text?, suggestions: () -> S) -> some View``~~</summary>
</details>
<details>

<summary>~~``func searchable<V, S>(text: Binding<String>, placement: SearchFieldPlacement, prompt: S, suggestions: () -> V) -> some View``~~</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: Text?, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T, S>(text: Binding<String>, tokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: S, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, placement: SearchFieldPlacement, prompt: Text?, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T, S>(text: Binding<String>, tokens: Binding<C>, placement: SearchFieldPlacement, prompt: S, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T, S>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: S, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, isPresented: Binding<Bool>, placement: SearchFieldPlacement, prompt: Text?, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, placement: SearchFieldPlacement, prompt: LocalizedStringKey, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, placement: SearchFieldPlacement, prompt: Text?, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func searchable<C, T, S>(text: Binding<String>, tokens: Binding<C>, suggestedTokens: Binding<C>, placement: SearchFieldPlacement, prompt: S, token: (C.Element) -> T) -> some View``</summary>
</details>
<details>

<summary>``func sectionActions<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func selectionDisabled(Bool) -> some View``</summary>
</details>
<details>

<summary>``func sensoryFeedback<T>(SensoryFeedback, trigger: T) -> some View``</summary>
</details>
<details>

<summary>``func sensoryFeedback<T>(SensoryFeedback, trigger: T, condition: (T, T) -> Bool) -> some View``</summary>
</details>
<details>

<summary>``func sensoryFeedback<T>(trigger: T, (T, T) -> SensoryFeedback?) -> some View``</summary>
</details>
<details>

<summary>``func shadow(color: Color, radius: CGFloat, x: CGFloat, y: CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func sheet<Content>(isPresented: Binding<Bool>, onDismiss: (() -> Void)?, content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func sheet<Item, Content>(item: Binding<Item?>, onDismiss: (() -> Void)?, content: (Item) -> Content) -> some View``</summary>
</details>
<details>

<summary>``func simultaneousGesture<T>(T, including: GestureMask) -> some View``</summary>
</details>
<details>

<summary>``func simultaneousGesture<T>(T, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func simultaneousGesture<T>(T, name: String, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func skeleton(isPresented: Bool, kind: Skeleton.Kind, color: SwiftUI.Color?, opacity: CGFloat?, size: CGSize?) -> some View``</summary>

현재 뷰에 미리 정의된 스켈레톤 로딩 UI를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 스켈레톤 표시 여부를 제어하는 불리언 값 |
  | `kind` | 스켈레톤 종류 (텍스트, 사각형, 원형 등) |
  | `color` | 스켈레톤 색상 (기본값: 시스템 색상) |
  | `opacity` | 스켈레톤 투명도 (기본값: 1.0) |
  | `size` | 스켈레톤 크기 (지정하지 않으면 원본 뷰 크기를 사용) |
- **Return Value**

  스켈레톤 기능이 적용된 뷰
</details>
<details>

<summary>``func skeleton(isPresented: Bool, skeletonView: () -> any View) -> some View``</summary>

현재 뷰에 커스텀 스켈레톤 로딩 UI를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 스켈레톤 표시 여부를 제어하는 불리언 값 |
  | `skeletonView` | 커스텀 스켈레톤 뷰를 생성하는 클로저 |
- **Return Value**

  스켈레톤 기능이 적용된 뷰
</details>
<details>

<summary>``func snackBar(Binding<SnackBar.Model?>, handler: () -> Void) -> some View``</summary>

현재 뷰에 SnackBar를 표시하는 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `model` | SnackBar 모델을 바인딩합니다. nil이 아닌 값이 설정되면 SnackBar가 표시됩니다. |
  | `handler` | SnackBar의 액션 버튼이 클릭되었을 때 실행될 클로저 |
- **Return Value**

  SnackBar가 적용된 뷰
- **Discussion**
</details>
<details>

<summary>``func speechAdjustedPitch(Double) -> some View``</summary>
</details>
<details>

<summary>``func speechAlwaysIncludesPunctuation(Bool) -> some View``</summary>
</details>
<details>

<summary>``func speechAnnouncementsQueued(Bool) -> some View``</summary>
</details>
<details>

<summary>``func speechSpellsOutCharacters(Bool) -> some View``</summary>
</details>
<details>

<summary>``func springLoadingBehavior(SpringLoadingBehavior) -> some View``</summary>
</details>
<details>

<summary>~~``func statusBar(hidden: Bool) -> some View``~~</summary>
</details>
<details>

<summary>``func statusBarHidden(Bool) -> some View``</summary>
</details>
<details>

<summary>``func strikethrough(Bool, pattern: Text.LineStyle.Pattern, color: Color?) -> some View``</summary>
</details>
<details>

<summary>``func submitLabel(SubmitLabel) -> some View``</summary>
</details>
<details>

<summary>``func submitScope(Bool) -> some View``</summary>
</details>
<details>

<summary>``func swipeActions<T>(edge: HorizontalEdge, allowsFullSwipe: Bool, content: () -> T) -> some View``</summary>
</details>
<details>

<summary>``func symbolEffect<T>(T, options: SymbolEffectOptions, isActive: Bool) -> some View``</summary>
</details>
<details>

<summary>``func symbolEffect<T, U>(T, options: SymbolEffectOptions, value: U) -> some View``</summary>
</details>
<details>

<summary>``func symbolEffectsRemoved(Bool) -> some View``</summary>
</details>
<details>

<summary>``func symbolRenderingMode(SymbolRenderingMode?) -> some View``</summary>
</details>
<details>

<summary>``func symbolVariant(SymbolVariants) -> some View``</summary>
</details>
<details>

<summary>~~``func tabItem<V>(() -> V) -> some View``~~</summary>
</details>
<details>

<summary>``func tabViewCustomization(Binding<TabViewCustomization>?) -> some View``</summary>
</details>
<details>

<summary>``func tabViewSidebarBottomBar<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func tabViewSidebarFooter<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func tabViewSidebarHeader<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func tabViewStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func tableColumnHeaders(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func tableStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func tag<V>(V, includeOptional: Bool) -> some View``</summary>
</details>
<details>

<summary>``func task<T>(id: T, priority: TaskPriority, () async -> Void) -> some View``</summary>
</details>
<details>

<summary>``func task(priority: TaskPriority, () async -> Void) -> some View``</summary>
</details>
<details>

<summary>``func textCase(Text.Case?) -> some View``</summary>
</details>
<details>

<summary>``func textContentType(UITextContentType?) -> some View``</summary>
</details>
<details>

<summary>``func textEditorStyle(some TextEditorStyle) -> some View``</summary>
</details>
<details>

<summary>``func textFieldStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func textInputAutocapitalization(TextInputAutocapitalization?) -> some View``</summary>
</details>
<details>

<summary>``func textRenderer<T>(T) -> some View``</summary>
</details>
<details>

<summary>``func textScale(Text.Scale, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func textSelection<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func textSelectionAffinity(TextSelectionAffinity) -> some View``</summary>
</details>
<details>

<summary>``func tint(Color?) -> some View``</summary>
</details>
<details>

<summary>``func toast(Binding<Toast.Model?>, location: Toast.Location, duration: Toast.Duration) -> some View``</summary>

현재 뷰에 Toast 메시지를 표시하는 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `model` | Toast 모델을 바인딩합니다. nil이 아닌 값이 설정되면 Toast가 표시됩니다. |
  | `location` | Toast가 표시될 위치 (기본값: .bottom) |
  | `duration` | Toast가 표시될 시간 (기본값: .short) |
- **Return Value**

  Toast가 적용된 뷰
- **Discussion**
</details>
<details>

<summary>``func toggleStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>~~``func toolbar(Visibility, for: ToolbarPlacement...) -> some View``~~</summary>
</details>
<details>

<summary>``func toolbar<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func toolbar<Content>(content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func toolbar<Content>(id: String, content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func toolbar(removing: ToolbarDefaultItemKind?) -> some View``</summary>
</details>
<details>

<summary>~~``func toolbarBackground(Visibility, for: ToolbarPlacement...) -> some View``~~</summary>
</details>
<details>

<summary>``func toolbarBackgroundVisibility(Visibility, for: ToolbarPlacement...) -> some View``</summary>
</details>
<details>

<summary>``func toolbarColorScheme(ColorScheme?, for: ToolbarPlacement...) -> some View``</summary>
</details>
<details>

<summary>``func toolbarForegroundStyle<S>(S, for: ToolbarPlacement...) -> some View``</summary>
</details>
<details>

<summary>``func toolbarRole(ToolbarRole) -> some View``</summary>
</details>
<details>

<summary>``func toolbarTitleDisplayMode(ToolbarTitleDisplayMode) -> some View``</summary>
</details>
<details>

<summary>``func toolbarTitleMenu<C>(content: () -> C) -> some View``</summary>
</details>
<details>

<summary>``func toolbarVisibility(Visibility, for: ToolbarPlacement...) -> some View``</summary>
</details>
<details>

<summary>``func tooltip(isPresented: Binding<Bool>, message: String, showCloseButton: Bool, buttonInfo: Tooltip.ButtonInfo?) -> some View``</summary>

iOS 16.4 이상에서 시스템 팝오버를 사용하는 툴팁 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 툴팁의 표시 여부를 제어하는 바인딩 |
  | `message` | 툴팁에 표시될 메시지 |
  | `showCloseButton` | 닫기 버튼 표시 여부 (기본값: false) |
  | `buttonInfo` | 툴팁에 추가할 버튼 정보 (선택 사항) |
- **Return Value**

  툴팁이 적용된 뷰
</details>
<details>

<summary>``func tooltip(isPresented: Binding<Bool>, position: Tooltip.Position, message: String, showArrow: Bool, showCloseButton: Bool, buttonInfo: Tooltip.ButtonInfo?) -> some View``</summary>

현재 뷰에 툴팁을 표시하는 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `isPresented` | 툴팁의 표시 여부를 제어하는 바인딩 |
  | `position` | 툴팁이 표시될 위치 및 화살표 위치 |
  | `message` | 툴팁에 표시될 메시지 |
  | `showArrow` | 화살표 표시 여부 (기본값: true) |
  | `showCloseButton` | 닫기 버튼 표시 여부 (기본값: false) |
  | `buttonInfo` | 툴팁에 추가할 버튼 정보 (선택 사항) |
- **Return Value**

  툴팁이 적용된 뷰
</details>
<details>

<summary>``func topNavigation(variant: TopNavigation.Variant, title: String, backgroundColor: SwiftUI.Color?, leadingButton: TopNavigation.Resource.LeadingButtonInfo?, trailingButtons: [TopNavigation.Resource.TrailingButtonInfo], withBottom: ActionArea.Model?) -> some View``</summary>

현재 뷰에 TopNavigation 바를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 내비게이션 바의 외관 스타일 (기본값: .normal) |
  | `title` | 표시할 제목 |
  | `backgroundColor` | 배경색 (기본값: nil) |
  | `leadingButton` | 좌측에 표시할 버튼 (기본값: nil) |
  | `trailingButtons` | 우측에 표시할 버튼 배열 (기본값: []) |
  | `model` | 하단 액션 영역에 대한 모델 (기본값: nil) |
- **Return Value**

  TopNavigation이 적용된 뷰
</details>
<details>

<summary>``func tracking(CGFloat) -> some View``</summary>
</details>
<details>

<summary>``func transaction((inout Transaction) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func transaction<V>((inout Transaction) -> Void, body: (PlaceholderContentView<Self>) -> V) -> some View``</summary>
</details>
<details>

<summary>``func transaction(value: some Equatable, (inout Transaction) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func transformAnchorPreference<A, K>(key: K.Type, value: Anchor<A>.Source, transform: (inout K.Value, Anchor<A>) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func transformEffect(CGAffineTransform) -> some View``</summary>
</details>
<details>

<summary>``func transformEnvironment<V>(WritableKeyPath<EnvironmentValues, V>, transform: (inout V) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func transformPreference<K>(K.Type, (inout K.Value) -> Void) -> some View``</summary>
</details>
<details>

<summary>``func transition(AnyTransition) -> some View``</summary>
</details>
<details>

<summary>``func truncationMode(Text.TruncationMode) -> some View``</summary>
</details>
<details>

<summary>``func typeSelectEquivalent(Text?) -> some View``</summary>
</details>
<details>

<summary>``func typeSelectEquivalent<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func typeSelectEquivalent(LocalizedStringKey) -> some View``</summary>
</details>
<details>

<summary>``func typesettingLanguage(TypesettingLanguage, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func typesettingLanguage(Locale.Language, isEnabled: Bool) -> some View``</summary>
</details>
<details>

<summary>``func underline(Bool, pattern: Text.LineStyle.Pattern, color: Color?) -> some View``</summary>
</details>
<details>

<summary>``func unredacted() -> some View``</summary>
</details>
<details>

<summary>``func userActivity<P>(String, element: P?, (P, NSUserActivity) -> ()) -> some View``</summary>
</details>
<details>

<summary>``func userActivity(String, isActive: Bool, (NSUserActivity) -> ()) -> some View``</summary>
</details>
<details>

<summary>``func userInteractionDisabled(Bool) -> some View``</summary>

사용자 상호작용을 비활성화하는 modifier를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `disabled` | 상호작용 비활성화 여부 |
- **Return Value**

  사용자 상호작용이 비활성화된 뷰
- **Discussion**

  뷰의 터치 이벤트와 스와이프 백 제스처를 비활성화합니다.
</details>
<details>

<summary>``func visualEffect((EmptyVisualEffect, GeometryProxy) -> some VisualEffect) -> some View``</summary>
</details>
<details>

<summary>``func windowToolbarFullScreenVisibility(WindowToolbarFullScreenVisibility) -> some View``</summary>
</details>
<details>

<summary>``func writingToolsBehavior(WritingToolsBehavior) -> some View``</summary>
</details>
<details>

<summary>``func zIndex(Double) -> some View``</summary>
</details>

