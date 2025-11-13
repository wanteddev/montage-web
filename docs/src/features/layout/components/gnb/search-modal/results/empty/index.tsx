import { FlexBox, Typography } from '@wanteddev/wds';
import { IconInbox } from '@wanteddev/wds-icon';

type Props = {
  query: string;
};

const SearchResultEmpty = ({ query }: Props) => {
  return (
    <FlexBox flexDirection="column" flex="1" sx={{ minHeight: '280px' }}>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        flex="1"
        flexDirection="column"
        gap="20px"
      >
        <IconInbox
          aria-hidden
          sx={(theme) => ({
            fontSize: 40,
            color: theme.semantic.label.assistive,
          })}
        />
        <Typography
          variant="label1"
          weight="medium"
          color="semantic.label.assistive"
          align="center"
        >
          Showing 0 results for <br />“{query}“
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

export default SearchResultEmpty;
