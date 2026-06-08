# Migration Guide

## 4.0.0

### 패키지명 변경

모든 패키지가 `@wanteddev/*`에서 `@montage-ui/*`로 변경되었습니다.

| 기존                           | 변경                        |
| ------------------------------ | --------------------------- |
| `@wanteddev/wds`               | `@montage-ui/core`          |
| `@wanteddev/wds-icon`          | `@montage-ui/icon`          |
| `@wanteddev/wds-nextjs`        | `@montage-ui/nextjs`        |
| `@wanteddev/wds-lottie`        | `@montage-ui/lottie`        |
| `@wanteddev/wds-codemod`       | `@montage-ui/codemod`       |
| `@wanteddev/wds-theme`         | `@montage-ui/theme`         |
| `@wanteddev/wds-engine`        | `@montage-ui/engine`        |
| `@wanteddev/eslint-plugin-wds` | `@montage-ui/eslint-plugin` |

import 경로를 자동으로 변환하려면 아래 codemod를 실행하세요:

```sh
npx @montage-ui/codemod@latest package-name-migration src
```

codemod는 import 선언만 변환합니다. 아래 항목은 수동 확인이 필요합니다:

- `package.json`의 dependencies 패키지명 변경
- ESLint 설정에서 `@wanteddev/eslint-plugin-wds` → `@montage-ui/eslint-plugin`

### Theme 토큰 CSS Variable 화

`theme.primitive`, `theme.opacity`, `theme.spacing`, `theme.radius`, `theme.dimension`, `theme.zIndex` 토큰이 이제 raw 값 대신 `var(--...)` 문자열을 반환합니다. 기존 `theme.atomic`, `theme.semantic`과 동일한 방식으로 통일되어, 컴포넌트에서 사용 시 다크 모드/런타임 오버라이드와 자연스럽게 동작합니다.

```ts
// AS-IS
theme.spacing[16]; // '16px'
theme.opacity[88]; // 0.88
theme.zIndex.modal; // 1300

// TO-BE
theme.spacing[16]; // 'var(--spacing-16)'
theme.opacity[88]; // 'var(--opacity-88)'
theme.zIndex.modal; // 'var(--zIndex-modal)'
```

CSS 컨텍스트(template literal, 인라인 style 객체)에서는 그대로 동작합니다. **수동 마이그레이션이 필요한 케이스**는 아래와 같이 raw 값(숫자/`Npx` 문자열)을 가정한 JS 산술 코드입니다.

#### spacing / radius / dimension / primitive — JS 산술 불가

`'16px'` 같은 리터럴이 `'var(--spacing-16)'`로 바뀌면서 `parseInt`/`parseFloat`이 `NaN`을 반환합니다.

```ts
// AS-IS
const half = parseInt(theme.spacing[16]) / 2; // 8
style={{ width: parseInt(theme.dimension[40]) - 4 }}

// TO-BE — CSS calc() 사용 (var()는 calc 내부에서 정상 동작)
const half = `calc(${theme.spacing[16]} / 2)`;
style={{ width: `calc(${theme.dimension[40]} - 4px)` }}
```

JS 레이어에서 정말 숫자 값이 필요하다면 `lightOriginTheme` / `darkOriginTheme`을 import 해서 raw 값을 직접 참조하세요.

#### opacity — JS 산술 불가, CSS에서는 그대로 사용 가능

`theme.opacity[88]`이 `0.88`에서 `'var(--opacity-88)'`로 바뀝니다.

```ts
// AS-IS
const dimmed = theme.opacity[88] * 0.5; // 0.44
rgba(0, 0, 0, ${theme.opacity[43]})

// TO-BE
// CSS opacity 속성, rgba()의 alpha 자리, calc() 내부에서는 var() 그대로 사용 가능
opacity: ${theme.opacity[88]};
rgba(0, 0, 0, ${theme.opacity[43]}) // 동일하게 동작
// 산술이 필요하면 calc()
opacity: calc(${theme.opacity[88]} * 0.5);
```

