import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { GlobOptionsWithoutFileTypes } from 'node:fs';

export const injectUseClient = async (
  pattern: string | Array<string>,
  options?: GlobOptionsWithoutFileTypes | undefined,
) => {
  try {
    const files = globSync(pattern, options ?? {});

    for (const file of files) {
      const filePath = join(process.cwd(), file.toString());
      const data = readFileSync(filePath, 'utf8');

      const updatedContent = `'use client';\n${data}`;

      writeFileSync(filePath, updatedContent, 'utf8');

      console.log(`Directive has been added to ${file}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
