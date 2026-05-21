import path from 'node:path';
import fs from 'node:fs';

import { globSync } from 'glob';
import * as exec from '@actions/exec';

export type CustomComponentMap = Record<string, string>;
export type CopyComponentMap = Record<string, Array<string>>;

export default abstract class BaseModule {
  public tempFiles: Record<string, string> = {};

  private readonly PLATFORM: string;
  private files: Array<string> = [];

  protected designComponentFiles: Array<string> = [];

  protected abstract readonly REPOSITORY: string;
  protected abstract readonly PROJECT_PATH: string;

  protected abstract readonly CUSTOM_COMPONENT_MAP: CustomComponentMap;
  protected abstract readonly COPY_COMPONENT_MAP: CopyComponentMap;

  constructor(platform: string) {
    this.PLATFORM = platform;
  }

  public load() {
    this.designComponentFiles = globSync(
      path.join('docs/data/components', '**/*/design.{md,mdx}'),
    );
    this.files = globSync(
      path.join(this.REPOSITORY, this.PROJECT_PATH, '**/*.{md,mdx}'),
    );

    return this;
  }

  public async gitClone() {
    return exec
      .exec(`git clone https://github.com/wanteddev/${this.REPOSITORY}.git`)
      .then(() => this);
  }

  public convert() {
    for (const file of this.files) {
      const { title, customTitle } = this.getComponentTitle(file);

      if (this.shouldConvertCopyComponent(file)) {
        this.convertCopyComponent(file);

        continue;
      }

      const designFile = this.designComponentFiles.find((f) => {
        const designSlug = f.split('/');

        return (
          designSlug.at(designSlug.length - 2)!.replace(/-/g, '') ===
          (customTitle || title)
        );
      });

      let fileContent = fs.readFileSync(file, 'utf8');

      fileContent = fileContent.replace(
        /^(---\n[\s\S]*?\n---)/,
        (frontmatter) => frontmatter.replace(/`/g, ''),
      );

      if (designFile) {
        this.tempFiles[
          designFile.replace(/design\.mdx$/, `${this.PLATFORM}.mdx`)
        ] = fileContent;
      } else {
        const matchUtilityPath = file.match(/\/utilities\/([^/]+)\//)?.[1];

        const utilityPath = matchUtilityPath ?? `${this.PLATFORM}-utilities`;

        this.tempFiles[`docs/data/utilities/${utilityPath}/${title}.mdx`] =
          fileContent;
      }
    }

    return this;
  }

  public save() {
    const prevFiles = [
      ...globSync(`docs/data/utilities/${this.PLATFORM}-*/*.{md,mdx}`),
      ...globSync(`docs/data/components/**/${this.PLATFORM}.{md,mdx}`),
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

    return this;
  }

  public cleanup() {
    fs.rmSync(path.join(this.REPOSITORY), {
      recursive: true,
      force: true,
    });

    return this;
  }

  private getConvertCopyComponents(file: string) {
    const { titleWithoutDash } = this.getComponentTitle(file);

    return this.COPY_COMPONENT_MAP[titleWithoutDash!] ?? [];
  }

  private shouldConvertCopyComponent(file: string) {
    return this.getConvertCopyComponents(file).length > 0;
  }

  private convertCopyComponent(file: string) {
    const copyComponents = this.getConvertCopyComponents(file);

    for (const copyComponent of copyComponents) {
      const designFile = this.designComponentFiles.find((f) => {
        const designSlug = f.split('/');

        return (
          designSlug.at(designSlug.length - 2)!.replace(/-/g, '') ===
          copyComponent.replace(/-/g, '')
        );
      });

      if (!designFile) {
        continue;
      }

      this.tempFiles[
        designFile.replace(/design\.mdx$/, `${this.PLATFORM}.mdx`)
      ] = fs.readFileSync(file, 'utf8');
    }
  }

  private getComponentTitle(file: string) {
    const slug = file.split('/');
    const title = (
      slug.at(-1)?.replace(/\.(md|mdx)$/, '') === this.PLATFORM
        ? slug.at(-2)
        : slug.at(-1)
    )?.replace(/\.(md|mdx)$/, '');

    return {
      title,
      titleWithoutDash: title?.replace(/-/g, ''),
      customTitle: this.CUSTOM_COMPONENT_MAP[title!]?.replace(/-/g, ''),
    };
  }
}
