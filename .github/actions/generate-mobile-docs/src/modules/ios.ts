import path from 'node:path';
import fs from 'node:fs';

import { globSync } from 'glob';
import matter from 'gray-matter';

import BaseModule from './base';

export default class Android extends BaseModule {
  private files: Array<string> = [];
  private tempFiles: Record<string, string> = {};

  protected readonly REPOSITORY = 'montage-ios';
  protected readonly PROJECT_PATH = 'documentation';

  protected readonly CUSTOM_COMPONENT_MAP: Record<string, string> = {
    popupmodal: 'popup',
    counterpagination: 'pagecounter',
    dotpagination: 'paginationdots',
    groupavatar: 'avatargroup',
  };
  protected readonly COPY_COMPONENT_MAP: Record<string, Array<string>> = {
    control: ['checkbox', 'check-mark', 'radio', 'switch'],
  };

  protected readonly MERGE_COMPONENT_MAP: Record<string, Array<string>> = {
    progresstracker: ['verticalprogresstracker', 'horizontalprogresstracker'],
    bottomsheet: ['bottomsheetmodal', 'fullmodal'],
  };

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
      const slug = file.split('/');
      const titleWithDash = (
        slug.at(-1) === 'ios.md' ? slug.at(-2) : slug.at(-1)
      )?.replace('.md', '');
      const title = titleWithDash?.replace(/-/g, '');

      const customTitle = this.CUSTOM_COMPONENT_MAP[title!]?.replace(/-/g, '');

      const copyTitle = this.COPY_COMPONENT_MAP[title!];

      if (copyTitle?.length) {
        for (const copy of copyTitle) {
          const designFile = super.getDesignComponentFiles().find((f) => {
            const designSlug = f.split('/');

            return (
              designSlug.at(designSlug.length - 2)!.replace(/-/g, '') ===
              copy.replace(/-/g, '')
            );
          });

          if (!designFile) {
            continue;
          }

          this.tempFiles[designFile.replace(/design\.mdx$/, 'ios.md')] =
            fs.readFileSync(file, 'utf8');
        }

        continue;
      }

      const designFile = super.getDesignComponentFiles().find((f) => {
        const designSlug = f.split('/');

        return (
          designSlug.at(designSlug.length - 2)!.replace(/-/g, '') ===
          (customTitle || title)
        );
      });

      if (designFile) {
        this.tempFiles[designFile.replace(/design\.mdx$/, 'ios.md')] =
          fs.readFileSync(file, 'utf8');
      } else {
        const utilityPath =
          file.match(/\/utilities\/([^/]+)\//)?.[1] ?? 'ios-utilities';

        this.tempFiles[
          `docs/data/utilities/${utilityPath}/${titleWithDash}.md`
        ] = fs.readFileSync(file, 'utf8');
      }
    }

    for (const [key, value] of Object.entries(this.MERGE_COMPONENT_MAP)) {
      const contents = value.map((merge) => {
        const mergeKey = `docs/data/utilities/ios-utilities/${merge}.md`;
        return {
          key: mergeKey,
          value: this.tempFiles[mergeKey],
        };
      });

      let mergedContent = '';

      for (let i = 0; i < contents.length; i++) {
        const content = contents[i]!;
        if (!content.value) continue;

        const parsedMatter = matter(content.value);

        if (i === 0) {
          mergedContent += matter.stringify('\n', parsedMatter.data);
        }

        mergedContent += `## ${parsedMatter.data.title}\n${parsedMatter.data.description ? `\n${parsedMatter.data.description}\n` : ''}`;
        mergedContent += parsedMatter.content.replace(/^##/gm, '###');

        delete this.tempFiles[content.key];
      }

      const newKey = super.getDesignComponentFiles().find((f) => {
        const slug = f.split('/');

        return slug.at(slug.length - 2)!.replace(/-/g, '') === key;
      });

      this.tempFiles[newKey!.replace(/design\.mdx$/, 'ios.md')] = mergedContent;
    }
  };

  public save = () => {
    const prevFiles = [
      ...globSync('docs/data/utilities/ios-*/*.md'),
      ...globSync('docs/data/components/**/ios.md'),
    ];
    for (const file of prevFiles) {
      fs.rmSync(file, { recursive: true, force: true });
    }
    for (const [key, value] of Object.entries(this.tempFiles)) {
      const directory = key.replace(/\/([^/]+)\.md$/, '');
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(key, value, 'utf-8');
    }
  };
}
