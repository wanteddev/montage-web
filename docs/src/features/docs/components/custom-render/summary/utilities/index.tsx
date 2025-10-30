import { Box } from '@wanteddev/wds';
import Image from 'next/image';

import { wrapperStyle } from './style';

const UtilitiesSummary = () => {
  return (
    <Box sx={wrapperStyle}>
      <Box
        as={Image}
        src="/utilities/overview/Image.png"
        width={760}
        height={226}
        alt="Utilities Overview"
        fetchPriority="high"
        priority
      />
    </Box>
  );
};

export default UtilitiesSummary;
