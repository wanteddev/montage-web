// Nested imports only travel one template level up: when a template embeds a
// child example whose own children render further components, those
// grandchildren's imports are dropped from the final snippet. These helpers read
// the component names back out of rendered examples so a parent template can
// declare them itself.

const CORE_ICON_PREFIXED = new Set(['IconButton']);

type CollectedNames = {
  /** Rendered by the template itself or by grandchildren (2+ levels down). */
  declare: Set<string>;
  /** Rendered by direct child templates, whose imports the server appends. */
  direct: Set<string>;
};

/**
 * Collects JSX component names (`<Name`) rendered in example sections, split by
 * template depth. The server appends the imports of DIRECT child templates
 * (INSTANCE sections) but drops anything nested deeper, so only the parent's own
 * code and grandchildren need to be declared by the parent.
 */
const collectByDepth = (...examples: Array<unknown>): CollectedNames => {
  const declare = new Set<string>();
  const direct = new Set<string>();
  const visit = (value: unknown, depth: number) => {
    if (!value) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => visit(item, depth));
      return;
    }
    if (typeof value === 'string') {
      const target = depth === 1 ? direct : declare;
      for (const match of value.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
        target.add(match[1]);
      }
      return;
    }
    if (typeof value === 'object') {
      const section = value as {
        type?: unknown;
        code?: unknown;
        resultSections?: unknown;
        sections?: unknown;
      };
      if (section.type === 'INSTANCE') {
        visit(section.resultSections, depth + 1);
        return;
      }
      visit(section.code, depth);
      visit(section.resultSections, depth);
      visit(section.sections, depth);
    }
  };
  examples.forEach((example) => visit(example, 0));
  return { declare, direct };
};

/** Collects every JSX component name (`<Name`) rendered in example sections. */
export const collectComponentNames = (...examples: Array<unknown>) => {
  const { declare, direct } = collectByDepth(...examples);
  return [...new Set([...declare, ...direct])];
};

/** Builds `@montage-ui/core` / `@montage-ui/icon` import lines for the names. */
export const importLines = (...nameLists: Array<Array<string>>) => {
  const names = [...new Set(nameLists.flat())];
  const icons = names
    .filter((name) => /^Icon[A-Z]/.test(name) && !CORE_ICON_PREFIXED.has(name))
    .sort();
  const core = names.filter((name) => !icons.includes(name)).sort();
  return [
    ...(core.length
      ? [`import { ${core.join(', ')} } from '@montage-ui/core';`]
      : []),
    ...(icons.length
      ? [`import { ${icons.join(', ')} } from '@montage-ui/icon';`]
      : []),
  ];
};

/**
 * Import statements of an executed nested template. Templates re-declare their
 * imports in `metadata.props.imports`; for one that does not, the components
 * rendered in its example are imported instead.
 */
export const executedImports = ({
  example,
  metadata,
}: {
  example: unknown;
  metadata?: { props?: Record<string, unknown> };
}) =>
  (metadata?.props?.imports as Array<string> | undefined) ??
  importLines(collectComponentNames(example));

type Template = {
  id: string;
  imports: Array<string>;
  example: unknown;
  metadata?: unknown;
};

/**
 * Declares the components rendered by the template itself and by grandchildren
 * (which the server would drop), and removes names that only direct child
 * templates render (the server appends those, so re-declaring them duplicates).
 */
export const finalizeTemplate = <T extends Template>(template: T): T => {
  const { declare, direct } = collectByDepth(template.example);
  const byModule = new Map<string, Set<string>>();
  const add = (module: string, name: string) => {
    const set = byModule.get(module) ?? new Set<string>();
    set.add(name);
    byModule.set(module, set);
  };
  const passthrough: Array<string> = [];
  for (const line of template.imports) {
    const match = /^import \{([^}]*)\} from ['"]([^'"]+)['"];?$/.exec(
      line.trim(),
    );
    if (!match) {
      passthrough.push(line);
      continue;
    }
    match[1]
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name && !(direct.has(name) && !declare.has(name)))
      .forEach((name) => add(match[2], name));
  }
  for (const name of declare) {
    const known = [...byModule.values()].some((set) => set.has(name));
    if (!known) {
      add(
        /^Icon[A-Z]/.test(name) && !CORE_ICON_PREFIXED.has(name)
          ? '@montage-ui/icon'
          : '@montage-ui/core',
        name,
      );
    }
  }
  const imports = [
    ...passthrough,
    ...[...byModule]
      .filter(([, names]) => names.size > 0)
      .map(
        ([module, names]) =>
          `import { ${[...names].sort().join(', ')} } from '${module}';`,
      ),
  ];
  return { ...template, imports };
};
