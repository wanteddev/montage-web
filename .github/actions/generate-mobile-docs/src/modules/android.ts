import BaseModule from './base';

import type { CopyComponentMap, CustomComponentMap } from './base';

export default class Android extends BaseModule {
  protected readonly REPOSITORY = 'montage-android';
  protected readonly PROJECT_PATH = 'library/document/md';

  protected readonly CUSTOM_COMPONENT_MAP: CustomComponentMap = {
    search: 'search-field',
    fallback: 'fallback-view',
    topbar: 'top-navigation',
  };
  protected readonly COPY_COMPONENT_MAP: CopyComponentMap = {
    input: ['checkbox', 'check-mark', 'radio', 'switch'],
  };
  protected readonly UTILITY_COMPONENTS: Array<string> = ['toucharea'];

  constructor() {
    super('android');
  }

  public convert() {
    super.convert();

    for (const name of this.UTILITY_COMPONENTS) {
      const file = Object.keys(this.tempFiles).find((f) => {
        const slug = f.split('/');

        return (
          slug
            .at(slug.length - 1)!
            .replace(/-/g, '')
            .replace(/\.(md|mdx)$/, '') === name
        );
      });

      if (!file) continue;

      const prevUtilityKey = `docs/data/utilities/android-utilities/${name}.mdx`;
      const utilityKey = `docs/data/utilities/android-utility-components/${name}.mdx`;

      const utilityValue = this.tempFiles[prevUtilityKey];

      if (!utilityValue) continue;

      this.tempFiles[utilityKey] = utilityValue;

      delete this.tempFiles[prevUtilityKey];
    }

    return this;
  }
}
