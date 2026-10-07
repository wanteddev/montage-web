import matter from 'gray-matter';

import BaseModule from './base';

import type { CopyComponentMap, CustomComponentMap } from './base';

export default class IOS extends BaseModule {
  protected readonly REPOSITORY = 'montage-ios';
  protected readonly PROJECT_PATH = 'documentation';

  protected readonly CUSTOM_COMPONENT_MAP: CustomComponentMap = {};
  protected readonly COPY_COMPONENT_MAP: CopyComponentMap = {};
  protected readonly MERGE_COMPONENT_MAP: Record<string, Array<string>> = {
    formcontrol: ['formcontrol', 'formcontrolgroup'],
  };

  constructor() {
    super('ios');
  }

  public convert() {
    super.convert();

    for (const [key, value] of Object.entries(this.MERGE_COMPONENT_MAP)) {
      const contents = value.map((merge) => {
        // design 파일과 매칭된 항목은 컴포넌트 경로(ios.mdx)에, 아니면 utilities 경로에 저장되어 있다
        const mergeKey =
          this.findComponentFile(merge, 'ios.mdx') ??
          `docs/data/utilities/ios-utilities/${merge}.mdx`;

        return {
          key: mergeKey,
          value: this.tempFiles[mergeKey],
        };
      });

      let mergedContent = '';

      for (const content of contents) {
        if (!content.value) continue;

        const parsedMatter = matter(content.value);

        if (!mergedContent) {
          mergedContent += matter.stringify('\n', parsedMatter.data);
        }

        mergedContent += `## ${parsedMatter.data.title}\n${parsedMatter.data.description ? `\n${parsedMatter.data.description}\n` : ''}`;
        mergedContent += parsedMatter.content.replace(/^##/gm, '###');

        delete this.tempFiles[content.key];
      }

      const newKey = this.findComponentFile(key, 'ios.mdx');

      if (!newKey || !mergedContent) continue;

      this.tempFiles[newKey] = mergedContent;
    }

    return this;
  }

  private findComponentFile(name: string, fileName: string) {
    const designFile = this.designComponentFiles.find((f) => {
      const slug = f.split('/');

      return slug.at(slug.length - 2)!.replace(/-/g, '') === name;
    });

    return designFile?.replace(/design\.mdx$/, fileName);
  }
}
