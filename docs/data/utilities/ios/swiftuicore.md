---
title: SwiftUICore
---

Extended Module

# SwiftUICore

## Topics

### Extended Protocols

<details>

<summary>``extension View``</summary>
#### Instance Methods

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

<summary>``func asUIImage() -> UIImage``</summary>

View를 UIImage로 변환합니다.
- **Return Value**

  변환된 UIImage
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

<summary>``func modifying((Self) -> any View) -> some View``</summary>

View를 변환합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `transform` | 적용할 변환 |
- **Return Value**

  변환된 View
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

<summary>``func topNavigation(variant: TopNavigation.Variant, title: String, backgroundColorResolvable: ColorResolvable?, leadingButton: TopNavigation.Resource.LeadingButtonInfo?, trailingButtons: [TopNavigation.Resource.TrailingButtonInfo], withBottom: ActionArea.Model?) -> some View``</summary>

현재 뷰에 TopNavigation 바를 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 내비게이션 바의 외관 스타일 (기본값: .normal) |
  | `title` | 표시할 제목 |
  | `backgroundColorResolvable` | 배경색 리졸버 (기본값: nil) |
  | `leadingButton` | 좌측에 표시할 버튼 (기본값: nil) |
  | `trailingButtons` | 우측에 표시할 버튼 배열 (기본값: []) |
  | `model` | 하단 액션 영역에 대한 모델 (기본값: nil) |
- **Return Value**

  TopNavigation이 적용된 뷰
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

</details>

___
### Extended Structures

<details>

<summary>``extension SwiftUI.Color``</summary>
#### Instance Properties

<details>

<summary>``var uiColor: UIColor``</summary>

SwiftUI.Color를 UIColor로 변환합니다.
- **Return Value**

  변환된 UIColor 인스턴스
</details>

#### Type Methods

<details>

<summary>``static func atomic(Color.Atomic) -> SwiftUI.Color``</summary>

Atomic 색상 타입에 해당하는 SwiftUI.Color를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 생성할 Atomic 색상 타입 |
- **Return Value**

  동적으로 생성된 SwiftUI.Color 인스턴스
</details>
<details>

<summary>``static func montage(ColorResolvable) -> SwiftUI.Color``</summary>

ColorResolvable 프로토콜을 준수하는 타입에 해당하는 SwiftUI.Color를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 생성할 색상 타입 |
- **Return Value**

  동적으로 생성된 SwiftUI.Color 인스턴스
</details>
<details>

<summary>``static func semantic(Color.Semantic) -> SwiftUI.Color``</summary>

Semantic 색상 타입에 해당하는 SwiftUI.Color를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 생성할 Semantic 색상 타입 |
- **Return Value**

  동적으로 생성된 SwiftUI.Color 인스턴스
</details>

</details>
<details>

<summary>``extension Font``</summary>
#### Type Methods

<details>

<summary>``static func montage(size: CGFloat, weight: Typography.Weight) -> Font``</summary>

Montage 디자인 시스템의 폰트를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `size` | 폰트 크기 |
  | `weight` | 폰트 두께 |
- **Return Value**

  생성된 Font 인스턴스
</details>
<details>

<summary>``static func montage(variant: Typography.Variant, weight: Typography.Weight) -> Font?``</summary>

Montage 디자인 시스템의 폰트를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
  | `weight` | 폰트 두께 |
- **Return Value**

  생성된 Font 인스턴스
</details>

</details>
<details>

<summary>``extension Image``</summary>
#### Type Methods

<details>

<summary>``static func montage(Logo) -> Image``</summary>

Montage 디자인 시스템의 로고를 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 생성할 로고 타입 |
- **Return Value**

  생성된 Image 인스턴스
</details>
<details>

<summary>``static func montage(Icon) -> Image``</summary>

Montage 디자인 시스템의 아이콘을 생성합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `type` | 생성할 아이콘 타입 |
- **Return Value**

  생성된 Image 인스턴스
</details>

</details>
<details>

<summary>``extension Text``</summary>
#### Instance Methods

<details>

<summary>``func montage(variant: Typography.Variant, weight: Typography.Weight, atomic: Color.Atomic) -> Text``</summary>

Montage 디자인 시스템의 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
  | `weight` | 폰트 두께 |
  | `atomic` | 아토믹 색상 |
- **Return Value**

  스타일이 적용된 Text 인스턴스
</details>
<details>

<summary>``func montage(variant: Typography.Variant, weight: Typography.Weight, color: SwiftUI.Color) -> Text``</summary>

Montage 디자인 시스템의 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
  | `weight` | 폰트 두께 |
  | `color` | 색상 |
- **Return Value**

  스타일이 적용된 Text 인스턴스
</details>
<details>

<summary>``func montage(variant: Typography.Variant, weight: Typography.Weight, colorResolver: ColorResolvable) -> Text``</summary>

Montage 디자인 시스템의 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
  | `weight` | 폰트 두께 |
  | `colorResolver` | 색상 해석기 |
- **Return Value**

  스타일이 적용된 Text 인스턴스
</details>
<details>

<summary>``func montage(variant: Typography.Variant, weight: Typography.Weight, semantic: Color.Semantic) -> Text``</summary>

Montage 디자인 시스템의 스타일을 적용합니다.

- **Parameters**
  | Parameter | Description |
  | --- | --- |
  | `variant` | 텍스트 변형 |
  | `weight` | 폰트 두께 |
  | `semantic` | 시맨틱 색상 |
- **Return Value**

  스타일이 적용된 Text 인스턴스
</details>

</details>

