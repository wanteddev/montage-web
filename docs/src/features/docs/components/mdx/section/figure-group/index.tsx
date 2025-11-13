import { FlexBox } from '@wanteddev/wds';

import { Heading3 } from '../layout';
import { sectionLayoutStyle } from '../style';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title?: string;
}>;

const SectionFigureGroup = ({ children, title }: Props) => {
  return (
    <FlexBox
      flexDirection="column"
      data-role="section-figure-group"
      sx={[sectionLayoutStyle, { marginBottom: '0 !important' }]}
    >
      <Heading3 content={title} />
      <FlexBox flexDirection="column" gap="88px">
        {children}
      </FlexBox>
    </FlexBox>
  );
};

export default SectionFigureGroup;