`addOpacity(color, value)` 유틸은 `value`에 `var(--opacity-*)`를 받아도 정상 동작합니다 (rgba 내부에서 해석).

#### zIndex — JS 산술 불가, CSS calc()로 대체

`theme.zIndex.modal`이 `1300`에서 `'var(--zIndex-modal)'`로 바뀝니다.

```ts
// AS-IS
style={{ zIndex: theme.zIndex.modal + 1 }} // 1301

// TO-BE
style={{ zIndex: `calc(${theme.zIndex.modal} + 1)` }}
```

또한 React inline style에서 `zIndex` 값이 더 이상 number가 아니라 string이 됩니다. 타입 시그니처(`number | string`)를 받는 곳은 영향 없지만, `number`만 받던 props로 전달하던 코드는 prop 타입을 string으로 확장하거나 raw 값을 사용해야 합니다.

> **breakpoint 토큰은 var 변환에서 제외되었습니다.** `@media (min-width: ...)` 쿼리에는 CSS variable을 사용할 수 없기 때문입니다.

### CSS Variable 네이밍 변경 (`--wds-` prefix 제거)

컴포넌트 내부에서 사용하는 CSS 변수의 `--wds-` 브랜드 prefix가 제거되었습니다. 대부분 컴포넌트명으로 시작하므로 prefix만 떨어지며(`--wds-modal-translate` → `--modal-translate`), grid의 두 변수는 이름이 지나치게 일반적이어서 컴포넌트 스코프를 붙였습니다.

| 기존                       | 변경                    |
| -------------------------- | ----------------------- |
| `--wds-modal-translate`    | `--modal-translate`     |
| `--wds-switch-width`       | `--switch-width`        |
| `--wds-table-border-color` | `--table-border-color`  |
| _그 외 모든 `--wds-*`_     | _`--wds-` 제거_         |
| `--wds-column-spacing`     | `--grid-column-spacing` |
| `--wds-row-spacing`        | `--grid-row-spacing`    |

이 변수들은 대부분 라이브러리 내부 전용(element-scoped)이지만, `css\`\``·인라인 style·scss에서 직접 참조하거나 오버라이드한 코드가 있다면 codemod로 자동 변환하세요:

```sh
npx @montage-ui/codemod@latest css-variable-migration src
```

codemod는 `.ts`/`.tsx`/`.js`/`.jsx`의 문자열·template literal과 `.css`/`.scss`/`.sass`/`.less` 스타일시트를 함께 변환합니다.

### DOM 식별자(attribute / id) 변경

컴포넌트 식별용 marker attribute와 portal container id가 변경되었습니다.

| 기존                                                | 변경                               | 참조 케이스                    |
| --------------------------------------------------- | ---------------------------------- | ------------------------------ |
| `wds-component` (attribute)                         | `data-component`                   | `[wds-component="..."]` 셀렉터 |
| `wds-ignore-first-focus` (attribute)                | `data-ignore-first-focus`          | focus 제어 attribute           |
| `wds-ignore-dismissable-layer` (attribute)          | `data-ignore-dismissable-layer`    | dismiss 제어 attribute         |
| `#wds-region-manager`, `#wds-region-manager-bottom` | `#montage-region-manager(-bottom)` | `querySelector` 참조           |

`[wds-component="..."]` 셀렉터(css/scss), `querySelector('#wds-region-manager-bottom')`, `closest('[wds-ignore-dismissable-layer]')` 등을 직접 사용했다면 codemod로 자동 변환하세요:

```sh
npx @montage-ui/codemod@latest dom-identifier-migration src
```

### Modal

`variant="bottom"`, `handle={true}`의 기본 동작이 변경되었습니다.

- AS-IS
  - ESC, 핸들 내리기, Dimmer 영역 클릭 시 바텀시트가 아래에 고정되어 닫히지 않습니다.
  - 바로 닫히게 변경하려면 `onVisibilityChange` 에서 onClose를 호출하여 바로 닫히게 할 수 있습니다.
