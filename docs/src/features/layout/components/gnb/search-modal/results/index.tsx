import { FlexBox, List, Typography } from '@wanteddev/wds';

import { RECENT_SEARCHES_SOURCE_ID } from '../constants';

import SearchOption from './option';
import { searchResultGroupStyle } from './style';
import SearchResultEmpty from './empty';
import SearchResultInitial from './initial';

import type { HTMLAttributes } from 'react';
import type { AutocompletePropGetters } from '@algolia/autocomplete-core';
import type {
  DocSearchHit,
  DocSearchState,
  InternalDocSearchHit,
} from '../types';

type Props = {
  state: DocSearchState<InternalDocSearchHit>;
  isEmpty: boolean;
  isQueryEmpty: boolean;
  getItemProps: AutocompletePropGetters<InternalDocSearchHit>['getItemProps'];
  getListProps: AutocompletePropGetters<InternalDocSearchHit>['getListProps'];
  recentSearchRemove: (item: DocSearchHit) => void;
};

const SearchResults = ({
  state,
  getItemProps,
  getListProps,
  isEmpty,
  isQueryEmpty,
  recentSearchRemove,
}: Props) => {
  if (isEmpty) {
    return <SearchResultEmpty query={state.query} />;
  }

  const firstCollections = state.collections[0];

  if (
    (isQueryEmpty ||
      firstCollections?.source.sourceId === RECENT_SEARCHES_SOURCE_ID) &&
    !firstCollections?.items.length
  ) {
    return <SearchResultInitial />;
  }

  return (
    <FlexBox flexDirection="column" gap="24px" sx={{ paddingTop: '12px' }}>
      {state.collections
        .filter((item) => item.items.length > 0)
        .map((collection, idx) => {
          const title = collection.source.sourceId;

          return (
            <FlexBox
              as="section"
              {...getListProps({
                source: collection.source,
              })}
              key={`${title}-${idx}`}
              flexDirection="column"
              gap="10px"
              sx={searchResultGroupStyle}
            >
              <Typography
                as="h4"
                variant="caption2"
                weight="bold"
                color="semantic.label.alternative"
              >
                {title}
              </Typography>
              <List gap="0px">
                {collection.items.map((item, itemIdx) => {
                  const options = getItemProps({
                    item,
                    source: collection.source,
                  }) as unknown as HTMLAttributes<HTMLLIElement>;

                  const ariaSelected =
                    options.id ===
                    `docsearch-${title.replace(/ /g, '')}-item-${state.activeItemId}`;

                  return (
                    <SearchOption
                      {...options}
                      key={`${title}-${itemIdx}-${item.objectID}-${options.id}`}
                      recentSearchRemove={recentSearchRemove}
                      aria-selected={ariaSelected}
                      item={item}
                    />
                  );
                })}
              </List>
            </FlexBox>
          );
        })}
    </FlexBox>
  );
};

export default SearchResults;
