import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';

import { PLAYGROUND_DEFAULT_CODE, PLAYGROUND_QUERY_KEY } from './constants';

import type { PlaygroundShareState } from './types';

export const compressCode = (code: string) =>
  compressToEncodedURIComponent(code);

export const decompressCode = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  try {
    const decompressed = decompressFromEncodedURIComponent(
      value.replace(/ /g, '+'),
    );

    return decompressed || null;
  } catch {
    return null;
  }
};

export const parseShareState = (
  searchParams: URLSearchParams,
): PlaygroundShareState => ({
  code:
    decompressCode(searchParams.get(PLAYGROUND_QUERY_KEY.code)) ??
    PLAYGROUND_DEFAULT_CODE,
  isTransparent: searchParams.get(PLAYGROUND_QUERY_KEY.transparent) === '1',
});

export const serializeShareState = ({
  code,
  isTransparent,
}: PlaygroundShareState): string => {
  const searchParams = new URLSearchParams();

  searchParams.set(PLAYGROUND_QUERY_KEY.code, compressCode(code));

  if (isTransparent) {
    searchParams.set(PLAYGROUND_QUERY_KEY.transparent, '1');
  }

  return searchParams.toString();
};

export const createShareUrl = (state: PlaygroundShareState): string => {
  const { origin, pathname } = window.location;

  return `${origin}${pathname}?${serializeShareState(state)}`;
};

export const noop = () => {};
