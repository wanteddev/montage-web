import {
  EmptyState,
  EmptyStateContent,
  EmptyStateImage,
  EmptyStateText,
  FlexBox,
  IconButton,
  ImageLoader,
  List,
  ListCellContent,
  SectionHeader,
} from '@wanteddev/wds';
import { IconClose, IconHistory } from '@wanteddev/wds-icon';

import { removeHighlightTags } from '../helpers';

import SearchOption from './search-option';
import { searchOptionWrapperStyle, searchResultGroupStyle } from './style';

import type { AutocompletePropGetters } from '@algolia/autocomplete-core';
import type {
  DocSearchHit,
  DocSearchState,
  InternalDocSearchHit,
} from '../types';
import type { HTMLAttributes } from 'react';

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
    return (
      <FlexBox justifyContent="center">
        <EmptyState
          platform="mobile"
          sx={{ padding: '20px 0px 0px 0px' }}
          sm={{
            platform: 'desktop',
            sx: { padding: '20px 0px 0px 0px' },
          }}
        >
          <EmptyStateImage>
            <ImageLoader
              src="https://static.wanted.co.kr/images/ghost.png"
              width={200}
              quality={100}
              alt="ghost"
            />
          </EmptyStateImage>
          <EmptyStateContent>
            <EmptyStateText
              title="검색 결과가 없어요."
              description="다른 키워드로 검색해보세요."
            />
          </EmptyStateContent>
        </EmptyState>
      </FlexBox>
    );
  }

  const firstCollections = state.collections[0];

  if (isQueryEmpty || firstCollections?.source.sourceId === 'recentSearches') {
    if (!firstCollections?.items.length) {
      return null;
    }

    return (
      <FlexBox
        as="section"
        {...getListProps()}
        key={firstCollections.source.sourceId}
        flexDirection="column"
        gap="4px"
      >
        <SectionHeader
          headingTag="h4"
          size="xsmall"
          sx={searchResultGroupStyle}
        >
          최근 검색
        </SectionHeader>
        <List sx={searchOptionWrapperStyle}>
          {firstCollections.items.map((item, idx) => {
            return (
              <SearchOption
                {...(getItemProps({
                  item,
                  source: firstCollections.source,
                }) as unknown as HTMLAttributes<HTMLLIElement>)}
                item={item}
                leadingContent={
                  <ListCellContent variant="icon">
                    <IconHistory />
                  </ListCellContent>
                }
                trailingContent={
                  <ListCellContent variant="icon-button">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        recentSearchRemove(item);
                      }}
                      size={20}
                      sx={(theme) => ({
                        color: theme.semantic.label.assistive,
                      })}
                    >
                      <IconClose />
                    </IconButton>
                  </ListCellContent>
                }
                data-depth={0}
                key={[
                  firstCollections.source.sourceId,
                  idx,
                  item.objectID,
                ].join(':')}
              />
            );
          })}
        </List>
      </FlexBox>
    );
  }

  return (
    <>
      {state.collections.map((collection) => {
        if (collection.items.length === 0) {
          return null;
        }

        const title = removeHighlightTags(collection.items[0]);

        return (
          <FlexBox
            as="section"
            {...getListProps()}
            key={collection.source.sourceId}
            flexDirection="column"
            gap="4px"
          >
            <SectionHeader
              headingTag="h4"
              size="xsmall"
              sx={searchResultGroupStyle}
            >
              {title}
            </SectionHeader>
            <List sx={searchOptionWrapperStyle}>
              {collection.items.map((item, idx) => {
                return (
                  <SearchOption
                    {...(getItemProps({
                      item,
                      source: collection.source,
                    }) as unknown as HTMLAttributes<HTMLLIElement>)}
                    item={item}
                    key={[title, idx, item.objectID].join(':')}
                  />
                );
              })}
            </List>
          </FlexBox>
        );
      })}
    </>
  );
};

export default SearchResults;
