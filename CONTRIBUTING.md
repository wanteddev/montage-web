# Contributing to Montage

Thank you for your interest in contributing to Montage. This guide will help you get started.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- [Corepack](https://nodejs.org/api/corepack.html) (included with Node.js)

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/<your-username>/montage-web.git
cd montage-web
```

2. Set up Node.js and pnpm:

```bash
nvm install
nvm use
corepack enable
```

3. Install dependencies:

```bash
pnpm install
```

4. Build all packages:

```bash
pnpm build
```

5. Start the documentation site in development mode to preview your changes:

```bash
pnpm -F docs dev
```

## Project Structure

This is a monorepo managed with [Lerna](https://lerna.js.org/) and [Nx](https://nx.dev/).

| Package                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `packages/wds`               | Core UI component library              |
| `packages/wds-engine`        | Styling engine (Box, ThemeProvider)    |
| `packages/wds-theme`         | Design tokens and theme definitions    |
| `packages/wds-icon`          | Icon components                        |
| `packages/wds-lottie`        | Lottie animation components            |
| `packages/wds-nextjs`        | Next.js integration                    |
| `packages/wds-codemod`       | Codemod scripts for migrations         |
| `packages/wds-mcp`           | MCP server for AI-assisted development |
| `packages/eslint-plugin-wds` | ESLint plugin for WDS best practices   |

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). Each commit message should be structured as:

```txt
<type>(<scope>): <description>
```

**Types:**

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

## Testing

```bash
# Unit tests
pnpm test:unit

# Visual regression tests
pnpm test:visual

# Linting
pnpm lint
```

## Pull Request Process

1. Create a new branch from `main`:

```bash
git checkout -b feature/your-feature
```

2. Make your changes and commit following the commit convention above.
3. Push your branch and open a Pull Request against `main`.
4. Fill out the PR template and ensure all checks pass.
5. A maintainer will review your PR and may request changes.

## Reporting Issues

- **Bug Reports** - Use the [Bug Report](https://github.com/wanteddev/montage-web/issues/new?template=bug.yml) template
- **Questions, Feature Requests** - Use [GitHub Discussions](https://github.com/wanteddev/montage-web/discussions)

## License

By contributing to Montage, you agree that your contributions will be licensed under the [MIT License](./LICENSE.md).
