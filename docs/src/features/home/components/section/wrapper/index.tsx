import { FlexBox } from '@wanteddev/wds';

import { wrapperStyle } from './style';

import type { FlexBoxProps } from '@wanteddev/wds';

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
