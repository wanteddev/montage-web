import type { DocSearchHit, InternalDocSearchHit } from './types';

const regexHighlightTags = /(<mark>|<\/mark>)/g;
const regexHasHighlightTags = RegExp(regexHighlightTags.source);

export const removeHighlightTags = (
  hit: DocSearchHit | InternalDocSearchHit | undefined,
) => {
  const internalDocSearchHit = hit as InternalDocSearchHit;

  if (!hit) {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!internalDocSearchHit.__docsearch_parent && !hit._highlightResult) {
    return hit.hierarchy.lvl0;
  }

  const lvl0 = internalDocSearchHit.__docsearch_parent
    ? internalDocSearchHit.__docsearch_parent._highlightResult.hierarchy.lvl0
    : hit._highlightResult.hierarchy.lvl0;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!lvl0) {
    return hit.hierarchy.lvl0;
  }

  return lvl0.value && regexHasHighlightTags.test(lvl0.value)
    ? lvl0.value.replace(regexHighlightTags, '')
    : lvl0.value;
};

export const groupBy = <TValue extends Record<string, unknown>>(
  values: Array<TValue>,
  predicate: (value: TValue) => string,
  maxResultsPerGroup?: number,
): Record<string, Array<TValue>> => {
  return values.reduce<Record<string, Array<TValue>>>((acc, item) => {
    const key = predicate(item);

    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }

    if (acc[key] && acc[key]!.length < (maxResultsPerGroup || 5)) {
      acc[key]!.push(item);
    }

    return acc;
  }, {});
};
