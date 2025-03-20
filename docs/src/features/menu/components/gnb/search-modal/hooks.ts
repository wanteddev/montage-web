import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';

import { groupBy, removeHighlightTags } from './helpers';

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
};

export const useDocSearch = ({ apiKey, appId }: UseDocSearchParams) => {
  const [searchType, setSearchType] = useState<'code' | 'design'>('design');

  const indexName = useMemo(
    () => (searchType === 'design' ? 'wds-docs' : 'wds-code'),
    [searchType],
  );

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
  const snippetLength = useRef<number>(10);
  const initialQueryFromSelection = useRef<string>(
    typeof window !== 'undefined'
      ? window.getSelection()!.toString().slice(0, 3)
      : '',
  ).current;

  const handleClose = useCallback((event: MouseEvent) => {
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
  }, []);

  const initialQueryRef = useRef(initialQueryFromSelection);
  const initialQuery = initialQueryRef.current;

  const searchClient = useMemo(() => {
    const client = liteClient(appId, apiKey);
    client.addAlgoliaAgent('docsearch', '3.8.0');
    return client;
  }, [apiKey, appId]);

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
        placeholder: 'Search Docs',
        initialState: {
          query: initialQuery,
        },
        onStateChange: (props) => {
          setState(props.state);
        },
        getSources: async ({ query, setContext, setStatus }) => {
          if (!query) {
            return [];
          }

          return searchClient
            .search<DocSearchHit>({
              requests: [
                {
                  query,
                  indexName,
                  attributesToRetrieve: [
                    'hierarchy.lvl0',
                    'hierarchy.lvl1',
                    'hierarchy.lvl2',
                    'hierarchy.lvl3',
                    'hierarchy.lvl4',
                    'hierarchy.lvl5',
                    'hierarchy.lvl6',
                    'content',
                    'type',
                    'url',
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
              const sources = groupBy<DocSearchHit>(
                hits,
                (hit) => removeHighlightTags(hit),
                5,
              );

              setContext({ nbHits });

              return Object.values<Array<DocSearchHit>>(sources).map(
                (items, index) => {
                  return {
                    sourceId: `hits${index}`,
                    onSelect: ({ event }) => {
                      handleClose(event);
                    },
                    getItemUrl: ({ item }) => {
                      return item.url;
                    },
                    getItems: (): Array<InternalDocSearchHit> => {
                      return Object.values(
                        groupBy(items, (item) => item.hierarchy.lvl1, 5),
                      )
                        .map((groupedHits) =>
                          groupedHits.map((item) => {
                            let parent: InternalDocSearchHit | null = null;

                            const potentialParent = groupedHits.find(
                              (siblingItem) =>
                                siblingItem.type === 'lvl1' &&
                                siblingItem.hierarchy.lvl1 ===
                                  item.hierarchy.lvl1,
                            ) as InternalDocSearchHit | undefined;

                            if (item.type !== 'lvl1' && potentialParent) {
                              parent = potentialParent;
                            }

                            return {
                              ...item,
                              __docsearch_parent: parent,
                            };
                          }),
                        )
                        .flat();
                    },
                  };
                },
              );
            });
        },
      }),
    [initialQuery, searchClient, indexName, handleClose],
  );

  useEffect(() => {
    const isMobileMediaQuery = window.matchMedia('(max-width: 768px)');

    if (isMobileMediaQuery.matches) {
      snippetLength.current = 5;
    } else {
      snippetLength.current = 10;
    }
  }, []);

  const { refresh } = autocomplete;

  useEffect(() => {
    if (initialQuery.length > 0) {
      refresh();
      console.log(123);

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
  }, [searchType]);

  const isQueryEmpty = !state.query;

  const isEmpty =
    !isQueryEmpty &&
    (state.collections.length === 0 ||
      state.collections.some((collection) => collection.items.length === 0));

  return {
    autocomplete,
    state,
    searchType,
    setSearchType,
    isEmpty,
    isQueryEmpty,
    containerRef,
    inputRef,
  };
};
