type ContentType =
  | 'content'
  | 'lvl0'
  | 'lvl1'
  | 'lvl2'
  | 'lvl3'
  | 'lvl4'
  | 'lvl5'
  | 'lvl6'
  | 'recent';

type DocSearchHitAttributeHighlightResult = {
  value: string;
  matchLevel: 'full' | 'none' | 'partial';
  matchedWords?: Array<string>;
  fullyHighlighted?: boolean;
};

type DocSearchHitHighlightResultHierarchy = {
  lvl0?: DocSearchHitAttributeHighlightResult;
  lvl1?: DocSearchHitAttributeHighlightResult;
  lvl2?: DocSearchHitAttributeHighlightResult;
  lvl3?: DocSearchHitAttributeHighlightResult;
  lvl4?: DocSearchHitAttributeHighlightResult;
  lvl5?: DocSearchHitAttributeHighlightResult;
  lvl6?: DocSearchHitAttributeHighlightResult;
};

type DocSearchHitHighlightResult = {
  content?: DocSearchHitAttributeHighlightResult;
  hierarchy?: DocSearchHitHighlightResultHierarchy;
  hierarchy_camel?: Array<DocSearchHitHighlightResultHierarchy>;
};

type DocSearchHitAttributeSnippetResult = {
  value: string;
  matchLevel: 'full' | 'none' | 'partial';
};

type DocSearchHitSnippetResult = {
  content?: DocSearchHitAttributeSnippetResult;
  hierarchy?: DocSearchHitHighlightResultHierarchy;
  hierarchy_camel?: Array<DocSearchHitHighlightResultHierarchy>;
};

export declare type DocSearchHit = {
  objectID: string;
  content: string | null;
  url: string;
  url_without_anchor: string;
  type: ContentType;
  anchor: string | null;
  category: 'Design' | 'Web' | 'iOS' | 'Android' | null;
  hierarchy: {
    lvl0: string;
    lvl1: string;
    lvl2: string | null;
    lvl3: string | null;
    lvl4: string | null;
    lvl5: string | null;
    lvl6: string | null;
  };
  _highlightResult: DocSearchHitHighlightResult;
  _snippetResult: DocSearchHitSnippetResult;
  _rankingInfo?: {
    promoted: boolean;
    nbTypos: number;
    firstMatchedWord: number;
    proximityDistance?: number;
    geoDistance: number;
    geoPrecision?: number;
    nbExactWords: number;
    words: number;
    filters: number;
    userScore: number;
    matchedGeoLocation?: {
      lat: number;
      lng: number;
      distance: number;
    };
  };
  _distinctSeqID?: number;
  __autocomplete_indexName?: string;
  __autocomplete_queryID?: string;
  __autocomplete_algoliaCredentials?: {
    appId: string;
    apiKey: string;
  };
  __autocomplete_id?: number;
};

import type {
  AutocompleteContext,
  AutocompleteInsightsApi,
  AutocompleteState,
  BaseItem,
} from '@algolia/autocomplete-core';

export declare type InternalDocSearchHit = DocSearchHit;

export interface DocSearchContext extends AutocompleteContext {
  algoliaInsightsPlugin?: {
    insights: AutocompleteInsightsApi;
  };
}

export interface DocSearchState<TItem extends BaseItem>
  extends AutocompleteState<TItem> {
  context: DocSearchContext;
}
