import { Box } from '@wanteddev/wds';

import { previewBarStyle, previewWrapperStyle } from './style';

type Props = {
  value: string;
};

const SpacingScalePreview = ({ value }: Props) => {
  return (
    <Box sx={previewWrapperStyle}>
      <Box sx={previewBarStyle(value)} />
    </Box>
  );
};

export default SpacingScalePreview;
