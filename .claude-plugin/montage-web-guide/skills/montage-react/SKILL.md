---
name: montage-react
description: React/Next.js 프로젝트에서 Montage(WDS, Wanted Design System) 기반 UI 개발 가이드. 컴포넌트 구현, 페이지/화면 생성, 스타일링(sx, theme, 디자인 토큰), 아이콘, 유틸리티 함수 사용 시 트리거. @wanteddev/wds 패키지 사용 프로젝트에서 활성화
---

# montage-react

React 프로젝트에서 Wanted Design System(WDS, Montage)을 기반으로 컴포넌트를 개발할 때 자동으로 적용되는 skill입니다.

## When to use

다음 조건 중 하나라도 해당하면 이 skill을 적용합니다:

- `@wanteddev/wds`, `@wanteddev/wds-icon` 등 WDS 패키지를 사용하는 프로젝트에서 작업할 때
- UI 컴포넌트를 생성, 수정, 또는 조회할 때 (예: "Button 만들어줘", "Modal 사용법 알려줘", "Table 컴포넌트 조회해줘")
- 페이지나 화면을 구현할 때 (예: "로그인 페이지 만들어줘", "대시보드 화면 구현해줘")
- 스타일링 작업을 할 때 (예: sx prop, theme 토큰, 색상, 타이포그래피)
- 아이콘을 찾거나 사용할 때 (예: "아이콘 목록 보여줘", "검색 아이콘 뭐 있어?")
- Figma 디자인을 코드로 구현할 때
- WDS/Montage/디자인 시스템에 대해 질문할 때

## Instructions

### 0. MCP 서버 연결 확인 (필수, 최우선)

MCP 도구를 사용하기 전에 **반드시** `montage-mcp-server` MCP 서버의 연결 상태를 확인합니다.

`mcp__montage-mcp-server__list_components`를 호출하여 연결 상태를 확인합니다.

- **도구를 찾을 수 없는 경우** (MCP 서버 미연결): 사용자에게 MCP 서버가 연결되어 있지 않다고 안내합니다. `/mcp` 명령어를 실행하여 `montage-mcp-server`를 연결하도록 안내합니다.
- **인증 오류가 발생하는 경우**: 사용자에게 로그인이 필요하다고 안내합니다. `/mcp` 명령어를 실행하면 인증 절차를 진행할 수 있다고 안내합니다.
- **기타 오류가 발생하는 경우**: 사용자에게 MCP 서버에 접근할 수 없다고 안내하고, 나중에 다시 시도하도록 제안합니다.

연결 확인에 실패하면 이후 단계를 진행하지 않고, 사용자의 응답을 기다립니다.

### 1. 코딩 가이드라인 확인 (필수)

처음부터 React.js, Next.js 셋팅을 할 때에는 도구를 활용합니다.

```
mcp__montage-mcp-server__getting_started
```

컴포넌트 작성 전 **반드시** WDS 코딩 가이드라인을 먼저 확인합니다.

```
mcp__montage-mcp-server__wds_coding_guidelines
```

### 2. 컴포넌트 개발 워크플로우

#### 2.1 기존 컴포넌트 확인

새 컴포넌트를 만들기 전, WDS에서 제공하는 컴포넌트가 있는지 **반드시** 확인합니다.

```
mcp__montage-mcp-server__list_components
```

적합한 컴포넌트가 있다면 사용 방법을 추론하지 말고 **최대한 상세 스펙을 조회**합니다.

```
mcp__montage-mcp-server__get_component({ componentName: "컴포넌트명" })
```

#### 2.2 컴포넌트 사용 원칙

1. **WDS 컴포넌트 우선 사용**: 직접 구현하기 전에 WDS 컴포넌트를 최대한 활용합니다.
2. **확장 시 WDS 기반**: 커스텀이 필요한 경우에도 WDS 컴포넌트를 기반으로 확장합니다.
3. **일관성 유지**: WDS의 패턴과 API 설계를 따릅니다.

### 3. 디자인 토큰 적용

#### 3.1 토큰 목록 조회

스타일링 시 하드코딩된 값 대신 WDS 디자인 토큰을 사용합니다.
토큰에는 색상, 미디어 사이즈, 쉐도우 값 등이 사용됩니다. spacing 값은 사용하지 마세요.

```
mcp__montage-mcp-server__list_tokens
```

#### 3.2 색상 사용법

색상 적용 시 올바른 사용법을 확인합니다.

```
mcp__montage-mcp-server__get_color_usage
```

#### 3.3 토큰 사용 원칙

- 색상: `#RRGGBB` 대신 WDS 색상 토큰 사용
- 타이포그래피: WDS typography 토큰 사용
- 그림자, 테두리 등: WDS에서 정의된 토큰 사용

### 4. 아이콘 사용

아이콘이 필요한 경우 WDS 아이콘 라이브러리를 사용합니다.

```
mcp__montage-mcp-server__list_icons
```

### 5. 유틸리티 함수 활용

WDS에서 제공하는 유틸리티 함수를 활용합니다.

```
mcp__montage-mcp-server__list_utility_functions
```

필요한 유틸리티의 상세 사용법 확인:

```
mcp__montage-mcp-server__get_utility_function({ name: "함수명" })
```

## Checklist

컴포넌트 작성 완료 후 다음을 확인합니다:

- [ ] WDS 코딩 가이드라인을 따랐는가?
- [ ] WDS 컴포넌트를 최대한 활용했는가?
- [ ] 하드코딩된 스타일 값 대신 디자인 토큰을 사용했는가?
- [ ] 컴포넌트 옵션으로 제공되어 있는 값을 커스텀 스타일로 사용하지는 않았는가?
- [ ] WDS 아이콘을 사용했는가? (필요한 경우)
- [ ] WDS 유틸리티 함수를 활용했는가? (해당되는 경우)
