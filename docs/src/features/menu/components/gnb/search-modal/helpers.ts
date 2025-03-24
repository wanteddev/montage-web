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
    ? internalDocSearchHit.__docsearch_parent._highlightResult.hierarchy?.lvl0
    : hit._highlightResult.hierarchy?.lvl0;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!lvl0) {
    return hit.hierarchy.lvl0;
  }

  return lvl0.value && regexHasHighlightTags.test(lvl0.value)
    ? lvl0.value.replace(regexHighlightTags, '')
    : lvl0.value;
};

export const isSamePage = (
  a: InternalDocSearchHit,
  b: InternalDocSearchHit,
) => {
  return (
    a.type === b.type &&
    a.hierarchy.lvl0 === b.hierarchy.lvl0 &&
    a.hierarchy.lvl1 === b.hierarchy.lvl1 &&
    (b.type === 'content'
      ? b.content === a.content
      : b.hierarchy[b.type] === a.hierarchy[b.type])
  );
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

const createStorage = <Item>(key: string) => {
  if (typeof window === 'undefined') {
    return {
      setItem(): void {},
      getItem(): Array<Item> {
        return [];
      },
    };
  }

  return {
    setItem(item: Array<Item>): void {
      return window.localStorage.setItem(key, JSON.stringify(item));
    },
    getItem(): Array<Item> {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : [];
    },
  };
};

export const createRecentSearchStorage = <Item extends DocSearchHit>({
  key,
  limit = 5,
}: {
  key: string;
  limit: number;
}) => {
  const storage = createStorage<Item>(key);
  let items = storage.getItem().slice(0, limit);

  return {
    add(item: Item): void {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _highlightResult, _snippetResult, ...hit } =
        item as unknown as DocSearchHit;

      const isQueryAlreadySaved = items.findIndex(
        (x) => x.objectID === hit.objectID,
      );

      if (isQueryAlreadySaved > -1) {
        items.splice(isQueryAlreadySaved, 1);
      }

      items.unshift(hit as Item);
      items = items.slice(0, limit);

      storage.setItem(items);
    },
    remove(item: Item): void {
      items = items.filter((x) => x.objectID !== item.objectID);

      storage.setItem(items);
    },
    getAll(): Array<Item> {
      return items;
    },
  };
};
