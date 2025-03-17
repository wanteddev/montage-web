import {
  EmptyState,
  EmptyStateContent,
  EmptyStateImage,
  EmptyStateText,
  FlexBox,
  ImageLoader,
  List,
  Typography,
} from '@wanteddev/wds';

import { removeHighlightTags } from '../helpers';

import SearchOption from './search-option';

import type { AutocompletePropGetters } from '@algolia/autocomplete-core';
import type { DocSearchState, InternalDocSearchHit } from '../types';
import type { HTMLAttributes } from 'react';

type Props = {
  state: DocSearchState<InternalDocSearchHit>;
  isEmpty: boolean;
  isQueryEmpty: boolean;
  getItemProps: AutocompletePropGetters<InternalDocSearchHit>['getItemProps'];
  getListProps: AutocompletePropGetters<InternalDocSearchHit>['getListProps'];
};

const SearchResults = ({
  state,
  getItemProps,
  getListProps,
  isEmpty,
  isQueryEmpty,
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

  if (isQueryEmpty) {
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
              src="https://static.wanted.co.kr/images/brand_assets/icon/explorer.webp"
              width={200}
              quality={100}
              alt="explore"
            />
          </EmptyStateImage>
          <EmptyStateContent>
            <EmptyStateText
              title="페이지를 검색해보세요."
              description="검색을 통해 빠르게 페이지를 탐색하세요."
            />
          </EmptyStateContent>
        </EmptyState>
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
            gap="8px"
          >
            <Typography
              as="h4"
              variant="label1-reading"
              weight="medium"
              color="semantic.primary.normal"
            >
              {title}
            </Typography>
            <List>
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
