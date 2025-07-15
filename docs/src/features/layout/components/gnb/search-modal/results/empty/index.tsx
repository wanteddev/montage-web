import {
  FallbackView,
  FallbackViewContent,
  FallbackViewImage,
  FallbackViewText,
  FlexBox,
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
        <FallbackView platform="desktop" sx={{ padding: 0 }}>
          <FallbackViewImage sx={{ width: 200 }}>
            <img
              src="https://static.wanted.co.kr/images/ghost.png"
              alt="ghost"
            />
          </FallbackViewImage>
          <FallbackViewContent>
            <FallbackViewText
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
          </FallbackViewContent>
        </FallbackView>
      </FlexBox>
    </FlexBox>
  );
};

export default SearchResultEmpty;
