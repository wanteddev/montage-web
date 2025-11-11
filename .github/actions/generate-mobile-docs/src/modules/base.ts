import path from 'node:path';

import { globSync } from 'glob';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

export default abstract class BaseModule {
  protected readonly designComponentFiles: Array<string>;
  protected abstract readonly REPOSITORY: string;
  protected abstract readonly PROJECT_PATH: string;
  protected abstract readonly CUSTOM_COMPONENT_MAP: Record<string, string>;
  protected abstract readonly COPY_COMPONENT_MAP: Record<string, Array<string>>;

  constructor() {
    this.designComponentFiles = globSync(
      path.join('docs/data/components', '**/*/design.{md,mdx}'),
    );
  }

  public getDesignComponentFiles() {
    return this.designComponentFiles;
  }

  public gitClone(repository: string) {
    const ghToken = core.getInput('gh_token', { required: true });

    return exec.exec(
      `git clone https://wantedFE:${ghToken}@github.com/wanteddev/${repository}.git`,
    );
  }

  abstract load: () => void;
  abstract convert: () => void;
  abstract save: () => void;
}
