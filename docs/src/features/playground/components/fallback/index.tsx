import { FlexBox, Loading } from '@montage-ui/core';

const PlaygroundFallback = () => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100dvh' }}
    >
      <Loading variant="circular" aria-label="불러오는 중" />
    </FlexBox>
  );
};

export default PlaygroundFallback;
