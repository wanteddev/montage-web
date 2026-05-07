# `@wanteddev/montage-mcp`

[English](./README.md) | [한국어](./README.ko.md)

Wanted Design System을 위한 MCP (Model Context Protocol) 서버입니다.

AI 코딩 어시스턴트에게 Montage 컴포넌트 문서, 디자인 토큰, 아이콘, 코딩 가이드라인에 대한 접근을 제공합니다.

> **Note:** 이 패키지는 private package로 GitHub Package Registry에 배포됩니다.

## 제공 도구

| 도구                        | 설명                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `list_components`           | 사용 가능한 모든 Montage 컴포넌트 목록 조회                                                             |
| `get_component`             | 특정 컴포넌트의 문서 및 사용법 조회                                                                     |
| `montage_coding_guidelines` | Montage 기반 UI 코드 작성 가이드라인 조회                                                               |
| `list_icons`                | `@montage-ui/icon`에서 사용 가능한 아이콘 목록 조회                                                     |
| `list_tokens`               | 사용 가능한 디자인 토큰 목록 조회                                                                       |
| `get_color_usage`           | 색상 적용 가이드라인 조회                                                                               |
| `list_utility_functions`    | 사용 가능한 유틸리티 함수 목록 조회                                                                     |
| `get_utility_function`      | 특정 유틸리티 함수의 문서 조회                                                                          |
| `list_dummy_components`     | `@montage-ui/dummy`의 데모/프리뷰용 레이아웃 스캐폴드(`NavBar`, `Footer`, `BottomTabBar`) 목록 조회     |
| `list_brand_assets`         | 공식 Wanted 브랜드 마크 목록 조회 (`montage-ui/brand`의 `LogoWanted`, `montage-ui/icon`의 `IconSymbol`) |
| `getting_started`           | 설치 및 초기 설정 가이드 조회                                                                           |
| `health_check`              | MCP 서버의 상태 확인                                                                                    |

## 설정

MCP 서버와 스킬을 함께 포함하는 [Claude Plugin](../../.claude-plugin/montage-web-guide/README.ko.md)을 통한 설치를 권장합니다.

```bash
claude plugin add wanteddev/montage-web
```

### 수동 설정 (특정 버전 고정)

특정 버전을 고정하여 사용하고 싶은 경우, 수동으로 설정할 수 있습니다:

4.0.0 미만 버전의 경우 `@wanteddev/wds-mcp` 를 사용하세요.

#### Cursor

`.cursor/mcp.json`에 다음을 추가하세요:

```json
{
  "mcpServers": {
    "montage-mcp-server-v3": {
      "command": "npx",
      "args": ["-y", "@wanteddev/wds-mcp@3.4.0"]
    },
    "montage-mcp-server-v4": {
      "command": "npx",
      "args": ["-y", "@wanteddev/montage-mcp@4.0.0"]
    }
  }
}
```

#### Claude Code

```bash
claude mcp add montage-mcp-server-v3 -- npx -y @wanteddev/wds-mcp@3.4.0
claude mcp add montage-mcp-server-v4 -- npx -y @wanteddev/montage-mcp@4.0.0
```
