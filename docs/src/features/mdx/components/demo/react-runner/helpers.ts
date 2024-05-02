import React, { createElement, isValidElement } from 'react';
import { transform as _transform } from 'sucrase';

import type { ReactElement } from 'react';
import type { RunnerOptions, Scope } from './types';

const evalCode = (code: string, scope: Scope) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { default: _, import: imports, ...rest } = scope;
  const finalScope: Scope = {
    React,
    require: createRequire(imports),
    ...rest,
  };
  const scopeKeys = Object.keys(finalScope);
  const scopeValues = scopeKeys.map((key) => finalScope[key]);

  const fn = new Function(...scopeKeys, code);

  return fn(...scopeValues);
};

const transform = (code: string) => {
  return _transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
  }).code.substring(13); // remove leading `"use strict";`
};

const firstStatementRegexp =
  /^(\s*)(<[^>]*>|function[(\s]|\(\)[\s=]|class\s)(.*)/;

const normalizeCode = (code: string) => {
  return code.replace(firstStatementRegexp, '$1export default $2$3');
};

export const generateElement = (
  options: RunnerOptions,
): ReactElement | null => {
  const { code, scope } = options;

  if (!code.trim()) return null;

  const exports: Scope = {};
  const render = (value: unknown) => {
    exports.default = value;
  };
  evalCode(transform(normalizeCode(code)), { render, ...scope, exports });

  const result = exports.default;
  if (!result) return null;
  if (isValidElement(result)) return result;
  if (typeof result === 'function') return createElement(result);
  if (typeof result === 'string') {
    return result as unknown as ReactElement;
  }
  return null;
};

export const createRequire =
  (imports: Scope = {}) =>
  (module: string): Scope => {
    if (!imports.hasOwnProperty(module)) {
      throw new Error(`Module not found: '${module}'`);
    }
    return imports[module];
  };

export const importCode = (code: string, scope?: Scope) => {
  const exports: Scope = {};
  evalCode(transform(code), { ...scope, exports });

  return exports;
};
