import { FlexBox, Typography } from '@wanteddev/wds';

const ErrorFallback = () => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      flex="1 1 0"
      flexDirection="column"
      gap="8px"
      sx={{ padding: '14px' }}
    >
      <Typography
        align="center"
        variant="body1_normal"
        weight="bold"
        color="palette.label.strong"
      >
        오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </Typography>
    </FlexBox>
  );
};

export default ErrorFallback;
