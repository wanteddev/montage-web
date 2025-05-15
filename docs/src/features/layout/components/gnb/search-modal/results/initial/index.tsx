import { FlexBox, Typography } from '@wanteddev/wds';
import { IconSearch } from '@wanteddev/wds-icon';

import PlatformFilter from '../platform-filter';

const SearchResultInitial = () => {
  return (
    <FlexBox flexDirection="column" flex="1">
      <FlexBox justifyContent="end" sx={{ padding: '0px 8px' }}>
        <PlatformFilter />
      </FlexBox>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        flex="1"
        flexDirection="column"
        gap="20px"
      >
        <IconSearch
          sx={(theme) => ({
            fontSize: 40,
            color: theme.semantic.label.assistive,
          })}
        />
        <Typography
          variant="label1"
          weight="medium"
          color="semantic.label.assistive"
        >
          Search Wanted Design System
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

export default SearchResultInitial;
