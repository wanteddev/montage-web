import path from 'path';
import fs from 'fs';

const STYLE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];
const IGNORED_DIRECTORIES = new Set(['node_modules', '.next', 'dist']);

/**
 * jscodeshift only parses JS/TS, so stylesheets are handled with a plain text
 * pass that reuses the same rename rules. Walks the file/directory passed on
 * the CLI and rewrites every token the rename matches.
 */
export const collectStyleFiles = (target: string): Array<string> => {
  let stat;

  try {
    stat = fs.statSync(target);
  } catch {
    return [];
  }

  if (stat.isFile()) {
    return STYLE_EXTENSIONS.includes(path.extname(target)) ? [target] : [];
  }

  if (!stat.isDirectory()) {
    return [];
  }

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return IGNORED_DIRECTORIES.has(entry.name)
        ? []
        : collectStyleFiles(path.join(target, entry.name));
    }

    return STYLE_EXTENSIONS.includes(path.extname(entry.name))
      ? [path.join(target, entry.name)]
      : [];
  });
};

/**
 * `target` is the same single path jscodeshift receives — it is NOT split on
 * whitespace, so a path containing spaces is handled as one path by both passes.
 */
export const runStyleTextTransform = (
  target: string,
  rename: (source: string) => string,
) => {
  let changed = 0;

  for (const file of new Set(collectStyleFiles(target))) {
    const source = fs.readFileSync(file, 'utf8');
    const next = rename(source);

    if (next !== source) {
      fs.writeFileSync(file, next);
      changed += 1;
      console.log(`stylesheet updated: ${file}`);
    }
  }

  console.log(`\nStylesheets updated: ${changed}`);

  return changed;
};
