# `@wanteddev/eslint-plugin-wds`

[English](./README.md) | [한국어](./README.ko.md)

## 설치

```sh
pnpm install -D @wanteddev/eslint-plugin-wds
```

Legacy config

```json
  "extends": [
    "plugin:@wanteddev/wds/recommended"
  ]
```

또는

```json
  "extends": [
    "plugin:@wanteddev/wds/strict"
  ]
```

Flat config

```ts
import wdsPlugin from '@wanteddev/eslint-plugin-wds';

export default [wdsPlugin.flatConfig.recommended];
```

또는

```ts
import wdsPlugin from '@wanteddev/eslint-plugin-wds';

export default [wdsPlugin.flatConfig.strict];
```

## 규칙

### icon-button-uses-name

아이콘을 버튼으로 사용할 때 `name` 혹은 `aria-label` 옵션을 지정해야 합니다.

```tsx
<IconButton>
  <IconCheck />
</IconButton>
```

해당 옵션이 없는 경우 스크린리더가 해당 버튼이 어떤 버튼인지 알 수 없어 지정해 주어야 합니다.

```tsx
// good
<IconButton name="Close modal">
  <IconCloseThick />
</IconButton>

<Button iconOnly aria-label="북마크 해제">
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

### image-uses-alt

아바타, 썸네일 등 시각적 이미지는 스크린리더를 위한 `alt` 속성을 반드시 제공해야 합니다.

```tsx
<Avatar src="https://example.com/user.png" />
```

`alt`가 없는 경우 스크린리더가 이미지를 적절히 인식하지 못하므로 대체 텍스트를 제공해야 합니다.

```tsx
// good
<Avatar alt="OOO님 프로필 이미지" src="https://example.com/user.png" />

<Thumbnail alt="about 페이지" src="/thumb.png" />

<CardThumbnail alt="원티드랩 프론트엔드 개발자 공고" src="/cover.png" />

<Box as="img" alt="하이파이브 이벤트" src="/banner.png" />

// bad
<Avatar src="https://example.com/user.png" />

<Thumbnail src="/thumb.png" />

<CardThumbnail src="/cover.png" />

<Box as="img" src="/banner.png" />
```
