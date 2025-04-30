# Migration Guide

## 2.0.0 (2025-04-30)

꼭 아래 나열된 순서대로 마이그레이션을 진행해주세요.

### LeftContent, RightContent

leftContent, rightContent 의 이름이 더욱 명확하게 변경돼요.

TabList, CategoryList 의 rightContent는 iconButton으로 변경돼요.
나머지 leftContent, rightContent는 모두 leadingContent, trailingContent로 변경돼요.

```sh
npx @wanteddev/wds-codemod@latest leading-trailing-migration src
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
npx @wanteddev/wds-codemod@latest filled-variant-to-solid src
```

### Theme Palette

theme.palette의 명칭이 theme.atomic, theme.semantic으로 분리되고 accent 색상의 명칭이 변경돼요.

Accent 색상이 Accent/Background, Accent/Foreground로 나누어져요.
기존 색상은 Accent/Background 로 마이그레이션 하며, ContentBadge에서 사용하는 색상은 Accent/Foreground로 마이그레이션이 필요해요.

```sh
npx @wanteddev/wds-codemod@latest palette-to-atomic-semantic src
```

![image](https://github.com/user-attachments/assets/5c16c9d9-4010-4a90-8253-993a18fe16bd)

6가지 Atomic 색상이 신규로 추가되었어요.

![image](https://github.com/user-attachments/assets/4d20f3a3-62f2-442d-956d-92ab60fc9084)

var(--theme-palette-\*) 으로 사용하던 부분은 수동으로 마이그레이션이 필요해요.

### Typography

Typography의 variant명이 kebab-case로 변경되고 display 기본 동작이 태그를 따라 가도록 변경되었어요.

Typography의 display 동작이 변경됨으로 깨지는 부분이 없는지 확인이 필요해요.

```sh
npx @wanteddev/wds-codemod@latest typography-variant-cases src
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
npx @wanteddev/wds-codemod@latest menu-bottom-migration src
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
npx @wanteddev/wds-codemod@latest avatar-migration src
```

### Toast, Snackbar

useToast의 variant명이 변경되었어요.

- success -> positive
- warning -> cautionary
- negative (신규)
- custom -> 제거(normal로 통합)

```sh
npx @wanteddev/wds-codemod@latest toast-migration src
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
npx @wanteddev/wds-codemod@latest heading-to-title src
```

아래 부분은 수동 대응이 필요해요.

- data-role="empty-state-text-heading" -> data-role="empty-state-text-title"
- data-role="slider-heading" -> data-role="slider-title"

### ActionArea

ActionArea, PickerActionArea의 옵션명이 변경되었어요.

- 기존 priority 옵션이 variant로 변경되고 기존 variant는 extra (boolean) 으로 변경되었어요.
- sticky 옵션명이 background로 변경되었어요.

```sh
npx @wanteddev/wds-codemod@latest action-area-migration src
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
npx @wanteddev/wds-codemod@latest input-to-field src
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
npx @wanteddev/wds-codemod@latest check-mark-migration src
```

### PlayIconBadge

PlayIconBadge가 PlayBadge로 변경되었어요.

```sh
npx @wanteddev/wds-codemod@latest play-badge-migration src
```

### IconCircleClose

기존 IconCircleClose 아이콘 이름이 IconCircleCloseFill로 변경되고 신규 IconCircleClose 아이콘이 추가되었어요.

```sh
npx @wanteddev/wds-codemod@latest icon-circle-close-migration src
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
npx @wanteddev/wds-codemod@latest modal-migration src
```

size="huge" 의 경우 수동으로 대응이 필요해요.

- size="huge"에 따로 width를 주지 않은 경우 width: 640px으로 설정이 필요해요.
- size를 xlarge로 설정해요.

### Padding

padding 옵션이 동작에 따라 horizontalPadding, verticalPadding으로 변경되었어요.

- AccordionSummary, ListCell, AutocompleteOption, Option, MenuItem
  - padding -> verticalPadding

```sh
npx @wanteddev/wds-codemod@latest padding-to-vertical-padding src
```

- TabList
  - padding -> horizontalPadding

```sh
npx @wanteddev/wds-codemod@latest padding-to-horizontal-padding src
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
npx @wanteddev/wds-codemod@latest size-migration src
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
