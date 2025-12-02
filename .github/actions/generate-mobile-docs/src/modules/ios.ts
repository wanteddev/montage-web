import matter from 'gray-matter';

import BaseModule from './base';

import type { CopyComponentMap, CustomComponentMap } from './base';

export default class IOS extends BaseModule {
  protected readonly REPOSITORY = 'montage-ios';
  protected readonly PROJECT_PATH = 'documentation';

  protected readonly CUSTOM_COMPONENT_MAP: CustomComponentMap = {};
  protected readonly COPY_COMPONENT_MAP: CopyComponentMap = {};
  protected readonly MERGE_COMPONENT_MAP: Record<string, Array<string>> = {};

  constructor() {
    super('ios');
  }

  public convert() {
    super.convert();

    for (const [key, value] of Object.entries(this.MERGE_COMPONENT_MAP)) {
      const contents = value.map((merge) => {
        const mergeKey = `docs/data/utilities/ios-utilities/${merge}.mdx`;
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

      const newKey = this.designComponentFiles.find((f) => {
        const slug = f.split('/');

        return slug.at(slug.length - 2)!.replace(/-/g, '') === key;
      });

      this.tempFiles[newKey!.replace(/design\.mdx$/, 'ios.mdx')] =
        mergedContent;
    }

    return this;
  }
}
