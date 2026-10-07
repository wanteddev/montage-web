import fs from 'fs';
import os from 'os';
import path from 'path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  collectStyleFiles,
  runStyleTextTransform,
} from './style-text-transform';

const tempDirectories: Array<string> = [];

const createTempDirectory = () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'codemod-style-'));
  tempDirectories.push(directory);
  return directory;
};

afterEach(() => {
  tempDirectories.splice(0).forEach((directory) => {
    fs.rmSync(directory, { recursive: true, force: true });
  });
  vi.restoreAllMocks();
});

describe('style-text-transform', () => {
  it('공백이 들어간 경로를 하나의 경로로 처리한다', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const root = createTempDirectory();
    const target = path.join(root, 'my app', 'src');
    fs.mkdirSync(target, { recursive: true });
    const file = path.join(target, 'a.css');
    fs.writeFileSync(file, '.a { color: OLD; }');

    const changed = runStyleTextTransform(target, (source) =>
      source.replace('OLD', 'NEW'),
    );

    expect(changed).toBe(1);
    expect(fs.readFileSync(file, 'utf8')).toBe('.a { color: NEW; }');
  });

  it('node_modules와 스타일이 아닌 파일은 건너뛴다', () => {
    const root = createTempDirectory();
    fs.mkdirSync(path.join(root, 'node_modules'));
    fs.writeFileSync(path.join(root, 'node_modules', 'b.css'), '');
    fs.writeFileSync(path.join(root, 'c.ts'), '');
    fs.writeFileSync(path.join(root, 'd.scss'), '');

    expect(collectStyleFiles(root)).toEqual([path.join(root, 'd.scss')]);
  });
});
