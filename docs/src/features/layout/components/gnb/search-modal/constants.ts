import type { DocSearchState, InternalDocSearchHit } from './types';

export const DEFAULT_SEARCH_STATE: DocSearchState<InternalDocSearchHit> = {
  query: '',
  collections: [],
  completion: null,
  context: {},
  isOpen: false,
  activeItemId: null,
  status: 'idle',
};

export const RECENT_SEARCHES_SOURCE_ID = 'Recent Searches';
