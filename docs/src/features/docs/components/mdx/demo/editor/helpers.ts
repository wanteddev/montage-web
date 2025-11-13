import { SearchQuery } from '@codemirror/search';

import type { EditorState } from '@codemirror/state';

export const getDefaultSearchQuery = (
  state: EditorState,
  fallback?: SearchQuery,
) => {
  const selection = state.selection.main;
  const selectionText =
    selection.empty || selection.to > selection.from + 100
      ? ''
      : state.sliceDoc(selection.from, selection.to);
  if (fallback && !selectionText) return fallback;

  return new SearchQuery({
    search: fallback?.literal
      ? selectionText
      : selectionText.replace(/\n/g, '\\n'),
    caseSensitive: fallback?.caseSensitive ?? false,
    literal: fallback?.literal ?? false,
    regexp: fallback?.regexp ?? false,
    wholeWord: fallback?.wholeWord ?? false,
  });
};
