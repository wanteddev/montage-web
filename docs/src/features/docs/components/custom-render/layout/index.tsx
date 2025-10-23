import { FlexBox } from '@wanteddev/wds';

import { wrapperStyle } from './style';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const CustomRenderLayout = ({ children }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={wrapperStyle}>
      {children}
    </FlexBox>
  );
};

export default CustomRenderLayout;