- TO-BE
  - ESC, 핸들 내리기, Dimmer 영역 클릭 시 `ModalContainer`의 `peekHeight`가 지정되지 않으면 바로 닫힙니다.
  - 아래에 고정되게 하려면 `peekHeight`를 지정해야 합니다.

위 내용에 따라 `onVisibilityChange` 옵션이 제거되었습니다.

## 3.0.0 (2025-11-12)

### Button

Button의 `color="secondary"` 가 제거되었습니다. 기존 secondary는 assistive로 대체됩니다.

```sh
npx @montage-ui/codemod@latest button-secondary-migration
```

## ListCell

ListCell 컴포넌트의 active 옵션이 selected로 변경됩니다.

```sh
npx @montage-ui/codemod@latest list-cell-active-to-selected
```

### Switch

Switch의 사이즈를 커스터마이징 할 때에는 CSS Variable을 사용하도록 변경이 필요합니다.

### Navigation

TopNavigation, ModalNavigation `variant="floating"` 에서 그라디언트 배경이 추가됩니다.

디자인상 깨지지 않는지 확인이 필요합니다.

### Popper

공통

position의 의미가 변경되었습니다.
기존에는 trigger의 위치로 지정되었는데, trigger에서 콘텐츠가 표시될 위치를 결정하도록 변경되었습니다.

ex) bottom-center -> top-center

영향 받는 컴포넌트:

- AutocompleteList, MenuContent, PopoverContent, TooltipContent, PopperContent, TimePicker, DatePicker, Select, SelectMultiple

```sh
npx @montage-ui/codemod@latest compact-tooltip-migration
```

#### PopoverContent

arrow 옵션이 제거되었습니다.

PopoverContent에 새로운 디자인이 추가되어 기존에 사용하던 부분은 variant=“custom” 으로 사용합니다.

#### TooltipContent

arrow 옵션이 제거되었고 size 옵션이 추가되었습니다.

`variant="inverse"` 가 제거되었습니다.

#### CompactTooltipContent

compact tooltip이 제거되었습니다.

tooltip size="small" 로 사용합니다.

### ImageLoader

ImageLoader가 제거되었습니다. `<Box as=“img” />` 혹은 `<img />` 를 사용해주세요.

Thumbnail, CardThumbnail, Avatar에 기본적으로 적용되던 이미지 optimize 가 제거되었습니다.

### Dialog

Dialog 컴포넌트가 Alert 컴포넌트로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest dialog-to-alert
```

접근성을 위한 AlertTrigger (DialogTrigger) 컴포넌트가 추가되었습니다.
Alert (Dialog) 컴포넌트를 직접적으로 사용한 경우 AlertContainer로 감싸주어야 합니다.

기존 Dialog 컴포넌트에서 받던 옵션들이 AlertContainer (DialogContainer)로 옮겨졌습니다.

- forceMount
- container
- disablePortal
- wrapperProps
- disableOutsideClickClose
- disableEscapeKeyDownClose
- onDismiss
- dimmer

### Modal

접근성을 위한 ModalTrigger 컴포넌트가 추가되었습니다.

기존 Modal 컴포넌트에서 받던 옵션들이 ModalContainer로 옮겨졌습니다.

- forceMount
- container
- disablePortal
- disableOutsideClickClose
- disableEscapeKeyDownClose

### Theme

theme.spacing.75 → theme.spacing.72 로 올바른 값을 바라보도록 키를 수정하였습니다.

Elevation Shadow 토큰이 변경되었습니다.

- Normal → XSmall, Emphasize → Small, Strong → Medium, Bold → Large, Heavy → XLarge

```sh
npx @montage-ui/codemod@latest shadow-migration
```

### Tooltip

Tooltip의 closeButton, action 옵션이 deprecated 되었습니다.
clickable 요소가 있는 경우 Popover를 사용하도록 마이그레이션 하세요.

### TextField

TextField에 Background 색상이 추가되면서 dom 구조가 변경되어 padding, box-shadow (line) 을 커스텀한 경우 수정이 필요합니다.

- TextField
- DatePicker
- TimePicker
- PaginationField

TextFieldButton의 경우 TextField에 trailingButton 옵션으로 사용하도록 변경해야합니다.

### Chip

ChipAction 컴포넌트가 Chip 컴포넌트로 변경되었고, ChipFiler 컴포넌트가 FilterButton 컴포넌트로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest chip-naming-migration
```

