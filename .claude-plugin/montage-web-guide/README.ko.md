# Wanted Design System

Wanted Design System(WDS) MCP와 skill이 포함된 플러그인입니다.

[English](./README.md) | [한국어](./README.ko.md)

## 설치

```bash
/plugin marketplace add wanteddev/montage-web
```

```bash
/plugin install montage-web-guide@montage-web
```

## 기능

### MCP 서버

`@wanteddev/wds-mcp` MCP 서버를 통해 다음 도구를 사용할 수 있습니다:

| 도구                     | 설명                      |
| ------------------------ | ------------------------- |
| `wds_coding_guidelines`  | WDS 코딩 가이드라인 조회  |
| `list_components`        | 컴포넌트 목록 조회        |
| `get_component`          | 컴포넌트 상세 스펙 조회   |
| `list_tokens`            | 디자인 토큰 목록 조회     |
| `get_color_usage`        | 색상 토큰 사용법 조회     |
| `list_icons`             | 아이콘 목록 조회          |
| `list_utility_functions` | 유틸리티 함수 목록 조회   |
| `get_utility_function`   | 유틸리티 함수 상세 조회   |
| `getting_started`        | WDS 초기 셋팅 가이드 조회 |

### Skill: montage-react

React 프로젝트에서 컴포넌트/UI 작업 시 자동으로 적용되는 skill입니다.

**자동 트리거 조건:**

- React 프로젝트에서 작업할 때 (package.json에 react 의존성이 있는 경우)
- UI 컴포넌트를 생성하거나 수정할 때
- 스타일링 작업을 할 때
- 아이콘을 사용할 때

**워크플로우:**

1. 코딩 가이드라인 확인 (필수)
2. Montage 컴포넌트 조회 및 활용
3. 디자인 토큰 적용
4. 아이콘 사용
5. 유틸리티 함수 활용
