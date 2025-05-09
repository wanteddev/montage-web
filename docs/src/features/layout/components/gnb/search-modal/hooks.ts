import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { useRouter } from 'next/navigation';

import { createRecentSearchStorage, groupBy, isSamePage } from './helpers';

import type { AutocompleteSource } from '@algolia/autocomplete-core';
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const snippetLength = useRef<number>(10);
  const initialQueryFromSelection = useRef<string>(
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
      limit: 10,
    }),
  ).current;

  const saveRecentSearch = useCallback(
    (item: InternalDocSearchHit) => {
      const search = item.type === 'content' ? item.__docsearch_parent : item;

      if (search) {
        recentSearches.add(search);
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
        placeholder: '컴포넌트를 검색해보세요.',
        openOnFocus: true,
        autoFocus: true,
        initialState: {
          query: initialQuery,
        },
        onStateChange: (props) => {
          setState(props.state);
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
                  return recentSearches.getAll() as Array<InternalDocSearchHit>;
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
                  attributesToSnippet: [
                    `hierarchy.lvl1:${snippetLength.current}`,
                    `hierarchy.lvl2:${snippetLength.current}`,
                    `hierarchy.lvl3:${snippetLength.current}`,
                    `hierarchy.lvl4:${snippetLength.current}`,
                    `hierarchy.lvl5:${snippetLength.current}`,
                    `hierarchy.lvl6:${snippetLength.current}`,
                    `content:${snippetLength.current}`,
                  ],
                  snippetEllipsisText: '…',
                  highlightPreTag: '<mark>',
                  highlightPostTag: '</mark>',
                  hitsPerPage: 20,
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

              const parsedHits = hits.map((item) => {
                let parent: InternalDocSearchHit | null = null;

                const potentialParent = hits.find(
                  (siblingItem) =>
                    siblingItem.type === 'lvl1' &&
                    siblingItem.hierarchy.lvl1 === item.hierarchy.lvl1 &&
                    siblingItem.hierarchy.lvl0 === item.hierarchy.lvl0,
                );

                if (item.type !== 'lvl1' && potentialParent) {
                  parent = potentialParent as InternalDocSearchHit;
                }

                return {
                  ...item,
                  __docsearch_parent: parent,
                };
              });

              const removedDuplicate: Array<InternalDocSearchHit> = [];

              parsedHits.forEach((item) => {
                const existsPage = removedDuplicate.findIndex((v) =>
                  isSamePage(v, item),
                );

                if (existsPage === -1) {
                  if (item.type !== 'lvl1' && !item.__docsearch_parent) {
                    const isExistParent = removedDuplicate.find(
                      (v) =>
                        v.type === 'lvl1' &&
                        v.hierarchy.lvl1 === item.hierarchy.lvl1 &&
                        v.hierarchy.lvl0 === item.hierarchy.lvl0,
                    );

                    if (isExistParent) {
                      item.__docsearch_parent = isExistParent;
                    } else {
                      const mockParent = {
                        content: null,
                        type: 'lvl1',
                        category: 'Design',
                        hierarchy: item.hierarchy,
                        url: item.url
                          .replace(/\#([^\s]+)$/, '')
                          .replace(/(web|ios|android)$/, 'design'),
                        objectID: `9999-${item.url.replace(/\#([^\s]+)$/, '').replace(/(web|ios|android)$/, 'design')}`,
                        _snippetResult: {
                          hierarchy: {
                            lvl0: item._snippetResult.hierarchy?.lvl0,
                            lvl1: item._snippetResult.hierarchy?.lvl1,
                          },
                        },
                        _highlightResult: item._highlightResult,
                      } as unknown as InternalDocSearchHit;

                      item.__docsearch_parent = mockParent;

                      removedDuplicate.push(mockParent);
                    }
                  }

                  removedDuplicate.push(item);
                }
              }, parsedHits);

              return Object.values<Array<InternalDocSearchHit>>(
                groupBy(removedDuplicate, (item) => item.hierarchy.lvl0, 20),
              )
                .map<AutocompleteSource<InternalDocSearchHit>>(
                  (items, index) => {
                    return {
                      sourceId: `hits${index}`,
                      onSelect: ({ event, item }) => {
                        saveRecentSearch(item);
                        router.push(item.url);
                        handleClose(event);
                      },
                      getItemUrl: ({ item }) => {
                        return item.url;
                      },
                      getItems: (): Array<InternalDocSearchHit> => {
                        return Object.values(
                          groupBy(
                            items,
                            (item) =>
                              `${item.hierarchy.lvl0}-${item.hierarchy.lvl1}`,
                            5,
                          ),
                        )
                          .map((result) => {
                            return [...result].sort((a, b) => {
                              if (a.type === 'lvl1' && b.type !== 'lvl1')
                                return -1;
                              if (a.type !== 'lvl1' && b.type === 'lvl1')
                                return 1;

                              if (a.type === 'lvl1' && b.type === 'lvl1') {
                                return a.hierarchy.lvl1.localeCompare(
                                  b.hierarchy.lvl1,
                                );
                              }

                              const parentA = a.__docsearch_parent;
                              const parentB = b.__docsearch_parent;

                              if (parentA && parentB) {
                                const parentCompare =
                                  parentA.hierarchy.lvl1.localeCompare(
                                    parentB.hierarchy.lvl1,
                                  );
                                if (parentCompare !== 0) return parentCompare;

                                return a.category.localeCompare(b.category);
                              }

                              return 0;
                            });
                          })
                          .flat();
                      },
                    };
                  },
                )
                .flat();
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
    (state.collections.length === 0 ||
      state.collections.some((collection) => collection.items.length === 0));

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
