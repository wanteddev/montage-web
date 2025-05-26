---
title: View Implementations
---

API Collection

# View Implementations

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

<summary>``func contentToolbar<Content>(for: ContentToolbarPlacement, content: () -> Content) -> some View``</summary>
</details>
<details>

<summary>``func contentToolbar<Content>(for: ContentToolbarPlacement, content: () -> Content) -> some View``</summary>
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

<summary>``func onSubmit(of: SubmitTriggers, () -> Void) -> some View``</summary>
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

<summary>``func privacySensitive(Bool) -> some View``</summary>
</details>
<details>

<summary>``func progressViewStyle<S>(S) -> some View``</summary>
</details>
<details>

<summary>``func projectionEffect(ProjectionTransform) -> some View``</summary>
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

<summary>``func visualEffect((EmptyVisualEffect, GeometryProxy) -> some VisualEffect) -> some View``</summary>
</details>
<details>

<summary>``func windowToolbarFullScreenVisibility(WindowToolbarFullScreenVisibility) -> some View``</summary>
</details>
<details>

<summary>``func writingToolsAffordanceVisibility(Visibility) -> some View``</summary>
</details>
<details>

<summary>``func writingToolsBehavior(WritingToolsBehavior) -> some View``</summary>
</details>
<details>

<summary>``func zIndex(Double) -> some View``</summary>
</details>

