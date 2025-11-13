import { getFrontmatterTitle } from '@/features/docs/helpers/mdx.client';
import { PLATFORM_PATTERN } from '@/features/docs/constants';

import type { Frontmatter } from '@/features/docs/types';
import type {
  DocSearchHit,
  DocSearchState,
  InternalDocSearchHit,
} from './types';

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

      const isQueryAlreadySaved = items.findIndex((x) =>
        x.objectID === hit.objectID ||
        removedHashUrl === x.url ||
        PLATFORM_PATTERN.test(removedHashUrl)
          ? x.url.replace(PLATFORM_PATTERN, '') ===
            removedHashUrl.replace(PLATFORM_PATTERN, '')
          : false,
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

export const getViewType = (
  state: DocSearchState<InternalDocSearchHit>,
  isEmpty: boolean,
  isQueryEmpty: boolean,
) => {
  if (isEmpty) {
    return 'empty';
  }

  const firstCollections = state.collections[0];

  if (isQueryEmpty || firstCollections?.source.sourceId === 'recentSearches') {
    if (!firstCollections?.items.length) {
      return 'initial';
    }

    return 'recent';
  }

  if (
    (state.status === 'loading' || state.status === 'stalled') &&
    (state.collections.length === 0 ||
      state.collections.every((item) => item.items.length === 0))
  ) {
    return 'loading';
  }

  return 'results';
};

export const parseFrontmatterToDocSearchHit = (
  frontmatter: Frontmatter,
): DocSearchHit => {
  const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/docs/${frontmatter.slug.join('/')}`;

  const urlMatch = url.match(/(ios|android|design|web)/i);
  let category = urlMatch
    ? (urlMatch.at(0) as DocSearchHit['category'])
    : 'Design';

  switch (category?.toLowerCase()) {
    case 'web':
      category = 'Web';
      break;
    case 'design':
      category = 'Design';
      break;
    case 'android':
      category = 'Android';
      break;
    case 'ios':
      category = 'iOS';
      break;
    default:
      category = null;
      break;
  }

  return {
    objectID: url,
    content: frontmatter.title,
    url,
    url_without_anchor: url,
    type: 'lvl1',
    category,
    hierarchy: {
      lvl0: '',
      lvl1: getFrontmatterTitle(frontmatter),
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },
    _highlightResult: {
      content: undefined,
      hierarchy: undefined,
      hierarchy_camel: undefined,
    },
    _snippetResult: {
      content: undefined,
      hierarchy: undefined,
      hierarchy_camel: undefined,
    },
    anchor: null,
  };
};
