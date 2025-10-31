import { FlexBox, List, Typography } from '@wanteddev/wds';

import SearchOption from './option';
import SearchResultEmpty from './empty';

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
  recentSearchRemove: (item: DocSearchHit) => void;
};

const SearchResults = ({
  state,
  getItemProps,
  isEmpty,
  recentSearchRemove,
}: Props) => {
  if (isEmpty) {
    return <SearchResultEmpty query={state.query} />;
  }

  return (
    <FlexBox flexDirection="column" gap="24px" sx={{ paddingTop: '12px' }}>
      {state.collections.map((collection) => {
        if (collection.items.length === 0) {
          return null;
        }

        const title = collection.source.sourceId;

        return (
          <FlexBox
            role="listbox"
            as="section"
            aria-label={title}
            key={collection.source.sourceId}
            flexDirection="column"
            gap="10px"
          >
            <Typography
              variant="caption2"
              weight="bold"
              color="semantic.label.alternative"
            >
              {title}
            </Typography>
            <List gap="0px">
              {collection.items.map((item) => {
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
                    key={`${title}-${item.objectID}-${item.category}-${options.id}-${item.type}`}
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
