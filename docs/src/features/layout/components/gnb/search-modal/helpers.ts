import type { DocSearchHit, InternalDocSearchHit } from './types';

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

      const removedHashUrl = hit.url.replace(/#([^\s]+)$/, '');

      const isQueryAlreadySaved = items.findIndex(
        (x) => x.objectID === hit.objectID || removedHashUrl === x.url,
      );

      if (isQueryAlreadySaved > -1) {
        items.splice(isQueryAlreadySaved, 1);
      }

      items.unshift({ ...hit, url: removedHashUrl } as Item);
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

export const isPageLevel = (item: InternalDocSearchHit | DocSearchHit) => {
  return item.type === 'lvl1' || item.type === 'lvl0';
};

export const isTextLevel = (item: InternalDocSearchHit | DocSearchHit) => {
  return !isPageLevel(item);
};

export const sortByText = (items: Array<InternalDocSearchHit>) => {
  return items.sort((a, b) => {
    return [
      a.category,
      parseStringFromHit(a, 'hierarchy.lvl2'),
      parseStringFromHit(a, 'hierarchy.lvl3'),
      parseStringFromHit(a, 'hierarchy.lvl4'),
      parseStringFromHit(a, 'hierarchy.lvl5'),
      parseStringFromHit(a, 'hierarchy.lvl6'),
    ]
      .filter(Boolean)
      .join('/')
      .localeCompare(
        [
          b.category,
          parseStringFromHit(b, 'hierarchy.lvl2'),
          parseStringFromHit(b, 'hierarchy.lvl3'),
          parseStringFromHit(b, 'hierarchy.lvl4'),
          parseStringFromHit(b, 'hierarchy.lvl5'),
          parseStringFromHit(b, 'hierarchy.lvl6'),
        ]
          .filter(Boolean)
          .join('/'),
      );
  });
};

export const parseStringFromHit = (
  hit: InternalDocSearchHit,
  attribute: string,
) => {
  return (
    getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
    getPropertyByPath(hit, `_highlightResult.${attribute}.value`) ||
    getPropertyByPath(hit, attribute)
  );
};

export const getPropertyByPath = (
  object: Record<string, any>,
  path: string,
): any => {
  const parts = path.split('.');

  return parts.reduce((prev, current) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (prev?.[current]) return prev[current];
    return null;
  }, object);
};
