import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { useRouter } from 'next/navigation';

import { useMDXContext } from '@/features/docs/contexts';
import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import {
  createRecentSearchStorage,
  isPageLevel,
  isTextLevel,
  parseFrontmatterToDocSearchHit,
  sortByText,
} from './helpers';

import type { OnSelectParams } from '@algolia/autocomplete-core';
import type { SearchResponse } from 'algoliasearch/lite';
import type {
  DocSearchHit,
  DocSearchState,
  InternalDocSearchHit,
} from './types';
import type { FormEvent } from 'react';

type UseDocSearchParams = {
  apiKey: string;
  appId: string;
  onOpenChange?: (value: boolean) => void;
};

const indexName = 'Montage Crawler';

export const useDocSearch = ({
  apiKey,
  appId,
  onOpenChange,
}: UseDocSearchParams) => {
  const { allFrontmatter } = useMDXContext();
  const [state, setState] = useState<DocSearchState<InternalDocSearchHit>>({
    query: '',
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    activeItemId: null,
    status: 'idle',
  });

  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const snippetLength = useRef<number>(10);
  const initialQueryFromSelection: string = useRef<string>(
    typeof window !== 'undefined'
      ? window.getSelection()!.toString().slice(0, 3)
      : '',
  ).current;

  const handleClose = useCallback(
    (event: MouseEvent) => {
      const isMiddleClick = event.button === 1;

      if (
        isMiddleClick ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      onOpenChange?.(false);
    },
    [onOpenChange],
  );

  const initialQueryRef = useRef(initialQueryFromSelection);
  const initialQuery: string = initialQueryRef.current;

  const searchClient = useMemo(() => {
    const client = liteClient(appId, apiKey);
    client.addAlgoliaAgent('docsearch', '3.8.0');
    return client;
  }, [apiKey, appId]);

  const recentSearches = useRef(
    createRecentSearchStorage({
      key: `__DOCSEARCH_RECENT_SEARCHES__MONTAGE`,
      limit: 3,
    }),
  ).current;

  const saveRecentSearch = useCallback(
    (item: InternalDocSearchHit) => {
      if (item.type !== 'content') {
        recentSearches.add({ ...item, type: 'recent' });
      }
    },
    [recentSearches],
  );

  const handleSelect = useCallback(
    ({ item, event }: OnSelectParams<DocSearchHit>) => {
      saveRecentSearch(item);
      handleClose(event);
    },
    [saveRecentSearch, handleClose],
  );

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        InternalDocSearchHit,
        FormEvent<HTMLFormElement>,
        MouseEvent,
        KeyboardEvent
      >({
        id: 'docsearch',
        defaultActiveItemId: 0,
        placeholder: 'Please enter a search term',
        openOnFocus: true,
        autoFocus: true,
        navigator: {
          navigate: ({ itemUrl }) => {
            handleRouteChange();
            router.push(
              itemUrl.replace(process.env.NEXT_PUBLIC_BASE_PATH ?? '', ''),
            );
          },
        },
        initialState: {
          query: initialQuery,
        },
        onStateChange: (props) => {
          setState((prev) => ({ ...prev, ...props.state }));
        },
        getSources: async ({ query, setContext, setStatus }) => {
          if (!query) {
            return [
              {
                sourceId: 'Recent Searches',
                onSelect: handleSelect,
                getItemUrl: ({ item }) => {
                  return item.url;
                },
                getItems: () => {
                  return recentSearches.getAll() as Array<InternalDocSearchHit>;
                },
              },
              {
                sourceId: 'Pages',
                onSelect: handleSelect,
                getItemUrl: ({ item }) => {
                  return item.url;
                },
                getItems: () => {
                  const componentsFrontmatter = allFrontmatter.filter(
                    ({ slug }) => slug.at(0) === 'components',
                  );
                  const utilitiesFrontmatter = allFrontmatter.filter(
                    ({ slug }) => slug.at(0) === 'utilities',
                  );

                  const platformOrder: Record<string, number> = {
                    design: 0,
                    web: 1,
                    ios: 2,
                    android: 3,
                  };

                  return [
                    ...componentsFrontmatter.sort((a, b) => {
                      const titleCompare = a.title.localeCompare(b.title);

                      if (titleCompare !== 0) {
                        return titleCompare;
                      }

                      return (
                        (platformOrder[a.slug.at(-1) ?? ''] ?? Infinity) -
                        (platformOrder[b.slug.at(-1) ?? ''] ?? Infinity)
                      );
                    }),
                    ...utilitiesFrontmatter.sort((a, b) =>
                      a.title.localeCompare(b.title),
                    ),
                  ].map(parseFrontmatterToDocSearchHit);
                },
              },
            ];
          }

          return searchClient
            .search<DocSearchHit>({
              requests: [
                {
                  query,
                  indexName,
                  distinct: true,
                  attributesToRetrieve: [
                    'hierarchy',
                    'type',
                    'content',
                    'category',
                    'url',
                  ],
                  restrictSearchableAttributes: [
                    'hierarchy.lvl1',
                    'hierarchy.lvl2',
                    'hierarchy.lvl3',
                    'hierarchy.lvl4',
                    'hierarchy.lvl5',
                    'hierarchy.lvl6',
                    'content',
                  ],
                  attributesToSnippet: [`content:${snippetLength.current}`],
                  snippetEllipsisText: '...',
                  highlightPreTag: '<mark>',
                  highlightPostTag: '</mark>',
                  hitsPerPage: 25,
                  clickAnalytics: false,
                },
              ],
            })
            .catch((error) => {
              // https://github.com/algolia/algoliasearch-client-javascript/blob/2ffddf59bc765cd1b664ee0346b28f00229d6e12/packages/transporter/src/errors/createRetryError.ts#L5
              if (error.name === 'RetryError') {
                setStatus('error');
              }

              throw error;
            })
            .then(({ results }) => {
              const firstResult = results[0] as SearchResponse<DocSearchHit>;
              const { hits, nbHits } = firstResult;

              setContext({ nbHits });

              const pageLevelResults = hits.filter(isPageLevel);
              const textLevelResults = sortByText(hits.filter(isTextLevel));

              return [
                {
                  sourceId: 'Pages',
                  onSelect: handleSelect,
                  getItemUrl: ({ item }) => {
                    return item.url;
                  },
                  getItems: () => {
                    return pageLevelResults;
                  },
                },
                {
                  sourceId: 'Text',
                  onSelect: handleSelect,
                  getItemUrl: ({ item }) => {
                    return item.url;
                  },
                  getItems: () => {
                    return textLevelResults;
                  },
                },
              ];
            });
        },
      }),
    [
      initialQuery,
      searchClient,
      handleSelect,
      recentSearches,
      allFrontmatter,
      router,
      handleRouteChange,
    ],
  );

  useEffect(() => {
    const isMobileMediaQuery = window.matchMedia('(max-width: 768px)');

    if (isMobileMediaQuery.matches) {
      snippetLength.current = 10;
    } else {
      snippetLength.current = 20;
    }
  }, []);

  const { refresh } = autocomplete;

  useEffect(() => {
    if (initialQuery.length > 0) {
      refresh();

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [initialQuery, refresh]);

  useEffect(() => {
    initialQueryRef.current = state.query;

    if (inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isQueryEmpty = !state.query;

  const isEmpty =
    !isQueryEmpty &&
    state.status !== 'loading' &&
    state.status !== 'stalled' &&
    (state.collections.length === 0 ||
      state.collections.every((item) => item.items.length === 0));

  const recentSearchRemove = (item: DocSearchHit) => {
    recentSearches.remove(item);
    autocomplete.refresh();
  };

  return {
    autocomplete,
    state,
    recentSearchRemove,
    isEmpty,
    isQueryEmpty,
    containerRef,
    inputRef,
  };
};
