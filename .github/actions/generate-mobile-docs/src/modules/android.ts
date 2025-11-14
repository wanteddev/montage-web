import path from 'node:path';
import fs from 'node:fs';

import { globSync } from 'glob';

import BaseModule from './base';

export default class Android extends BaseModule {
  private files: Array<string> = [];
  private tempFiles: Record<string, string> = {};

  protected readonly REPOSITORY = 'android';
  protected readonly PROJECT_PATH =
    'core/wanted-library-design-system/document/md';

  protected readonly CUSTOM_COMPONENT_MAP: Record<string, string> = {
    modal: 'popup',
  };
  protected readonly COPY_COMPONENT_MAP: Record<string, Array<string>> = {
    control: ['checkbox', 'check-mark', 'radio', 'switch'],
  };
  protected readonly UTILITY_COMPONENT_MAP: Array<string> = ['toucharea'];

  constructor() {
    super();
  }

  public gitClone = () => super.gitClone(this.REPOSITORY);

  public cleanup = () => super.cleanup(this.REPOSITORY);

  public load = () => {
    this.files = globSync(
      path.join(this.REPOSITORY, this.PROJECT_PATH, '**/*.{md,mdx}'),
    );
  };

  public convert = () => {
    for (const file of this.files) {
      const title = file.split('/').pop()?.replace('.mdx', '');
      const customTitle = this.CUSTOM_COMPONENT_MAP[title!]?.replace(/-/g, '');
      const copyTitle = this.COPY_COMPONENT_MAP[title!];

      if (copyTitle?.length) {
        for (const copy of copyTitle) {
          const designFile = super.getDesignComponentFiles().find((f) => {
            const slug = f.split('/');

            return (
              slug.at(slug.length - 2)!.replace(/-/g, '') ===
              copy.replace(/-/g, '')
            );
          });

          if (!designFile) {
            continue;
          }

          this.tempFiles[designFile.replace(/design\.mdx$/, 'android.mdx')] =
            fs.readFileSync(file, 'utf8');
        }

        continue;
      }

      const designFile = super.getDesignComponentFiles().find((f) => {
        const slug = f.split('/');

        return (
          slug.at(slug.length - 2)!.replace(/-/g, '') === (customTitle || title)
        );
      });

      if (designFile) {
        this.tempFiles[designFile.replace(/design\.mdx$/, 'android.mdx')] =
          fs.readFileSync(file, 'utf8');
      } else {
        const isUtilityComponent = this.UTILITY_COMPONENT_MAP.includes(title!);
        const utilityPath = isUtilityComponent
          ? 'docs/data/utilities/android-utility-components'
          : 'docs/data/utilities/android-utilities';

        this.tempFiles[
          file.replace(
            path.join(this.REPOSITORY, this.PROJECT_PATH),
            utilityPath,
          )
        ] = fs.readFileSync(file, 'utf8');
      }
    }
  };

  public save = () => {
    const prevFiles = [
      ...globSync('docs/data/utilities/android-*/*.mdx'),
      ...globSync('docs/data/components/**/android.mdx'),
    ];

    for (const file of prevFiles) {
      fs.rmSync(file, { recursive: true, force: true });
    }

    for (const [key, value] of Object.entries(this.tempFiles)) {
      const directory = key.replace(/\/([^/]+)\.mdx$/, '');

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      fs.writeFileSync(key, value, 'utf-8');
    }
  };
}
