import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { useRouter } from 'next/navigation';

import {
  createRecentSearchStorage,
  isPageLevel,
  isTextLevel,
  sortByText,
} from './helpers';

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
  const [state, setState] = useState<DocSearchState<InternalDocSearchHit>>({
    query: '',
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    activeItemId: null,
    status: 'idle',
  });
  const [category, setCategory] = useState<DocSearchHit['category']>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
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

  const handleCategoryChange = useCallback(
    (value: DocSearchHit['category']) => {
      setCategory(value);
      initialQueryRef.current = state.query;
    },
    [state.query],
  );

  const searchClient = useMemo(() => {
    const client = liteClient(appId, apiKey);
    client.addAlgoliaAgent('docsearch', '3.8.0');
    return client;
  }, [apiKey, appId]);

  const recentSearches = useRef(
    createRecentSearchStorage({
      key: `__DOCSEARCH_RECENT_SEARCHES__MONTAGE`,
      limit: 10,
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
                sourceId: 'recentSearches',
                onSelect({ item, event }): void {
                  saveRecentSearch(item);
                  handleClose(event);
                },
                getItemUrl({ item }): string {
                  return item.url;
                },
                getItems(): Array<InternalDocSearchHit> {
                  return recentSearches.getAll();
                },
              },
            ];
          }

          return searchClient
            .search<DocSearchHit>({
              requests: [
                {
                  filters: category ? `category:${category}` : undefined,
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
                  onSelect: ({ event, item }) => {
                    saveRecentSearch(item);
                    router.push(item.url);
                    handleClose(event);
                  },
                  getItemUrl: ({ item }) => {
                    return item.url;
                  },
                  getItems: () => {
                    return pageLevelResults;
                  },
                },
                {
                  sourceId: 'Text',
                  onSelect: ({ event, item }) => {
                    saveRecentSearch(item);
                    router.push(item.url);
                    handleClose(event);
                  },
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
      saveRecentSearch,
      handleClose,
      recentSearches,
      router,
      category,
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
    category,
    handleCategoryChange,
  };
};
