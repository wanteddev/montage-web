import {
  Divider,
  FlexBox,
  IconButton,
  List,
  ListCellContent,
  SectionHeader,
  Typography,
} from '@wanteddev/wds';
import { Fragment, type HTMLAttributes, memo } from 'react';
import { IconClose, IconHistory } from '@wanteddev/wds-icon';

import SearchOption from './option';
import { searchResultGroupStyle } from './style';
import SearchResultEmpty from './empty';
import SearchResultInitial from './initial';
import PlatformFilter from './platform-filter';

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

  if (isQueryEmpty || firstCollections?.source.sourceId === 'recentSearches') {
    if (!firstCollections?.items.length) {
      return <SearchResultInitial />;
    }

    return (
      <FlexBox
        as="section"
        {...getListProps()}
        flexDirection="column"
        gap="4px"
        sx={searchResultGroupStyle}
      >
        <SectionHeader
          headingTag="h4"
          size="xsmall"
          sx={searchResultGroupStyle}
        >
          Recent Searches
        </SectionHeader>
        <List gap="4px">
          {firstCollections.items.map((item, idx) => (
            <SearchOption
              {...(getItemProps({
                item,
                source: firstCollections.source,
              }) as unknown as HTMLAttributes<HTMLLIElement>)}
              item={item}
              leadingContent={
                <ListCellContent variant="icon">
                  <IconHistory
                    sx={(theme) => ({
                      fontSize: 16,
                      color: theme.semantic.label.alternative,
                    })}
                  />
                </ListCellContent>
              }
              trailingContent={
                <ListCellContent variant="icon-button">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      recentSearchRemove(item);
                    }}
                    size={16}
                    sx={(theme) => ({
                      color: theme.semantic.label.assistive,
                    })}
                  >
                    <IconClose />
                  </IconButton>
                </ListCellContent>
              }
              key={[firstCollections.source.sourceId, idx, item.objectID].join(
                ':',
              )}
            >
              <Typography variant="body1" weight="regular">
                {item.hierarchy.lvl1}
              </Typography>
            </SearchOption>
          ))}
        </List>
      </FlexBox>
    );
  }

  if (
    (state.status === 'loading' || state.status === 'stalled') &&
    (state.collections.length === 0 ||
      state.collections.every((item) => item.items.length === 0))
  ) {
    return (
      <FlexBox justifyContent="flex-end" sx={{ padding: '0px 8px' }}>
        <PlatformFilter />
      </FlexBox>
    );
  }

  const filteredCollections = state.collections.filter(
    (item) => item.items.length > 0,
  );

  return (
    <>
      {filteredCollections.map((collection, idx) => {
        const title = collection.source.sourceId;

        const shouldShowDivider =
          idx !== filteredCollections.length - 1 &&
          (filteredCollections.at(idx + 1)?.items.length ?? -1) > 0;

        return (
          <FlexBox
            as="section"
            {...getListProps()}
            key={collection.source.sourceId + idx}
            flexDirection="column"
            gap="4px"
            sx={searchResultGroupStyle}
          >
            <SectionHeader
              headingTag="h4"
              size="xsmall"
              trailingContent={idx === 0 ? <PlatformFilter /> : null}
            >
              {title}
            </SectionHeader>
            <List gap="4px">
              {collection.items.map((item, itemIdx) => {
                const shouldShowHeading =
                  title === 'Text' &&
                  collection.items.findIndex(
                    (v) => v.hierarchy.lvl1 === item.hierarchy.lvl1,
                  ) === itemIdx;

                return (
                  <Fragment key={[title, itemIdx, item.objectID].join(':')}>
                    {shouldShowHeading && (
                      <SearchOption
                        disableInteraction
                        item={{ ...item, type: 'lvl1' }}
                        trailingContent={null}
                      />
                    )}
                    <SearchOption
                      {...(getItemProps({
                        item,
                        source: collection.source,
                      }) as unknown as HTMLAttributes<HTMLLIElement>)}
                      item={item}
                    />
                  </Fragment>
                );
              })}
            </List>

            {shouldShowDivider && (
              <Divider
                color="semantic.line.normal.alternative"
                sx={{ margin: '12px 0px' }}
              />
            )}
          </FlexBox>
        );
      })}
    </>
  );
};

export default memo(SearchResults);
