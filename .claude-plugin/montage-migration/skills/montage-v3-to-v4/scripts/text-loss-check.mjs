#!/usr/bin/env node
// Reports words that disappeared from JS/TS files between a git revision and the
// working tree. Formatters and lint autofix only move whitespace, quotes and
// punctuation, so a word whose count DROPS across the format step is a deleted
// JSX text node (or another autofix removal worth reviewing).
//
// Usage (run from the consumer repo root):
//   node text-loss-check.mjs <rev> [--all-words] [-- <path>...]
//
// <rev>        the snapshot to compare against (a commit, or a `git stash create` hash)
// --all-words  also compare ASCII-only words. Off by default: codemods rename ASCII
//              identifiers (`semantic.label.normal` → …), which is noise when <rev> is
//              the pre-migration commit. Turn it on for an English-UI repo, or when <rev>
//              is the snapshot taken right before the format step (no renames in between).
// <path>...    files to compare; defaults to the JS/TS files changed since <rev>.
//
// Exit code: 0 when nothing was lost, 1 when at least one file lost words, 2 on usage error.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const SOURCE_FILE = /\.(c|m)?(j|t)sx?$/;
const WORD = /[\p{L}\p{N}_]+/gu;
const NON_ASCII = /[^\x00-\x7F]/;

const args = process.argv.slice(2);
const separator = args.indexOf('--');
const flags = separator === -1 ? args : args.slice(0, separator);
const explicitPaths = separator === -1 ? [] : args.slice(separator + 1);
const allWords = flags.includes('--all-words');
const rev = flags.find((arg) => !arg.startsWith('--'));

if (!rev) {
  console.error(
    'usage: node text-loss-check.mjs <rev> [--all-words] [-- <path>...]',
  );
  process.exit(2);
}

const git = (...gitArgs) =>
  execFileSync('git', gitArgs, { encoding: 'utf8', maxBuffer: 1 << 28 });

const paths = (
  explicitPaths.length > 0
    ? explicitPaths
    : git('diff', '--name-only', '--diff-filter=d', rev).split('\n')
).filter((path) => SOURCE_FILE.test(path) && existsSync(path));

// A file renamed since <rev> (committed, or staged with `git mv`) is compared with
// its old path — otherwise it would be skipped as new and its losses go unseen.
const previousPaths = new Map(
  git('diff', '--name-status', '-M', '--diff-filter=R', rev)
    .split('\n')
    .map((line) => line.split('\t'))
    .filter(([status, from, to]) => status?.startsWith('R') && from && to)
    .map(([, from, to]) => [to, from]),
);

const countWords = (source) => {
  const counts = new Map();

  for (const [word] of source.matchAll(WORD)) {
    if (allWords || NON_ASCII.test(word)) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return counts;
};

let lossCount = 0;

for (const path of paths) {
  let before;

  try {
    before = git('show', `${rev}:${previousPaths.get(path) ?? path}`);
  } catch {
    continue; // new file since <rev>
  }

  const after = countWords(readFileSync(path, 'utf8'));
  const lost = [];

  for (const [word, count] of countWords(before)) {
    const diff = count - (after.get(word) ?? 0);

    if (diff > 0) {
      lost.push(diff > 1 ? `${word} ×${diff}` : word);
    }
  }

  if (lost.length > 0) {
    lossCount += 1;
    console.log(`${path}: ${lost.join(', ')}`);
  }
}

console.log(
  lossCount === 0
    ? `OK — no words lost in ${paths.length} file(s) since ${rev}`
    : `${lossCount} file(s) lost words since ${rev} — inspect each before continuing`,
);
process.exit(lossCount === 0 ? 0 : 1);
