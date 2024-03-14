- [Usage](#usage)
  - [React.js](#reactjs)
  - [Next.js](#nextjs)

# Usage

## React.js

패키지를 설치합니다.

```sh
pnpm -F @wanted-frontend/${service} install @wanteddev/wds @wanteddev/wds-icon @emotion/cache @emotion/react
```

tsconfig.json을 수정합니다.

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react" // 추가
  }
}
```

서비스 root에 `@types/wds.d.ts` 파일을 생성합니다.

```ts
/// <reference types="@wanteddev/wds/types.d.ts" />
```

App.tsx에 `ThemeProvider` 를 사용합니다.

```tsx
import { ThemeProvider } from '@wanteddev/wds';

import type { PropsWithChildren } from 'react';

const App = (props: PropsWithChildren) => {
  return <ThemeProvider>{props.children}</ThemeProvider>;
};

export default App;
```

## Next.js

패키지를 설치합니다.

```sh
pnpm -F @wanted-frontend/${service} install @wanteddev/wds @wanteddev/wds-nextjs @wanteddev/wds-icon @emotion/cache @emotion/react
```

tsconfig.json을 수정합니다.

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react" // 추가
  }
}
```

서비스 root에 `@types/wds.d.ts` 파일을 생성합니다.

```ts
/// <reference types="@wanteddev/wds/types.d.ts" />
```

`app/layout.tsx` 에 `ThemeProvider` 와 `AppRouterCacheProvider` 를 사용합니다.

```tsx
'use client';
import { ThemeProvider } from '@wanteddev/wds';
import { AppRouterCacheProvider } from '@wanteddev/wds-nextjs';

import type { PropsWithChildren } from 'react';

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html>
      <head />
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider>{props.children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

# Component

반응형이 대응 되어 있는 컴포넌트는 xs, sm, md, lg prop을 통해 variant 등을 override 할 수 있습니다.

예시

```tsx
const Comp = () => {
  return (
    <Any size="large" xs={{ size: 'small' }}>
      Any
    </Any>
  );
};
```

또한 css 속성을 이용해서 커스텀 스타일을 주입 할 수 있습니다.

```tsx
const Comp = () => {
  return (
    <Any
      css={{
        // emotion 기법
        display: 'flex',
      }}
    >
      Any
    </Any>
  );
};
```

## Button

Basic

```tsx
import { Button } from '@wanteddev/wds';

const Comp = () => {
  return (
    <Button variant="outlined" color="primary" xs={{ size: 'small' }}>
      Button
    </Button>
  );
};
```

Custom Element

```tsx
import { Button } from '@wanteddev/wds';

import Link from 'next/link';

const Comp = () => {
  return (
    <Button variant="outlined" color="primary" as={Link} href="/">
      Button
    </Button>
  );
};
```

> Button에 반응형 props를 사용할 때는 variant, color 를 한 세트로 넣어주셔야합니다.

```tsx
// BAD
import { Button } from '@wanteddev/wds';

const Comp = () => {
  return (
    <Button variant="outlined" color="secondary" xs={{ variant: 'solid' }}>
      Button
    </Button>
  );
};
```

```tsx
// Good
import { Button } from '@wanteddev/wds';

const Comp = () => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      // variant 'solid' 에는 color primary만 사용 가능하기 때문에 하나의 세트로 넣어줌
      xs={{ variant: 'solid', color: 'primary' }}
    >
      Button
    </Button>
  );
};
```

## Checkbox

```tsx
import { Checkbox } from '@wanteddev/wds';

import { useState } from 'react';

const Comp = () => {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onCheckedChange={setChecked} />;
};
```

## Divider

```tsx
import { Divider } from '@wanteddev/wds';

const Comp = () => {
  return <Divider />;
};
```

## FloatingAction

```tsx
import { FloatingAction } from '@wanteddev/wds';
import { IconAdd } from '@wanteddev/wds-icon';

import { useState } from 'react';

const Comp = () => {
  return (
    <FloatingAction>
      <IconAdd />
    </FloatingAction>
  );
};
```

## Grid

```tsx
import { Grid, GridItem } from '@wanteddev/wds';
import { IconAdd } from '@wanteddev/wds-icon';

import { useState } from 'react';

const Comp = () => {
  return (
    <Grid direction="column" spacing={4} as="section">
      {/* columns를 true로 넣으면 자동으로 남은 영역을 차지합니다. */}
      <GridItem columns />
      {/* columns를 숫자로 넣으면 전체 column (12) 개에서 차지할 영역을 선택합니다 */}
      <GridItem columns={6} />
      {/* columns를 auto로 넣으면 내부 content의 width를 따라갑니다 */}
      <GridItem columns="auto" />
    </Grid>
  );
};
```

## IconButton

```tsx
import { IconButton } from '@wanteddev/wds';
import { IconAdd } from '@wanteddev/wds-icon';

const Comp = () => {
  return (
    <IconButton direction="column" spacing={4}>
      <IconAdd />
    </IconButton>
  );
};
```
