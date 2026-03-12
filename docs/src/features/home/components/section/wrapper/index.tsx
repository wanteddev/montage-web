import { FlexBox } from '@montage-ui/core';

import { wrapperStyle } from './style';

import type { FlexBoxProps } from '@montage-ui/core';

type Props = FlexBoxProps;

const SectionWrapper = ({ sx, ...props }: Props) => {
  return (
    <FlexBox
      as="section"
      flexDirection="column"
      {...props}
      sx={[wrapperStyle, sx]}
    />
  );
};

export default SectionWrapper;
