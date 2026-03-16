import type { API, FileInfo, Options } from 'jscodeshift';

const PACKAGE_NAME_MAP: Record<string, string> = {
  '@wanteddev/wds': '@montage-ui/core',
  '@wanteddev/wds-icon': '@montage-ui/icon',
  '@wanteddev/wds-nextjs': '@montage-ui/nextjs',
  '@wanteddev/wds-lottie': '@montage-ui/lottie',
  '@wanteddev/wds-theme': '@montage-ui/theme',
  '@wanteddev/wds-engine': '@montage-ui/engine',
  '@wanteddev/wds-codemod': '@montage-ui/codemod',
  '@wanteddev/wds-eslint-plugin': '@montage-ui/eslint-plugin',
  '@wanteddev/wds-mcp': '@wanteddev/montage-mcp',
};

const findMatchingOldName = (importSource: string) => {
  return Object.keys(PACKAGE_NAME_MAP).find(
    (oldName) =>
      importSource === oldName || importSource.startsWith(`${oldName}/`),
  );
};

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  root
    .find(j.ImportDeclaration)
    .filter((path) =>
      Boolean(findMatchingOldName(path.node.source.value as string)),
    )
    .forEach((path) => {
      const importSource = path.node.source.value as string;
      const oldName = findMatchingOldName(importSource);

      if (oldName) {
        const newName = PACKAGE_NAME_MAP[oldName]!;
        path.node.source.value = importSource.replace(oldName, newName);
        hasChanges = true;
      }
    });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
