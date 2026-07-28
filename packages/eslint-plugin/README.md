# `@montage-ui/eslint-plugin`

[English](./README.md) | [한국어](./README.ko.md)

## Install

```sh
pnpm install -D @montage-ui/eslint-plugin
```

Legacy config

```json
  "extends": [
    "plugin:@montage-ui/recommended"
  ]
```

or

```json
  "extends": [
    "plugin:@montage-ui/strict"
  ]
```

Flat config

```ts
import montagePlugin from '@montage-ui/eslint-plugin';

export default [montagePlugin.flatConfig.recommended];
```

or

```ts
import montagePlugin from '@montage-ui/eslint-plugin';

export default [montagePlugin.flatConfig.strict];
```

## Rules

### icon-button-uses-name

When using an icon as a button, you must specify the `aria-label` attribute.

```tsx
<IconButton>
  <IconCheck />
</IconButton>
```

Without this attribute, screen readers cannot identify the purpose of the button.

```tsx
// good
<IconButton aria-label="Close modal">
  <IconCloseThick />
</IconButton>

<Button iconOnly aria-label="Remove bookmark">
  <IconBookFill />
</Button>

// bad
<IconButton>
  <IconCloseThick />
</IconButton>

<Button iconOnly>
  <IconBookFill />
</Button>
```

### segmented-control-item-uses-name

When a `SegmentedControl` is `iconOnly`, each `SegmentedControlItem` must specify the `aria-label` (or `aria-labelledby`) attribute.

```tsx
<SegmentedControl iconOnly defaultValue="0">
  <SegmentedControlItem value="0">
    <IconColumn />
  </SegmentedControlItem>
</SegmentedControl>
```

In `iconOnly` mode the item's text wrapper is not rendered, so without this attribute screen readers cannot identify what each segment selects.

```tsx
// good
<SegmentedControl iconOnly defaultValue="0">
  <SegmentedControlItem value="0" aria-label="Board view">
    <IconColumn />
  </SegmentedControlItem>
  <SegmentedControlItem value="1" aria-label="List view">
    <IconList />
  </SegmentedControlItem>
</SegmentedControl>

// bad
<SegmentedControl iconOnly defaultValue="0">
  <SegmentedControlItem value="0">
    <IconColumn />
  </SegmentedControlItem>
  <SegmentedControlItem value="1">
    <IconList />
  </SegmentedControlItem>
</SegmentedControl>
```

### image-uses-alt

Visual images such as avatars and thumbnails must provide an `alt` attribute for screen readers.

```tsx
<Avatar src="https://example.com/user.png" />
```

Without `alt`, screen readers cannot properly describe the image. Always provide alternative text.

```tsx
// good
<Avatar alt="Jane's profile photo" src="https://example.com/user.png" />

<Thumbnail alt="About page" src="/thumb.png" />

<CardThumbnail alt="Frontend developer job posting" src="/cover.png" />

<Box as="img" alt="High-five event" src="/banner.png" />

// bad
<Avatar src="https://example.com/user.png" />

<Thumbnail src="/thumb.png" />

<CardThumbnail src="/cover.png" />

<Box as="img" src="/banner.png" />
```
