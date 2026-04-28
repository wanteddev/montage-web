# `@wanteddev/wds-mcp`

[English](./README.md) | [한국어](./README.ko.md)

MCP (Model Context Protocol) server for the Wanted Design System.

It provides AI coding assistants with access to WDS component documentation, design tokens, icons, and coding guidelines.

## Available Tools

| Tool                     | Description                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `list_components`        | List all available WDS components                                                                                                    |
| `get_component`          | Get documentation and usage details for a specific component                                                                         |
| `wds_coding_guidelines`  | Get coding guidelines for writing WDS-based UI code                                                                                  |
| `list_icons`             | List all available icons from `@wanteddev/wds-icon`                                                                                  |
| `list_tokens`            | List all available design tokens                                                                                                     |
| `get_color_usage`        | Get guidelines for applying colors                                                                                                   |
| `list_utility_functions` | List all available utility functions                                                                                                 |
| `get_utility_function`   | Get documentation for a specific utility function                                                                                    |
| `list_dummy_components`  | List presentational dummy layout scaffolds (`NavBar`, `Footer`, `BottomTabBar`) from `@wanteddev/wds-dummy` for demo / preview pages |
| `list_brand_assets`      | List official Wanted brand marks (`LogoWanted` from `@wanteddev/wds-brand`, `IconSymbol` from `@wanteddev/wds-icon`)                 |
| `getting_started`        | Get installation and initial configuration guide                                                                                     |
| `health_check`           | Check the health status of the MCP server                                                                                            |

## Setup

### Cursor

Add the following to your `.cursor/mcp.json`:

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
