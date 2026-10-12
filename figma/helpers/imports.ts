import {
  collectComponentNames,
  importLines,
} from '../components/modal/collect-imports';

type Section = {
  type?: unknown;
  nestedImports?: Array<string>;
  resultSections?: unknown;
  sections?: unknown;
};

const NAMED_IMPORT = /^import \{([^}]*)\} from ['"]([^'"]+)['"];?$/;

/**
 * Merges import statements per module, so each module is imported on one
 * line: `import { A } from 'x'` + `import { B } from "x"` →
 * `import { A, B } from 'x';`. Plain names go to `@montage-ui/core`; other
 * statements are kept as-is.
 */
export const mergeImports = (entries: Array<string>): Array<string> => {
  const byModule = new Map<string, Set<string>>();
  const statements = new Set<string>();
  const add = (module: string, name: string) => {
    const names = byModule.get(module) ?? new Set<string>();
    names.add(name);
    byModule.set(module, names);
  };
  for (const entry of entries) {
    if (!entry.startsWith('import ')) {
      add('@montage-ui/core', entry);
      continue;
    }
    const match = NAMED_IMPORT.exec(entry.trim());
    if (!match) {
      statements.add(entry.trim());
      continue;
    }
    match[1]
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
      .forEach((name) => add(match[2], name));
  }
  return [
    ...[...byModule].map(
      ([module, names]) =>
        `import { ${[...names].sort().join(', ')} } from '${module}';`,
    ),
    ...statements,
  ];
};

/** Import statements of an `INSTANCE` section and the code rendered in it. */
const sectionImports = (section: Section) =>
  section.nestedImports?.length
    ? section.nestedImports
    : importLines(collectComponentNames(section.resultSections));

/**
 * Replaces nested `INSTANCE` sections with their rendered code and moves the
 * imports carried by sections (`nestedImports`) into `sink`. Figma appends
 * those imports on its own, one statement per section, so icons end up on
 * several lines and duplicate the imports declared by the parent. Flattened,
 * every import is declared once by the parent template. Instances without
 * rendered code (no Code Connect) are kept as they are.
 */
export const flattenInstances = (
  value: unknown,
  sink?: Set<string>,
): unknown => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      const flattened = flattenInstances(item, sink);
      return Array.isArray(flattened) ? flattened : [flattened];
    });
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  const section = value as Section & { code?: unknown };
  if (section.type === 'INSTANCE' && Array.isArray(section.resultSections)) {
    sectionImports(section).forEach((statement) => sink?.add(statement));
    return flattenInstances(section.resultSections, sink);
  }
  if (section.type === 'CODE' && section.nestedImports) {
    section.nestedImports.forEach((statement) => sink?.add(statement));
    return { type: 'CODE', code: section.code };
  }
  if (Array.isArray(section.sections)) {
    return { ...section, sections: flattenInstances(section.sections, sink) };
  }
  return value;
};

/**
 * Inlines every nested instance of a template and merges its imports per
 * module. Figma would otherwise append one import line per nested instance
 * (e.g. `IconA` and `IconB` on separate lines, or `Badge` apart from the core
 * import). Templates that expose `metadata.props.imports` for their parents get
 * the inlined imports there too, since the inlined code no longer carries them.
 */
export const inlineInstances = <
  T extends { imports: Array<string>; example: unknown; metadata?: unknown },
>(
  template: T,
): T => {
  const sink = new Set<string>();
  const example = flattenInstances(template.example, sink);
  const metadata = template.metadata as
    | { props?: { imports?: Array<string> } }
    | undefined;
  const declared = metadata?.props?.imports;
  return {
    ...template,
    example,
    imports: mergeImports([...template.imports, ...sink]),
    ...(declared && {
      metadata: {
        ...metadata,
        props: {
          ...metadata?.props,
          imports: mergeImports([...declared, ...sink]),
        },
      },
    }),
  };
};
