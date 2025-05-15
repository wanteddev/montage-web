import {
  EmptyState,
  EmptyStateContent,
  EmptyStateImage,
  EmptyStateText,
  FlexBox,
  ImageLoader,
  Typography,
} from '@wanteddev/wds';

import PlatformFilter from '../platform-filter';

type Props = {
  query: string;
};

const SearchResultEmpty = ({ query }: Props) => {
  return (
    <FlexBox flexDirection="column" flex="1">
      <FlexBox justifyContent="end" sx={{ padding: '0px 8px' }}>
        <PlatformFilter />
      </FlexBox>
      <FlexBox justifyContent="center" alignItems="center" flex="1">
        <EmptyState platform="desktop" sx={{ padding: 0 }}>
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
              sx={{ paddingTop: 32 }}
              description={
                <Typography
                  variant="headline1"
                  weight="medium"
                  color="semantic.label.neutral"
                >
                  {`"${query}"에 대한 검색 결과가 없어요.`}
                </Typography>
              }
            />
          </EmptyStateContent>
        </EmptyState>
      </FlexBox>
    </FlexBox>
  );
};

export default SearchResultEmpty;
