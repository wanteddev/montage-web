# Wanted Design System

A plugin that includes the Wanted Design System (WDS) MCP server and skills.

[English](./README.md) | [한국어](./README.ko.md)

## Installation

```bash
/plugin marketplace add wanteddev/montage-web
```

```bash
/plugin install montage-web-guide@montage-web
```

## Features

### MCP Server

The following tools are available through the `@wanteddev/wds-mcp` MCP server:

| Tool                     | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `wds_coding_guidelines`  | View WDS coding guidelines                                                                |
| `list_components`        | List available components                                                                 |
| `get_component`          | View detailed component specs                                                             |
| `list_tokens`            | List design tokens                                                                        |
| `get_color_usage`        | View color token usage guide                                                              |
| `list_icons`             | List available icons                                                                      |
| `list_utility_functions` | List utility functions                                                                    |
| `get_utility_function`   | View detailed utility function specs                                                      |
| `list_dummy_components`  | List dummy layout scaffolds (`NavBar`, `Footer`, `BottomTabBar`) for demo / preview pages |
| `list_brand_assets`      | List Wanted brand marks (`LogoWanted` wordmark, `IconSymbol` symbol-only)                 |
| `getting_started`        | View WDS initial setup guide                                                              |
| `health_check`           | Check MCP server health status                                                            |

### Skill: montage-react

A skill that is automatically applied when working on components/UI in React projects.

**Auto-trigger conditions:**

- When working in a React project (when react dependency exists in package.json)
- When creating or modifying UI components
- When working on styling
- When using icons
- When a placeholder GNB / Footer / bottom tab bar is needed for a demo or preview page
- When the Wanted brand logo (wordmark or symbol) is needed

**Workflow:**

1. Check coding guidelines (required)
2. Look up and utilize Montage components
3. Apply design tokens
4. Use icons
5. Utilize utility functions