### EmptyState

EmptyState 컴포넌트가 FallbackView 컴포넌트로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest empty-state-to-fallback-view
```

### ProgressTrackDesktop

ProgressTrackDesktop 컴포넌트가 Stepper 컴포넌트로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest stepper-migration
```

### TextButton

TextButton 컴포넌트의 variant 옵션이 color로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest text-button-variant-to-color
```

### Typography

Typography의 title1이 display3로 변경되었고 기존 title1 스타일이 변경되었습니다.

```sh
npx @montage-ui/codemod@latest typography-title1-to-display3
```

### Pagination

PaginationDot 컴포넌트가 PaginationDots 컴포넌트로 변경되었고 totalPage 옵션이 totalPages 으로 변경되었습니다.

PaginationCounter 컴포넌트가 PageCounter 변경되었고 totalPage 옵션이 totalPages 으로 변경되었습니다.

```sh
npx @montage-ui/codemod@latest pagination-migration
```

### SectionMessage

SectionMessage 컴포넌트의 show, defaultShow, onShowChange 옵션이 open, defaultOpen, onOpenChange로 변경됩니다.

```sh
npx @montage-ui/codemod@latest section-message-show-to-open
```

## 2.0.0 (2025-04-30)

꼭 아래 나열된 순서대로 마이그레이션을 진행해주세요.

### LeftContent, RightContent

leftContent, rightContent 의 이름이 더욱 명확하게 변경돼요.

TabList, CategoryList 의 rightContent는 iconButton으로 변경돼요.
나머지 leftContent, rightContent는 모두 leadingContent, trailingContent로 변경돼요.

```sh
npx @montage-ui/codemod@latest leading-trailing-migration src
```

data-role, wds-component를 사용하는 부분은 직접 확인이 필요해요.

- `Pagination`
  - data-role="pagination-left-content-wrapper" -> data-role="pagination-leading-content-wrapper"
  - data-role="pagination-right-content-wrapper" -> data-role="pagination-trailing-content-wrapper"
- `SectionHeader`
  - data-role="section-header-left-content" -> data-role="section-header-heading-content"
  - data-role="section-header-right-content" -> data-role="section-header-trailing-content"
- `TextArea`
  - data-role="text-area-bottom-area-left-content" -> data-role="text-area-bottom-area-leading-content"
  - data-role="text-area-bottom-area-right-content" -> data-role="text-area-bottom-area-trailing-content"
- `TabList`
  - data-role="tab-list-right-content" -> data-role="tab-list-icon-button"
- `CategoryList`
  - data-role="category-list-right-content" -> data-role="category-list-icon-button"
- `ListCell`
  - data-role="list-item-left-content" -> data-role="list-item-leading-content"
  - data-role="list-item-right-content" -> data-role="list-item-trailing-content"

### Variant Filled -> Solid

ChipAction, ChipFilter, ContentBadge의 variant filled가 지원 종료돼요.
variant='solid' 로 사용해주세요.

```sh
npx @montage-ui/codemod@latest filled-variant-to-solid src
```

### Theme Palette

theme.palette의 명칭이 theme.atomic, theme.semantic으로 분리되고 accent 색상의 명칭이 변경돼요.

Accent 색상이 Accent/Background, Accent/Foreground로 나누어져요.
기존 색상은 Accent/Background 로 마이그레이션 하며, ContentBadge에서 사용하는 색상은 Accent/Foreground로 마이그레이션이 필요해요.

```sh
npx @montage-ui/codemod@latest palette-to-atomic-semantic src
```

![image](https://github.com/user-attachments/assets/5c16c9d9-4010-4a90-8253-993a18fe16bd)

6가지 Atomic 색상이 신규로 추가되었어요.

![image](https://github.com/user-attachments/assets/4d20f3a3-62f2-442d-956d-92ab60fc9084)

var(--theme-palette-\*) 으로 사용하던 부분은 수동으로 마이그레이션이 필요해요.

### Typography

Typography의 variant명이 kebab-case로 변경되고 display 기본 동작이 태그를 따라 가도록 변경되었어요.

Typography의 display 동작이 변경됨으로 깨지는 부분이 없는지 확인이 필요해요.

```sh
npx @montage-ui/codemod@latest typography-variant-cases src
```

### SectionMessage

SectionMessage의 구조와 디자인을 새롭게 선보여요.

`—wds-region-viewport-top` 변수와 RegionConfig > viewportTop 옵션은 더 이상 사용하지 않아요.
position: fixed -> static 으로 노출되도록 변경되었어요.

![image](https://github.com/user-attachments/assets/84872403-0f58-4e54-864c-959de563537d)

### Menu

MenuBottom, MenuBottomContent 컴포넌트명이 변경되었어요.

- MenuBottom -> MenuActionArea
- MenuBottomContent -> MenuActionAreaContent

```sh
npx @montage-ui/codemod@latest menu-bottom-migration src
```

wds-component 속성을 사용하는 부분은 수동으로 마이그레이션이 필요해요.

- wds-component=“menu-bottom-content” -> wds-component=“menu-action-area-content”

### PushBadge의 구조가 변경되었어요.

PushBadge를 컴포넌트에 감싸서 사용하는 형태로 변경되었어요.
IconButton, AvatarButton에 pushBadge 옵션이 제거되었어요.

> **수동 마이그레이션이 필요합니다**

### Avatar academic

Avatar의 variant='academic' 이 academy로 변경되었어요.

```sh
npx @montage-ui/codemod@latest avatar-migration src
```

### Toast, Snackbar

useToast의 variant명이 변경되었어요.

- success -> positive
- warning -> cautionary
- negative (신규)
- custom -> 제거(normal로 통합)

```sh
npx @montage-ui/codemod@latest toast-migration src
```

- useToast, useSnackbar의 애니메이션이 더 매끄럽게 수정되었어요.
- duration: Infinity를 지원해요.
- useRegionStore를 활용하여 추가적인 컨트롤을 할 수 있어요. (문서 참조)

### Heading -> Title

EmptyStateText, Slider, useSnackbar의 heading 옵션이 title로 변경되었어요.

- Slider heading -> title
- EmptyStateText heading -> title
- useSnackbar heading -> title

```sh
npx @montage-ui/codemod@latest heading-to-title src
```

아래 부분은 수동 대응이 필요해요.

- data-role="empty-state-text-heading" -> data-role="empty-state-text-title"
- data-role="slider-heading" -> data-role="slider-title"

### ActionArea

ActionArea, PickerActionArea의 옵션명이 변경되었어요.

- 기존 priority 옵션이 variant로 변경되고 기존 variant는 extra (boolean) 으로 변경되었어요.
- sticky 옵션명이 background로 변경되었어요.

```sh
npx @montage-ui/codemod@latest action-area-migration src
```

### TextInput

TextInput 관련 컴포넌트가 모두 TextField라는 이름으로 변경되었어요.

- SearchInput -> SearchField
- TextInput -> TextField
- TextInputContent -> TextFieldContent
- TextInputButton -> TextFieldButton
- AutocompleteInput -> AutocompleteField
- PaginationInput -> PaginationField
- TimePickerInputProps -> TimePickerFieldProps
- DatePickerInputProps -> DatePickerFieldProps

```sh
npx @montage-ui/codemod@latest input-to-field src
```

아래 부분은 수동으로 대응이 필요해요.
`SearchField`

- data-role="search-input-content" -> data-role="search-field-content"
- data-role="search-input-icon" -> data-role="search-field-icon"
- data-role="search-input-reset" -> data-role="search-field-reset"
  `TextField`
- data-role="text-input-content" -> data-role="text-field-content"
- data-role="text-input-invalid" -> data-role="text-field-invalid"
- data-role="text-input-positive" -> data-role="text-field-positive"
- data-role="text-input-reset" -> data-role="text-field-reset"
  `PaginationField`
- wds-component="pagination-input" -> wds-component="pagination-field"

### NestedCheckbox

NestedCheckbox가 CheckMark로 변경되었어요.</summary>

```sh
npx @montage-ui/codemod@latest check-mark-migration src
```

### PlayIconBadge

PlayIconBadge가 PlayBadge로 변경되었어요.

```sh
npx @montage-ui/codemod@latest play-badge-migration src
```

### IconCircleClose

기존 IconCircleClose 아이콘 이름이 IconCircleCloseFill로 변경되고 신규 IconCircleClose 아이콘이 추가되었어요.

```sh
npx @montage-ui/codemod@latest icon-circle-close-migration src
```

AS-IS
![image](https://github.com/user-attachments/assets/4a38d96c-c95d-431b-85bd-758a683aefff)

TO-BE
![image](https://github.com/user-attachments/assets/988ad1e2-0ad8-4934-8edd-7afbcaa100a4)

### Modal Resize

Modal의 huge 사이즈가 제거되었고 medium-fixed 사이즈 옵션을 size, resize 옵션으로 분리하였어요.

- medium-fixed 같은 경우 size="medium" resize="fixed" 로 사용해요.
- 기본값이 fixed에서 hug로 변경되었어요.

```sh
npx @montage-ui/codemod@latest modal-migration src
```

size="huge" 의 경우 수동으로 대응이 필요해요.

- size="huge"에 따로 width를 주지 않은 경우 width: 640px으로 설정이 필요해요.
- size를 xlarge로 설정해요.

### Padding

padding 옵션이 동작에 따라 horizontalPadding, verticalPadding으로 변경되었어요.

- AccordionSummary, ListCell, AutocompleteOption, Option, MenuItem
  - padding -> verticalPadding

```sh
npx @montage-ui/codemod@latest padding-to-vertical-padding src
```

- TabList
  - padding -> horizontalPadding

```sh
npx @montage-ui/codemod@latest padding-to-horizontal-padding src
```

### Size

Size 옵션의 네이밍 컨벤션이 통일되었어요.
`normal` 의 사이즈 값은 더 이상 사용하지 않아요.

TopNavigationButton, Switch, ScrollArea, RoundCheckbox, RoundRadioGroupItem, PaginationDot, PaginationCounter, IconButton, ChipFilter, ChipAction, Checkbox, CheckMark, NestedCheckbox

- size
  - normal -> medium

TabList

- resize
  - normal -> hug

ListCell, AutocompleteOption, AccordionSummary, MenuItem, Option

- verticalPadding
  - 0px -> none
  - 12px -> medium
  - 16px -> large
  - 8px -> small

ModalContainer

- size
  - normal -> medium
  - medium -> large
  - large -> xlarge

ContentBadge

- size
  - normal -> xsmall
  - medium -> small
  - large -> medium

```sh
npx @montage-ui/codemod@latest size-migration src
```

아래 부분은 수동 대응이 필요합니다.

ListCellContent, AccordionSummaryContent

- height
  - 옵션 제거, 항상 hug로 변경

Avatar

- size
  - 기본 사이즈 large -> small 로 변경

SegmentedControl

- size
  - 기본 사이즈 large -> medium 으로 변경

### VerticalAlign

다음 컴포넌트들의 기본 정렬이 `flex-start` 로 변경되었습니다.

- ListCell, AutocompleteOption, AccordionSummary, MenuItem, Option

또한 ellipsis 가 true이면 center 정렬되도록 하던 부분이 제거되었습니다.

`alignItems` 옵션을 통해 수동으로 정렬 대응이 필요합니다.
