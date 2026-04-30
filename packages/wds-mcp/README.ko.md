# `@wanteddev/wds-mcp`

[English](./README.md) | [한국어](./README.ko.md)

Wanted Design System을 위한 MCP (Model Context Protocol) 서버입니다.

AI 코딩 어시스턴트에게 WDS 컴포넌트 문서, 디자인 토큰, 아이콘, 코딩 가이드라인에 대한 접근을 제공합니다.

## 제공 도구

| 도구                     | 설명                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `list_components`        | 사용 가능한 모든 WDS 컴포넌트 목록 조회                                                                         |
| `get_component`          | 특정 컴포넌트의 문서 및 사용법 조회                                                                             |
| `wds_coding_guidelines`  | WDS 기반 UI 코드 작성 가이드라인 조회                                                                           |
| `list_icons`             | `@wanteddev/wds-icon`에서 사용 가능한 아이콘 목록 조회                                                          |
| `list_tokens`            | 사용 가능한 디자인 토큰 목록 조회                                                                               |
| `get_color_usage`        | 색상 적용 가이드라인 조회                                                                                       |
| `list_utility_functions` | 사용 가능한 유틸리티 함수 목록 조회                                                                             |
| `get_utility_function`   | 특정 유틸리티 함수의 문서 조회                                                                                  |
| `list_dummy_components`  | `@wanteddev/wds-dummy`의 데모/프리뷰용 레이아웃 스캐폴드(`NavBar`, `Footer`, `BottomTabBar`) 목록 조회          |
| `list_brand_assets`      | 공식 Wanted 브랜드 마크 목록 조회 (`@wanteddev/wds-brand`의 `LogoWanted`, `@wanteddev/wds-icon`의 `IconSymbol`) |
| `getting_started`        | 설치 및 초기 설정 가이드 조회                                                                                   |
| `health_check`           | MCP 서버의 상태 확인                                                                                            |

## 설정

### Cursor

`.cursor/mcp.json`에 다음을 추가하세요:

```json
{
  "mcpServers": {
    "montage-mcp-server": {
      "command": "npx",
      "args": ["-y", "@wanteddev/wds-mcp@latest"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add montage-mcp-server -- npx -y @wanteddev/wds-mcp@latest
```
