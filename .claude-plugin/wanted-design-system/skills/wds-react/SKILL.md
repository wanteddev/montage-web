---
name: wds-react
description: React 프로젝트에서 WDS 기반 컴포넌트 개발 가이드. React UI 컴포넌트, 스타일링, 아이콘 작업 시 사용
---

# wds-react

React 프로젝트에서 Wanted Design System(WDS)을 기반으로 컴포넌트를 개발할 때 자동으로 적용되는 skill입니다.

## When to use

다음 조건에 해당하면 이 skill을 자동으로 적용합니다:

- React 프로젝트에서 작업할 때 (package.json에 react 의존성이 있는 경우)
- UI 컴포넌트를 생성하거나 수정할 때
- 스타일링 작업을 할 때
- 아이콘을 사용할 때

## Instructions

처음부터 React.js, Next.js 셋팅을 할 때에는 도구를 활용합니다.

```
mcp__wds-mcp-server__getting_started
```

### 1. 코딩 가이드라인 확인 (필수)

컴포넌트 작성 전 **반드시** WDS 코딩 가이드라인을 먼저 확인합니다.

```
mcp__wds-mcp-server__wds_coding_guidelines
```

### 2. 컴포넌트 개발 워크플로우

#### 2.1 기존 컴포넌트 확인

새 컴포넌트를 만들기 전, WDS에서 제공하는 컴포넌트가 있는지 **반드시** 확인합니다.

```
mcp__wds-mcp-server__list_components
```

적합한 컴포넌트가 있다면 사용 방법을 추론하지 말고 **최대한 상세 스펙을 조회**합니다.

```
mcp__wds-mcp-server__get_component({ componentName: "컴포넌트명" })
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
mcp__wds-mcp-server__list_tokens
```

#### 3.2 색상 사용법

색상 적용 시 올바른 사용법을 확인합니다.

```
mcp__wds-mcp-server__get_color_usage
```

#### 3.3 토큰 사용 원칙

- 색상: `#RRGGBB` 대신 WDS 색상 토큰 사용
- 타이포그래피: WDS typography 토큰 사용
- 그림자, 테두리 등: WDS에서 정의된 토큰 사용

### 4. 아이콘 사용

아이콘이 필요한 경우 WDS 아이콘 라이브러리를 사용합니다.

```
mcp__wds-mcp-server__list_icons
```

### 5. 유틸리티 함수 활용

WDS에서 제공하는 유틸리티 함수를 활용합니다.

```
mcp__wds-mcp-server__list_utility_functions
```

필요한 유틸리티의 상세 사용법 확인:

```
mcp__wds-mcp-server__get_utility_function({ name: "함수명" })
```

## Checklist

컴포넌트 작성 완료 후 다음을 확인합니다:

- [ ] WDS 코딩 가이드라인을 따랐는가?
- [ ] WDS 컴포넌트를 최대한 활용했는가?
- [ ] 하드코딩된 스타일 값 대신 디자인 토큰을 사용했는가?
- [ ] 컴포넌트 옵션으로 제공되어 있는 값을 커스텀 스타일로 사용하지는 않았는가?
- [ ] WDS 아이콘을 사용했는가? (필요한 경우)
- [ ] WDS 유틸리티 함수를 활용했는가? (해당되는 경우)
