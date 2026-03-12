# `@wanteddev/montage-mcp`

[English](./README.md) | [한국어](./README.ko.md)

MCP (Model Context Protocol) server for the Wanted Design System.

It provides AI coding assistants with access to Montage component documentation, design tokens, icons, and coding guidelines.

> **Note:** This package is published as a private package to the GitHub Package Registry.

## Available Tools

| Tool                        | Description                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `list_components`           | List all available Montage components                                                                                             |
| `get_component`             | Get documentation and usage details for a specific component                                                                      |
| `montage_coding_guidelines` | Get coding guidelines for writing Montage-based UI code                                                                           |
| `list_icons`                | List all available icons from `@montage-ui/icon`                                                                                  |
| `list_tokens`               | List all available design tokens                                                                                                  |
| `get_color_usage`           | Get guidelines for applying colors                                                                                                |
| `list_utility_functions`    | List all available utility functions                                                                                              |
| `get_utility_function`      | Get documentation for a specific utility function                                                                                 |
| `list_dummy_components`     | List presentational dummy layout scaffolds (`NavBar`, `Footer`, `BottomTabBar`) from `@montage-ui/dummy` for demo / preview pages |
| `list_brand_assets`         | List official Wanted brand marks (`LogoWanted` from `@montage-ui/brand`, `IconSymbol` from `@montage-ui/icon`)                    |
| `getting_started`           | Get installation and initial configuration guide                                                                                  |
| `health_check`              | Check the health status of the MCP server                                                                                         |

## Setup

We recommend installing via the [Claude Plugin](../../.claude-plugin/montage-web-guide/README.md), which includes the MCP server along with skills for streamlined development.

```bash
claude plugin add wanteddev/montage-web
```

### Manual Setup (with a pinned version)

If you want to pin a specific version, you can set it up manually:

When use < 4.0.0 version, use `@montage-ui/mcp`.

#### Cursor

Add the following to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "montage-mcp-server-v3": {
      "command": "npx",
      "args": ["-y", "@montage-ui/mcp@3.4.0"]
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
claude mcp add montage-mcp-server-v3 -- npx -y @montage-ui/mcp@3.4.0
claude mcp add montage-mcp-server-v4 -- npx -y @wanteddev/montage-mcp@4.0.0
```
